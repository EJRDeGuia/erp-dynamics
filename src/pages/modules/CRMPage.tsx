import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { Customer } from '@/types/erp';

const columns: ColumnDef<Customer>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'company', label: 'Company' },
];

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'company', label: 'Company', type: 'text', required: true },
];

const statusOptions = ['Active', 'Inactive', 'Lead'];

const getStatusColor = (s: string) => {
  if (s === 'Active') return 'bg-emerald-100 text-emerald-800';
  if (s === 'Lead') return 'bg-blue-100 text-blue-800';
  return 'bg-gray-100 text-gray-800';
};

export default function CRMPage() {
  return <ModulePage<Customer> title="CRM — Customers" collection="customers" idPrefix="CUST" columns={columns} fields={fields} statusOptions={statusOptions} getStatusColor={getStatusColor} />;
}
