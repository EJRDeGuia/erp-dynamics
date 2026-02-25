import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { WorkOrder } from '@/types/erp';
import { useERPStore } from '@/store/erp-store';

export default function ManufacturingPage() {
  const { data } = useERPStore();
  const itemOpts = data.items.map(i => ({ value: i.id, label: `${i.name} (${i.id})` }));

  const columns: ColumnDef<WorkOrder>[] = [
    { key: 'itemId', label: 'Item', render: r => data.items.find(i => i.id === r.itemId)?.name ?? r.itemId },
    { key: 'quantity', label: 'Quantity' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
  ];

  const fields: FieldDef[] = [
    { key: 'itemId', label: 'Item', type: 'select', required: true, options: itemOpts },
    { key: 'quantity', label: 'Quantity', type: 'number', required: true },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'endDate', label: 'End Date', type: 'date', required: true },
  ];

  return <ModulePage<WorkOrder> title="Manufacturing — Work Orders" collection="workOrders" idPrefix="WO" columns={columns} fields={fields} statusOptions={['Planned', 'In Progress', 'Completed', 'Cancelled']} getStatusColor={s => s === 'In Progress' ? 'bg-blue-100 text-blue-800' : s === 'Completed' ? 'bg-emerald-100 text-emerald-800' : s === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} />;
}
