import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Settings, Monitor, Layers, Calendar, ClipboardList, CreditCard, ArrowLeftRight, Truck } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'itemMaster', label: 'Item Master', icon: Package },
  { key: 'operationMaster', label: 'Operation Master', icon: Settings },
  { key: 'workstationMaster', label: 'Workstation Master', icon: Monitor },
  { key: 'bom', label: 'Bill of Materials', icon: Layers },
  { key: 'productionPlanning', label: 'Production Planning', icon: Calendar },
  { key: 'workOrders', label: 'Work Orders', icon: ClipboardList },
  { key: 'jobCards', label: 'Job Cards', icon: CreditCard },
  { key: 'stockExchange', label: 'Stock Exchange', icon: ArrowLeftRight },
  { key: 'stockTransfer', label: 'Stock Transfer', icon: Truck },
];

export default function ManufacturingPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Manufacturing System Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'itemMaster' && <ItemMasterView />}
      {activeKey === 'operationMaster' && <OperationMasterView />}
      {activeKey === 'workstationMaster' && <WorkstationMasterView />}
      {activeKey === 'bom' && <BOMView />}
      {activeKey === 'productionPlanning' && <ProductionPlanningView />}
      {activeKey === 'workOrders' && <WorkOrdersView />}
      {activeKey === 'jobCards' && <JobCardsView />}
      {activeKey === 'stockExchange' && <StockExchangeView />}
      {activeKey === 'stockTransfer' && <StockTransferView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Item Masters', value: data.itemMasters.length },
    { label: 'Work Orders', value: data.workOrders.length },
    { label: 'Job Cards', value: data.jobCards.length },
    { label: 'Production Plans', value: data.productionPlans.length },
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
        <Button variant="outline" onClick={() => onNavigate('workOrders')}>Work Orders</Button>
        <Button variant="outline" onClick={() => onNavigate('jobCards')}>Job Cards</Button>
        <Button variant="outline" onClick={() => onNavigate('bom')}>Bill of Materials</Button>
      </div>
    </div>
  );
}

function ItemMasterView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Item ID' },
    { key: 'itemName', label: 'Item Name' },
    { key: 'type', label: 'Type' },
    { key: 'supplierId', label: 'Supplier', render: r => data.suppliers.find(s => s.id === r.supplierId)?.name ?? r.supplierId },
    { key: 'stockUom', label: 'Stock (UOM)' },
    { key: 'cost', label: 'Cost', render: r => `$${r.cost.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'itemName', label: 'Item Name', type: 'text', required: true },
    { key: 'type', label: 'Type', type: 'select', options: [{ value: 'Finished Good', label: 'Finished Good' }, { value: 'Sub-Assembly', label: 'Sub-Assembly' }, { value: 'Raw Material', label: 'Raw Material' }] },
    { key: 'supplierId', label: 'Supplier', type: 'select', options: data.suppliers.map(s => ({ value: s.id, label: s.name })) },
    { key: 'stockUom', label: 'Stock UOM', type: 'select', options: [{ value: 'pcs', label: 'pcs' }, { value: 'unit', label: 'unit' }, { value: 'meter', label: 'meter' }] },
    { key: 'cost', label: 'Cost', type: 'number', required: true },
  ];
  return <DataTable title="Item Master" collection="itemMasters" idPrefix="IM" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function OperationMasterView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'OP ID' },
    { key: 'operationName', label: 'Operation Name' },
    { key: 'standardTime', label: 'Stnd. Time (Min)' },
    { key: 'costRatePerHour', label: 'Cost Rate / HR', render: r => `$${r.costRatePerHour}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'operationName', label: 'Operation Name', type: 'text', required: true },
    { key: 'standardTime', label: 'Standard Time (Min)', type: 'number', required: true },
    { key: 'costRatePerHour', label: 'Cost Rate / Hour', type: 'number', required: true },
  ];
  return <DataTable title="Operation Master" collection="operationMasters" idPrefix="OP" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function WorkstationMasterView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'WS ID' },
    { key: 'workstationName', label: 'Workstation Name' },
    { key: 'location', label: 'Location' },
    { key: 'capacityPerDay', label: 'Capacity / Day' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'workstationName', label: 'Workstation Name', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text', required: true },
    { key: 'capacityPerDay', label: 'Capacity / Day', type: 'number', required: true },
  ];
  return <DataTable title="Workstation Master" collection="workstationMasters" idPrefix="WS" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function BOMView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'BOM ID' },
    { key: 'finishedItemId', label: 'Finished Item ID', render: r => data.itemMasters.find(i => i.id === r.finishedItemId)?.itemName ?? r.finishedItemId },
    { key: 'version', label: 'Version' },
    { key: 'createdDate', label: 'Created Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'finishedItemId', label: 'Finished Item', type: 'select', required: true, options: data.itemMasters.map(i => ({ value: i.id, label: i.itemName })) },
    { key: 'version', label: 'Version', type: 'text', required: true },
    { key: 'createdDate', label: 'Created Date', type: 'date', required: true },
  ];
  return <DataTable title="Bill of Materials" collection="billOfMaterials" idPrefix="BOM" columns={columns} fields={fields} statusOptions={['Active', 'Draft', 'Obsolete']} />;
}

