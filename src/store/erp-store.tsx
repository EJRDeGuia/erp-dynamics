import React, { createContext, useContext, useState, useCallback } from 'react';
import { ERPData, ERPCollection, BaseRecord } from '@/types/erp';
import { seedData } from '@/store/seed-data';
import { toast } from '@/hooks/use-toast';

const dependencyMap: Record<string, { collection: ERPCollection; field: string }[]> = {
  customers: [
    { collection: 'leads', field: 'customerId' },
    { collection: 'opportunities', field: 'customerId' },
    { collection: 'salesOrders', field: 'customerId' },
    { collection: 'invoices', field: 'customerId' },
    { collection: 'deliveries', field: 'customerId' },
    { collection: 'deliveryNotes', field: 'customerId' },
    { collection: 'salesInvoices', field: 'customerId' },
    { collection: 'payments', field: 'customerId' },
  ],
  leads: [
    { collection: 'opportunities', field: 'leadId' },
  ],
  products: [
    { collection: 'salesOrders', field: 'productId' },
  ],
  productBundles: [
    { collection: 'materialRequests', field: 'bundleId' },
    { collection: 'leads', field: 'bundleId' },
  ],
  salesOrders: [
    { collection: 'invoices', field: 'salesOrderId' },
    { collection: 'maintenanceServices', field: 'salesOrderId' },
    { collection: 'warrantyClaims', field: 'salesOrderId' },
    { collection: 'supportTickets', field: 'salesOrderId' },
    { collection: 'salesInvoices', field: 'salesOrderId' },
  ],
  invoices: [
    { collection: 'payments', field: 'invoiceId' },
  ],
  suppliers: [
    { collection: 'purchaseOrders', field: 'supplierId' },
    { collection: 'purchaseReceipts', field: 'supplierId' },
    { collection: 'itemMasters', field: 'supplierId' },
  ],
  items: [
    { collection: 'stockTransactions', field: 'itemId' },
    { collection: 'stockBalances', field: 'itemId' },
    { collection: 'workOrders', field: 'itemId' },
  ],
  warehouses: [
    { collection: 'stockTransactions', field: 'warehouseId' },
    { collection: 'stockBalances', field: 'warehouseId' },
    { collection: 'deliveries', field: 'warehouseId' },
  ],
  maintenanceServices: [
    { collection: 'maintenanceVisits', field: 'serviceId' },
  ],
  employees: [
    { collection: 'salaryStructures', field: 'employeeId' },
    { collection: 'expenseClaims', field: 'employeeId' },
    { collection: 'projectUsers', field: 'employeeId' },
  ],
  projects: [
    { collection: 'tasks', field: 'projectId' },
  ],
  tasks: [
    { collection: 'timesheets', field: 'taskId' },
  ],
  taskTypes: [
    { collection: 'tasks', field: 'typeId' },
    { collection: 'activityCosts', field: 'taskTypeId' },
  ],
  workOrders: [
    { collection: 'jobCards', field: 'workOrderId' },
    { collection: 'stockExchanges', field: 'workOrderId' },
  ],
  purchaseReceipts: [
    { collection: 'landedCosts', field: 'purchaseReceiptId' },
  ],
  salesInvoices: [
    { collection: 'payments', field: 'invoiceId' },
  ],
};

interface ERPStoreContextType {
  data: ERPData;
  addRecord: <T extends BaseRecord>(collection: ERPCollection, record: Omit<T, 'id' | 'createdAt' | 'updatedAt'>, prefix: string) => T;
  updateRecord: <T extends BaseRecord>(collection: ERPCollection, id: string, updates: Partial<T>) => boolean;
  deleteRecord: (collection: ERPCollection, id: string) => boolean;
  getRecord: <T extends BaseRecord>(collection: ERPCollection, id: string) => T | undefined;
  getNextId: (collection: ERPCollection, prefix: string) => string;
}

const ERPStoreContext = createContext<ERPStoreContextType | null>(null);

export function useERPStore() {
  const ctx = useContext(ERPStoreContext);
  if (!ctx) throw new Error('useERPStore must be used within ERPStoreProvider');
  return ctx;
}

export function ERPStoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ERPData>(() => JSON.parse(JSON.stringify(seedData)));

  const getNextId = useCallback((collection: ERPCollection, prefix: string) => {
    const records = data[collection] as BaseRecord[];
    const maxNum = records.reduce((max, r) => {
      const num = parseInt(r.id.split('-').pop() || '0');
      return num > max ? num : max;
    }, 0);
    return `${prefix}-${String(maxNum + 1).padStart(3, '0')}`;
  }, [data]);

  const addRecord = useCallback(<T extends BaseRecord>(collection: ERPCollection, record: Omit<T, 'id' | 'createdAt' | 'updatedAt'>, prefix: string): T => {
    const now = new Date().toISOString();
    const id = getNextId(collection, prefix);
    const newRecord = { ...record, id, createdAt: now, updatedAt: now } as T;
    setData(prev => ({
      ...prev,
      [collection]: [...(prev[collection] as BaseRecord[]), newRecord],
    }));
    toast({ title: 'Record Created', description: `${id} has been created successfully.` });
    return newRecord;
  }, [getNextId]);

  const updateRecord = useCallback(<T extends BaseRecord>(collection: ERPCollection, id: string, updates: Partial<T>): boolean => {
    setData(prev => ({
      ...prev,
      [collection]: (prev[collection] as BaseRecord[]).map(r =>
        r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
      ),
    }));
    toast({ title: 'Record Updated', description: `${id} has been updated successfully.` });
    return true;
  }, []);

  const deleteRecord = useCallback((collection: ERPCollection, id: string): boolean => {
    const deps = dependencyMap[collection];
    if (deps) {
      for (const dep of deps) {
        const refs = (data[dep.collection] as any[]).filter(r => r[dep.field] === id);
        if (refs.length > 0) {
          toast({
            title: 'Cannot Delete',
            description: `This record is referenced by ${refs.length} record(s) in ${dep.collection}. Remove those references first.`,
            variant: 'destructive',
          });
          return false;
        }
      }
    }
    setData(prev => ({
      ...prev,
      [collection]: (prev[collection] as BaseRecord[]).filter(r => r.id !== id),
    }));
    toast({ title: 'Record Deleted', description: `${id} has been deleted.` });
    return true;
  }, [data]);

  const getRecord = useCallback(<T extends BaseRecord>(collection: ERPCollection, id: string): T | undefined => {
    return (data[collection] as unknown as T[]).find(r => r.id === id);
  }, [data]);

  return (
    <ERPStoreContext.Provider value={{ data, addRecord, updateRecord, deleteRecord, getRecord, getNextId }}>
      {children}
    </ERPStoreContext.Provider>
  );
}
