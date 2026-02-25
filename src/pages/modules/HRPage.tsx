import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { Employee } from '@/types/erp';

const columns: ColumnDef<Employee>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'position', label: 'Position' },
  { key: 'hireDate', label: 'Hire Date' },
];

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'department', label: 'Department', type: 'text', required: true },
  { key: 'position', label: 'Position', type: 'text', required: true },
  { key: 'hireDate', label: 'Hire Date', type: 'date', required: true },
];

export default function HRPage() {
  return <ModulePage<Employee> title="Human Resources — Employees" collection="employees" idPrefix="EMP" columns={columns} fields={fields} statusOptions={['Active', 'On Leave', 'Terminated']} getStatusColor={s => s === 'Active' ? 'bg-emerald-100 text-emerald-800' : s === 'On Leave' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'} />;
}
