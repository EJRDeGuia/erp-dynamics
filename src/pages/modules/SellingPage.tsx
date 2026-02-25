import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { SalesOrder } from '@/types/erp';
import { useERPStore } from '@/store/erp-store';

export default function SellingPage() {
  const { data } = useERPStore();
  const customerOpts = data.customers.map(c => ({ value: c.id, label: `${c.name} (${c.id})` }));
  const itemOpts = data.items.map(i => ({ value: i.id, label: `${i.name} (${i.id})` }));

  const columns: ColumnDef<SalesOrder>[] = [
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'total', label: 'Total', render: r => `$${r.total.toLocaleString()}` },
    { key: 'orderDate', label: 'Date' },
  ];

  const fields: FieldDef[] = [
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: customerOpts },
    { key: 'items', label: 'Item', type: 'select', options: itemOpts },
    { key: 'total', label: 'Total ($)', type: 'number', required: true },
    { key: 'orderDate', label: 'Order Date', type: 'date', required: true },
  ];

  return <ModulePage<SalesOrder> title="Selling — Sales Orders" collection="salesOrders" idPrefix="SO" columns={columns} fields={fields} statusOptions={['Draft', 'Confirmed', 'Delivered', 'Cancelled']} getStatusColor={s => s === 'Confirmed' ? 'bg-blue-100 text-blue-800' : s === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : s === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} />;
}
