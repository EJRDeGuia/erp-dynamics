import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { Project } from '@/types/erp';

const columns: ColumnDef<Project>[] = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'startDate', label: 'Start' },
  { key: 'endDate', label: 'End' },
];

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'startDate', label: 'Start Date', type: 'date', required: true },
  { key: 'endDate', label: 'End Date', type: 'date', required: true },
];

export default function ProjectPage() {
  return <ModulePage<Project> title="Projects" collection="projects" idPrefix="PRJ" columns={columns} fields={fields} statusOptions={['Planning', 'In Progress', 'Completed', 'On Hold']} getStatusColor={s => s === 'In Progress' ? 'bg-blue-100 text-blue-800' : s === 'Completed' ? 'bg-emerald-100 text-emerald-800' : s === 'On Hold' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'} />;
}
