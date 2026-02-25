import React, { createContext, useContext, useState, useCallback } from 'react';
import { ERPData, ERPCollection, BaseRecord } from '@/types/erp';
import { seedData } from '@/store/seed-data';
import { toast } from '@/hooks/use-toast';

// Dependency map: collection -> field -> referenced collection
const dependencyMap: Record<string, { collection: ERPCollection; field: string }[]> = {
  customers: [
    { collection: 'salesOrders', field: 'customerId' },
    { collection: 'serviceRequests', field: 'customerId' },
  ],
  suppliers: [
    { collection: 'purchaseOrders', field: 'supplierId' },
  ],
  items: [
    { collection: 'stockTransactions', field: 'itemId' },
    { collection: 'workOrders', field: 'itemId' },
  ],
  warehouses: [
    { collection: 'stockTransactions', field: 'warehouseId' },
  ],
  employees: [
    { collection: 'tasks', field: 'assigneeId' },
    { collection: 'serviceRequests', field: 'assigneeId' },
  ],
  projects: [
    { collection: 'tasks', field: 'projectId' },
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
