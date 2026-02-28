import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Warehouse as WarehouseIcon, BarChart3, ClipboardList, Truck } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'items', label: 'Items', icon: Package },
  { key: 'warehouses', label: 'Warehouses', icon: WarehouseIcon },
  { key: 'stockBalance', label: 'Stock Balance', icon: BarChart3 },
  { key: 'purchaseReceipts', label: 'Purchase Receipts', icon: ClipboardList },
  { key: 'deliveryNotes', label: 'Delivery Notes', icon: Truck },
];

export default function DistributionPage() {
  const [activeKey, setActiveKey] = useState('overview');
  const { data, updateRecord } = useERPStore();

  return (
    <SubApplicationLayout title="Distribution System Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'items' && <ItemsView />}
      {activeKey === 'warehouses' && <WarehousesView />}
      {activeKey === 'stockBalance' && <StockBalanceView />}
      {activeKey === 'purchaseReceipts' && <PurchaseReceiptsView />}
      {activeKey === 'deliveryNotes' && <DeliveryNotesView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Total Items', value: data.items.length, color: 'hsl(210, 70%, 50%)' },
    { label: 'Warehouses', value: data.warehouses.length, color: 'hsl(140, 60%, 45%)' },
    { label: 'Purchase Receipts', value: data.purchaseReceipts.length, color: 'hsl(45, 90%, 50%)' },
    { label: 'Delivery Notes', value: data.deliveryNotes.length, color: 'hsl(0, 70%, 55%)' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Card key={c.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{c.label}</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{c.value}</p></CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => onNavigate('items')}>View All Items</Button>
        <Button variant="outline" onClick={() => onNavigate('stockBalance')}>Check Stock</Button>
        <Button variant="outline" onClick={() => onNavigate('purchaseReceipts')}>Purchase Receipts</Button>
        <Button variant="outline" onClick={() => onNavigate('deliveryNotes')}>Delivery Notes</Button>
      </div>
    </div>
  );
}

function ItemsView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Item ID' },
    { key: 'name', label: 'Item Name' },
    { key: 'unit', label: 'Unit' },
    { key: 'cost', label: 'Cost', render: r => `$${r.cost.toFixed(2)}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'name', label: 'Item Name', type: 'text', required: true },
    { key: 'sku', label: 'SKU', type: 'text', required: true },
    { key: 'unit', label: 'Unit', type: 'select', required: true, options: [{ value: 'pcs', label: 'pcs' }, { value: 'meter', label: 'meter' }, { value: 'sheet', label: 'sheet' }, { value: 'unit', label: 'unit' }] },
    { key: 'cost', label: 'Cost', type: 'number', required: true },
  ];
  return <DataTable title="Items Inventory" collection="items" idPrefix="ITM" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} addLabel="+ Add Item" />;
}

function WarehousesView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Warehouse ID' },
    { key: 'name', label: 'Warehouse Name' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'name', label: 'Warehouse Name', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text', required: true },
    { key: 'capacity', label: 'Capacity', type: 'number', required: true },
  ];
  return <DataTable title="Warehouses" collection="warehouses" idPrefix="WH" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} addLabel="+ Add Warehouse" />;
}

function StockBalanceView() {
  const { updateRecord } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'itemId', label: 'Item ID' },
    { key: 'warehouseId', label: 'Warehouse ID' },
    { key: 'quantityOnHand', label: 'Quantity on Hand' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'itemId', label: 'Item ID', type: 'text', required: true },
    { key: 'warehouseId', label: 'Warehouse ID', type: 'text', required: true },
    { key: 'quantityOnHand', label: 'Quantity on Hand', type: 'number', required: true },
  ];
  return <DataTable title="Stock Balance" collection="stockBalances" idPrefix="SB" columns={columns} fields={fields} statusOptions={['In Stock', 'Low Stock', 'Out of Stock']} showAdjust onAdjust={(r: any) => {
    const newQty = prompt('Enter new quantity:', String(r.quantityOnHand));
    if (newQty !== null) {
      const qty = parseInt(newQty);
      const status = qty === 0 ? 'Out of Stock' : qty < 50 ? 'Low Stock' : 'In Stock';
      updateRecord('stockBalances', r.id, { quantityOnHand: qty, status } as any);
    }
  }} />;
}

function PurchaseReceiptsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Receipt ID' },
    { key: 'supplierId', label: 'Supplier', render: r => data.suppliers.find(s => s.id === r.supplierId)?.name ?? r.supplierId },
    { key: 'receiptDate', label: 'Receipt Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'supplierId', label: 'Supplier', type: 'select', required: true, options: data.suppliers.map(s => ({ value: s.id, label: s.name })) },
    { key: 'receiptDate', label: 'Receipt Date', type: 'date', required: true },
  ];
  return <DataTable title="Purchase Receipts" collection="purchaseReceipts" idPrefix="PR" columns={columns} fields={fields} statusOptions={['Received', 'Pending', 'Cancelled']} addLabel="+ New Receipt" />;
}

function DeliveryNotesView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Delivery ID' },
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'deliveryDate', label: 'Delivery Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
  ];
  return <DataTable title="Delivery Notes" collection="deliveryNotes" idPrefix="DN" columns={columns} fields={fields} statusOptions={['Delivered', 'Pending', 'Cancelled']} addLabel="+ New Delivery" />;
}
