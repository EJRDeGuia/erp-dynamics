import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Target, TrendingUp, Package, ClipboardList, Layers } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'leads', label: 'Leads', icon: Target },
  { key: 'opportunities', label: 'Opportunities', icon: TrendingUp },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'materialRequests', label: 'Material Requests', icon: ClipboardList },
  { key: 'productBundles', label: 'Product Bundles (BOQ)', icon: Layers },
];

export default function CRMPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="CRM System Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'customers' && <CustomersView />}
      {activeKey === 'leads' && <LeadsView />}
      {activeKey === 'opportunities' && <OpportunitiesView />}
      {activeKey === 'products' && <ProductsView />}
      {activeKey === 'materialRequests' && <MaterialRequestsView />}
      {activeKey === 'productBundles' && <ProductBundlesView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Customers', value: data.customers.length },
    { label: 'Leads', value: data.leads.length },
    { label: 'Opportunities', value: data.opportunities.length },
    { label: 'Products', value: data.products.length },
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
        <Button variant="outline" onClick={() => onNavigate('customers')}>View Customers</Button>
        <Button variant="outline" onClick={() => onNavigate('leads')}>View Leads</Button>
        <Button variant="outline" onClick={() => onNavigate('opportunities')}>Sales Pipeline</Button>
        <Button variant="outline" onClick={() => onNavigate('productBundles')}>Product Bundles</Button>
      </div>
    </div>
  );
}

function CustomersView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Customer ID' },
    { key: 'name', label: 'Customer Name' },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'industry', label: 'Industry' },
    { key: 'address', label: 'Address' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'name', label: 'Customer Name', type: 'text', required: true },
    { key: 'contactPerson', label: 'Contact Person', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'industry', label: 'Industry', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
  ];
  return <DataTable title="Customer Information Management" collection="customers" idPrefix="CUST" columns={columns} fields={fields} statusOptions={['Active', 'Inactive', 'Lead']} />;
}

function LeadsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Lead ID' },
    { key: 'customerId', label: 'Customer ID', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'source', label: 'Source' },
    { key: 'leadDate', label: 'Lead Date' },
    { key: 'bundleId', label: 'Bundle ID' },
    { key: 'assignedTo', label: 'Assigned To', render: r => data.employees.find(e => e.id === r.assignedTo)?.name ?? r.assignedTo },
    { key: 'followUp', label: 'Follow-Up' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'source', label: 'Source', type: 'select', options: [{ value: 'Website', label: 'Website' }, { value: 'Referral', label: 'Referral' }, { value: 'Trade Show', label: 'Trade Show' }, { value: 'Cold Call', label: 'Cold Call' }, { value: 'LinkedIn', label: 'LinkedIn' }] },
    { key: 'leadDate', label: 'Lead Date', type: 'date', required: true },
    { key: 'bundleId', label: 'Bundle ID', type: 'select', options: data.productBundles.map(b => ({ value: b.id, label: b.bundleName })) },
    { key: 'assignedTo', label: 'Assigned To', type: 'select', options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'followUp', label: 'Follow-Up Date', type: 'date' },
  ];
  return <DataTable title="Lead Entry & Assignment" collection="leads" idPrefix="LEAD" columns={columns} fields={fields} statusOptions={['New', 'Contacted', 'Qualified', 'Lost']} />;
}

function OpportunitiesView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Opportunity ID' },
    { key: 'leadId', label: 'Lead ID' },
    { key: 'customerId', label: 'Customer ID', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'assignedTo', label: 'Assigned To', render: r => data.employees.find(e => e.id === r.assignedTo)?.name ?? r.assignedTo },
    { key: 'estimatedValue', label: 'Estimated Value', render: r => `$${r.estimatedValue.toLocaleString()}` },
    { key: 'probability', label: 'Probability', render: r => `${r.probability}%` },
    { key: 'stage', label: 'Stage' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'leadId', label: 'Lead', type: 'select', required: true, options: data.leads.map(l => ({ value: l.id, label: l.id })) },
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'assignedTo', label: 'Assigned To', type: 'select', options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'estimatedValue', label: 'Estimated Value', type: 'number', required: true },
    { key: 'probability', label: 'Probability (%)', type: 'number' },
    { key: 'stage', label: 'Stage', type: 'select', options: [{ value: 'Discovery', label: 'Discovery' }, { value: 'Proposal', label: 'Proposal' }, { value: 'Negotiation', label: 'Negotiation' }, { value: 'Closed', label: 'Closed' }] },
  ];
  return <DataTable title="Opportunities / Sales Pipeline" collection="opportunities" idPrefix="OPP" columns={columns} fields={fields} statusOptions={['Open', 'Won', 'Lost', 'Negotiation']} />;
}

function ProductsView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Prod ID' },
    { key: 'productName', label: 'Product Name' },
    { key: 'qty', label: 'Qty' },
    { key: 'unitPrice', label: 'Unit Price', render: r => `$${r.unitPrice.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'productName', label: 'Product Name', type: 'text', required: true },
    { key: 'qty', label: 'Quantity', type: 'number', required: true },
    { key: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
  ];
  return <DataTable title="Products" collection="products" idPrefix="PROD" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
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

function ProductBundlesView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Bundle ID' },
    { key: 'bundleName', label: 'Bundle Name' },
    { key: 'itemsIncluded', label: 'Items Included', render: r => r.itemsIncluded?.join(', ') ?? '' },
    { key: 'totalCost', label: 'Total Cost', render: r => `$${r.totalCost.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'bundleName', label: 'Bundle Name', type: 'text', required: true },
    { key: 'totalCost', label: 'Total Cost', type: 'number', required: true },
  ];
  return <DataTable title="Product Bundles (BOQ)" collection="productBundles" idPrefix="BDL" columns={columns} fields={fields} statusOptions={['Active', 'Draft', 'Inactive']} />;
}
