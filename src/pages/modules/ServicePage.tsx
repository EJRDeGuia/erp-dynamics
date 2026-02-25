import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { ServiceRequest } from '@/types/erp';
import { useERPStore } from '@/store/erp-store';

export default function ServicePage() {
  const { data } = useERPStore();
  const customerOpts = data.customers.map(c => ({ value: c.id, label: `${c.name} (${c.id})` }));
  const employeeOpts = data.employees.map(e => ({ value: e.id, label: `${e.name} (${e.id})` }));

  const columns: ColumnDef<ServiceRequest>[] = [
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'type', label: 'Type' },
    { key: 'priority', label: 'Priority' },
    { key: 'assigneeId', label: 'Assignee', render: r => data.employees.find(e => e.id === r.assigneeId)?.name ?? r.assigneeId },
  ];

  const fields: FieldDef[] = [
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: customerOpts },
    { key: 'assigneeId', label: 'Assignee', type: 'select', options: employeeOpts },
    { key: 'type', label: 'Type', type: 'text', required: true },
    { key: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'Low', label: 'Low' }, { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' }, { value: 'Critical', label: 'Critical' },
    ]},
    { key: 'description', label: 'Description', type: 'textarea' },
  ];

  return <ModulePage<ServiceRequest> title="Service Requests" collection="serviceRequests" idPrefix="SRV" columns={columns} fields={fields} statusOptions={['Open', 'In Progress', 'Resolved', 'Closed']} getStatusColor={s => s === 'Open' ? 'bg-amber-100 text-amber-800' : s === 'In Progress' ? 'bg-blue-100 text-blue-800' : s === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'} />;
}
