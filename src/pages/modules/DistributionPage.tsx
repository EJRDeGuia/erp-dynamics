import { ModulePage, ColumnDef, FieldDef } from '@/components/erp/ModulePage';
import { Item } from '@/types/erp';

const columns: ColumnDef<Item>[] = [
  { key: 'name', label: 'Name' },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price', render: r => `$${r.price.toLocaleString()}` },
];

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'sku', label: 'SKU', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'text', required: true },
  { key: 'price', label: 'Price ($)', type: 'number', required: true },
];

export default function DistributionPage() {
  return <ModulePage<Item> title="Distribution — Items & Stock" collection="items" idPrefix="ITEM" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} getStatusColor={s => s === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'} />;
}
