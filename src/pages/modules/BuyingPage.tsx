import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, ClipboardList } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'suppliers', label: 'Suppliers', icon: Users },
  { key: 'materialRequests', label: 'Material Requests', icon: ClipboardList },
];

export default function BuyingPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Buying System Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'suppliers' && <SuppliersView />}
      {activeKey === 'materialRequests' && <MaterialRequestsView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Suppliers</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{data.suppliers.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Purchase Orders</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{data.purchaseOrders.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Material Requests</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{data.materialRequests.length}</p></CardContent></Card>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => onNavigate('suppliers')}>View Suppliers</Button>
        <Button variant="outline" onClick={() => onNavigate('materialRequests')}>Material Requests</Button>
      </div>
    </div>
  );
}

function SuppliersView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Supplier Name' },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'contactDetails', label: 'Contact Details' },
    { key: 'address', label: 'Address' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'name', label: 'Supplier Name', type: 'text', required: true },
    { key: 'contactPerson', label: 'Contact Person', type: 'text', required: true },
    { key: 'contactDetails', label: 'Contact Details', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
  ];
  return <DataTable title="Supplier Management" collection="suppliers" idPrefix="SUP" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function MaterialRequestsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'MR ID' },
    { key: 'bundleId', label: 'Bundle ID', render: r => data.productBundles.find(b => b.id === r.bundleId)?.bundleName ?? r.bundleId },
    { key: 'requestedBy', label: 'Requested By', render: r => data.employees.find(e => e.id === r.requestedBy)?.name ?? r.requestedBy },
    { key: 'requestDate', label: 'Request Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'bundleId', label: 'Bundle', type: 'select', required: true, options: data.productBundles.map(b => ({ value: b.id, label: b.bundleName })) },
    { key: 'requestedBy', label: 'Requested By', type: 'select', required: true, options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'requestDate', label: 'Request Date', type: 'date', required: true },
  ];
  return <DataTable title="Material Requests" collection="materialRequests" idPrefix="MR" columns={columns} fields={fields} statusOptions={['Pending', 'Approved', 'Rejected', 'Fulfilled']} />;
}
