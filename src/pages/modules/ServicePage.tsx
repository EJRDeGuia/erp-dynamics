import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Wrench, MapPin, ShieldCheck, Headphones } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'maintenance', label: 'Maintenance Service', icon: Wrench },
  { key: 'visits', label: 'Maintenance Visits', icon: MapPin },
  { key: 'warranty', label: 'Warranty Claims', icon: ShieldCheck },
  { key: 'tickets', label: 'Tickets', icon: Headphones },
];

export default function ServicePage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Service System Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'maintenance' && <MaintenanceView />}
      {activeKey === 'visits' && <VisitsView />}
      {activeKey === 'warranty' && <WarrantyView />}
      {activeKey === 'tickets' && <TicketsView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Maintenance Services', value: data.maintenanceServices.length },
    { label: 'Visits', value: data.maintenanceVisits.length },
    { label: 'Warranty Claims', value: data.warrantyClaims.length },
    { label: 'Support Tickets', value: data.supportTickets.length },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Card key={c.label}><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{c.label}</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{c.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button variant="outline" onClick={() => onNavigate('maintenance')}>Maintenance</Button>
        <Button variant="outline" onClick={() => onNavigate('visits')}>Visits</Button>
        <Button variant="outline" onClick={() => onNavigate('warranty')}>Warranty Claims</Button>
        <Button variant="outline" onClick={() => onNavigate('tickets')}>Tickets</Button>
      </div>
    </div>
  );
}

function MaintenanceView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Service ID' },
    { key: 'salesOrderId', label: 'Sales Order ID' },
    { key: 'serviceType', label: 'Service Type' },
    { key: 'requestDate', label: 'Request Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'salesOrderId', label: 'Sales Order', type: 'select', required: true, options: data.salesOrders.map(s => ({ value: s.id, label: s.id })) },
    { key: 'serviceType', label: 'Service Type', type: 'select', options: [{ value: 'Preventive', label: 'Preventive' }, { value: 'Corrective', label: 'Corrective' }, { value: 'Installation', label: 'Installation' }] },
    { key: 'requestDate', label: 'Request Date', type: 'date', required: true },
  ];
  return <DataTable title="Maintenance Service" collection="maintenanceServices" idPrefix="MS" columns={columns} fields={fields} statusOptions={['Open', 'In Progress', 'Completed', 'Cancelled']} />;
}

function VisitsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Visit ID' },
    { key: 'serviceId', label: 'Service ID' },
    { key: 'technicianId', label: 'Technician', render: r => data.employees.find(e => e.id === r.technicianId)?.name ?? r.technicianId },
    { key: 'visitDate', label: 'Visit Date' },
    { key: 'remarks', label: 'Remarks' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'serviceId', label: 'Service', type: 'select', required: true, options: data.maintenanceServices.map(s => ({ value: s.id, label: s.id })) },
    { key: 'technicianId', label: 'Technician', type: 'select', required: true, options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'visitDate', label: 'Visit Date', type: 'date', required: true },
    { key: 'remarks', label: 'Remarks', type: 'textarea' },
  ];
  return <DataTable title="Maintenance Visits" collection="maintenanceVisits" idPrefix="MV" columns={columns} fields={fields} statusOptions={['Scheduled', 'Completed', 'Cancelled']} />;
}

function WarrantyView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Claim ID' },
    { key: 'salesOrderId', label: 'Sales Order ID' },
    { key: 'claimDate', label: 'Claim Date' },
    { key: 'issue', label: 'Issue' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'salesOrderId', label: 'Sales Order', type: 'select', required: true, options: data.salesOrders.map(s => ({ value: s.id, label: s.id })) },
    { key: 'claimDate', label: 'Claim Date', type: 'date', required: true },
    { key: 'issue', label: 'Issue', type: 'textarea', required: true },
  ];
  return <DataTable title="Warranty Claims" collection="warrantyClaims" idPrefix="WC" columns={columns} fields={fields} statusOptions={['Open', 'Under Review', 'Approved', 'Rejected']} />;
}

function TicketsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Issue ID' },
    { key: 'salesOrderId', label: 'Sales Order ID' },
    { key: 'ticketDate', label: 'Date' },
    { key: 'ticketType', label: 'Type' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'salesOrderId', label: 'Sales Order', type: 'select', required: true, options: data.salesOrders.map(s => ({ value: s.id, label: s.id })) },
    { key: 'ticketDate', label: 'Date', type: 'date', required: true },
    { key: 'ticketType', label: 'Type', type: 'select', options: [{ value: 'Technical', label: 'Technical' }, { value: 'Billing', label: 'Billing' }, { value: 'General Inquiry', label: 'General Inquiry' }] },
  ];
  return <DataTable title="Support Tickets" collection="supportTickets" idPrefix="TKT" columns={columns} fields={fields} statusOptions={['Open', 'In Progress', 'Resolved', 'Closed']} />;
}