function ProductionPlanningView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Plan ID' },
    { key: 'planDate', label: 'Plan Date' },
    { key: 'plannedStart', label: 'Planned Start' },
    { key: 'plannedEnd', label: 'Planned End' },
    { key: 'createdBy', label: 'Created By', render: r => data.employees.find(e => e.id === r.createdBy)?.name ?? r.createdBy },
    { key: 'remarks', label: 'Remarks' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'planDate', label: 'Plan Date', type: 'date', required: true },
    { key: 'plannedStart', label: 'Planned Start', type: 'date', required: true },
    { key: 'plannedEnd', label: 'Planned End', type: 'date', required: true },
    { key: 'createdBy', label: 'Created By', type: 'select', options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'remarks', label: 'Remarks', type: 'textarea' },
  ];
  return <DataTable title="Production Planning" collection="productionPlans" idPrefix="PP" columns={columns} fields={fields} statusOptions={['Draft', 'Confirmed', 'In Progress', 'Completed']} />;
}

function WorkOrdersView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'ID' },
    { key: 'itemId', label: 'Item to Produce', render: r => data.items.find(i => i.id === r.itemId)?.name ?? r.itemId },
    { key: 'quantity', label: 'Quantity' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'Due Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'itemId', label: 'Item', type: 'select', required: true, options: data.items.map(i => ({ value: i.id, label: i.name })) },
    { key: 'quantity', label: 'Quantity', type: 'number', required: true },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'endDate', label: 'Due Date', type: 'date', required: true },
  ];
  return <DataTable title="Work Orders" collection="workOrders" idPrefix="WO" columns={columns} fields={fields} statusOptions={['Planned', 'In Progress', 'Completed', 'Cancelled']} />;
}

function JobCardsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Job Card ID' },
    { key: 'workOrderId', label: 'Work Order ID' },
    { key: 'assignedTo', label: 'Assigned To', render: r => data.employees.find(e => e.id === r.assignedTo)?.name ?? r.assignedTo },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'workOrderId', label: 'Work Order', type: 'select', required: true, options: data.workOrders.map(w => ({ value: w.id, label: w.id })) },
    { key: 'assignedTo', label: 'Assigned To', type: 'select', required: true, options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'startTime', label: 'Start Time', type: 'text', required: true },
    { key: 'endTime', label: 'End Time', type: 'text' },
  ];
  return <DataTable title="Job Cards" collection="jobCards" idPrefix="JC" columns={columns} fields={fields} statusOptions={['Pending', 'In Progress', 'Completed']} />;
}

function StockExchangeView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Exchange ID' },
    { key: 'workOrderId', label: 'Work Order ID' },
    { key: 'exchangeDate', label: 'Exchange Date' },
    { key: 'fromLocation', label: 'From Location' },
    { key: 'toLocation', label: 'To Location' },
    { key: 'remarks', label: 'Remarks' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'workOrderId', label: 'Work Order', type: 'select', required: true, options: [] },
    { key: 'exchangeDate', label: 'Exchange Date', type: 'date', required: true },
    { key: 'fromLocation', label: 'From Location', type: 'text', required: true },
    { key: 'toLocation', label: 'To Location', type: 'text', required: true },
    { key: 'remarks', label: 'Remarks', type: 'textarea' },
  ];
  return <DataTable title="Stock Exchange" collection="stockExchanges" idPrefix="SE" columns={columns} fields={fields} statusOptions={['Pending', 'Completed', 'Cancelled']} />;
}

function StockTransferView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Transfer ID' },
    { key: 'transferType', label: 'Type' },
    { key: 'refId', label: 'Ref ID' },
    { key: 'transferDate', label: 'Date' },
    { key: 'fromWarehouse', label: 'From' },
    { key: 'toWarehouse', label: 'To' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'transferType', label: 'Type', type: 'select', options: [{ value: 'Internal', label: 'Internal' }, { value: 'External', label: 'External' }] },
    { key: 'refId', label: 'Reference ID', type: 'text' },
    { key: 'transferDate', label: 'Date', type: 'date', required: true },
    { key: 'fromWarehouse', label: 'From', type: 'text', required: true },
    { key: 'toWarehouse', label: 'To', type: 'text', required: true },
  ];
  return <DataTable title="Stock Transfer" collection="stockTransfers" idPrefix="ST" columns={columns} fields={fields} statusOptions={['Pending', 'Completed', 'Cancelled']} />;
}
