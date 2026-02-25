import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { PurchaseOrder } from '@/types/erp';
import { useERPStore } from '@/store/erp-store';

export default function BuyingPage() {
  const { data } = useERPStore();
  const supplierOpts = data.suppliers.map(s => ({ value: s.id, label: `${s.name} (${s.id})` }));

  const columns: ColumnDef<PurchaseOrder>[] = [
    { key: 'supplierId', label: 'Supplier', render: r => data.suppliers.find(s => s.id === r.supplierId)?.name ?? r.supplierId },
    { key: 'cost', label: 'Cost', render: r => `$${r.cost.toLocaleString()}` },
    { key: 'orderDate', label: 'Date' },
  ];

  const fields: FieldDef[] = [
    { key: 'supplierId', label: 'Supplier', type: 'select', required: true, options: supplierOpts },
    { key: 'cost', label: 'Cost ($)', type: 'number', required: true },
    { key: 'orderDate', label: 'Order Date', type: 'date', required: true },
  ];

  return <ModulePage<PurchaseOrder> title="Buying — Purchase Orders" collection="purchaseOrders" idPrefix="PO" columns={columns} fields={fields} statusOptions={['Draft', 'Ordered', 'Received', 'Cancelled']} getStatusColor={s => s === 'Ordered' ? 'bg-blue-100 text-blue-800' : s === 'Received' ? 'bg-emerald-100 text-emerald-800' : s === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} />;
}
