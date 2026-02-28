import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Package, ShoppingCart, FileText, Truck } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'salesOrders', label: 'Sales Orders', icon: ShoppingCart },
  { key: 'invoices', label: 'Invoices', icon: FileText },
  { key: 'deliveries', label: 'Deliveries', icon: Truck },
];

export default function SellingPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Selling System Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'customers' && <CustomersView />}
      {activeKey === 'products' && <ProductsView />}
      {activeKey === 'salesOrders' && <SalesOrdersView />}
      {activeKey === 'invoices' && <InvoicesView />}
      {activeKey === 'deliveries' && <DeliveriesView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Sales Orders', value: data.salesOrders.length },
    { label: 'Invoices', value: data.invoices.length },
    { label: 'Deliveries', value: data.deliveries.length },
    { label: 'Customers', value: data.customers.length },
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
        <Button variant="outline" onClick={() => onNavigate('salesOrders')}>View Sales Orders</Button>
        <Button variant="outline" onClick={() => onNavigate('invoices')}>View Invoices</Button>
        <Button variant="outline" onClick={() => onNavigate('deliveries')}>View Deliveries</Button>
      </div>
    </div>
  );
}

function CustomersView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Code' },
    { key: 'name', label: 'Customer Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
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
  return <DataTable title="Customers" collection="customers" idPrefix="CUST" columns={columns} fields={fields} statusOptions={['Active', 'Inactive', 'Lead']} />;
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

function SalesOrdersView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Order ID' },
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'productId', label: 'Product', render: r => data.products.find(p => p.id === r.productId)?.productName ?? r.productId },
    { key: 'qty', label: 'Qty' },
    { key: 'orderDate', label: 'Date' },
    { key: 'address', label: 'Address' },
    { key: 'unitPrice', label: 'Unit Price', render: r => `$${r.unitPrice.toLocaleString()}` },
    { key: 'total', label: 'Total', render: r => `$${r.total.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'productId', label: 'Product', type: 'select', required: true, options: data.products.map(p => ({ value: p.id, label: p.productName })) },
    { key: 'qty', label: 'Quantity', type: 'number', required: true },
    { key: 'orderDate', label: 'Order Date', type: 'date', required: true },
    { key: 'address', label: 'Delivery Address', type: 'text' },
    { key: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
    { key: 'total', label: 'Total', type: 'number', required: true },
  ];
  return <DataTable title="Sales Orders" collection="salesOrders" idPrefix="SO" columns={columns} fields={fields} statusOptions={['Draft', 'Confirmed', 'Delivered', 'Cancelled']} />;
}

function InvoicesView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Invoice ID' },
    { key: 'salesOrderId', label: 'Sales Order' },
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'amount', label: 'Amount', render: r => `$${r.amount.toLocaleString()}` },
    { key: 'invoiceDate', label: 'Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'salesOrderId', label: 'Sales Order', type: 'select', required: true, options: data.salesOrders.map(s => ({ value: s.id, label: s.id })) },
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'amount', label: 'Amount', type: 'number', required: true },
    { key: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
  ];
  return <DataTable title="Invoices & Official Receipts" collection="invoices" idPrefix="INV" columns={columns} fields={fields} statusOptions={['Unpaid', 'Paid', 'Overdue', 'Cancelled']} />;
}

function DeliveriesView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Delivery ID' },
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'productId', label: 'Product', render: r => data.products.find(p => p.id === r.productId)?.productName ?? r.productId },
    { key: 'warehouseId', label: 'Warehouse', render: r => data.warehouses.find(w => w.id === r.warehouseId)?.name ?? r.warehouseId },
    { key: 'deliveryDate', label: 'Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'productId', label: 'Product', type: 'select', required: true, options: data.products.map(p => ({ value: p.id, label: p.productName })) },
    { key: 'warehouseId', label: 'Warehouse', type: 'select', required: true, options: data.warehouses.map(w => ({ value: w.id, label: w.name })) },
    { key: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
  ];
  return <DataTable title="Deliveries & Logistics" collection="deliveries" idPrefix="DEL" columns={columns} fields={fields} statusOptions={['Pending', 'In Transit', 'Delivered', 'Returned']} />;
}
