import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, CreditCard, BookOpen, ClipboardList, DollarSign } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'salesInvoices', label: 'Sales Invoices', icon: FileText },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'journalEntries', label: 'Journal Entries', icon: BookOpen },
  { key: 'paymentTerms', label: 'Payment Terms', icon: ClipboardList },
  { key: 'landedCost', label: 'Landed Cost', icon: DollarSign },
];

export default function AccountsPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Accounts & Finance Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'salesInvoices' && <SalesInvoicesView />}
      {activeKey === 'payments' && <PaymentsView />}
      {activeKey === 'journalEntries' && <JournalEntriesView />}
      {activeKey === 'paymentTerms' && <PaymentTermsView />}
      {activeKey === 'landedCost' && <LandedCostView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const totalCollected = data.payments.reduce((sum, p) => sum + p.amount, 0);
  const cards = [
    { label: 'Sales Invoices', value: data.salesInvoices.length },
    { label: 'Payments', value: data.payments.length },
    { label: 'Journal Entries', value: data.journalEntries.length },
    { label: 'Total Collected', value: `$${totalCollected.toLocaleString()}` },
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
        <Button variant="outline" onClick={() => onNavigate('salesInvoices')}>Sales Invoices</Button>
        <Button variant="outline" onClick={() => onNavigate('payments')}>Payments</Button>
        <Button variant="outline" onClick={() => onNavigate('journalEntries')}>Journal Entries</Button>
      </div>
    </div>
  );
}

function SalesInvoicesView() {
  const { data } = useERPStore();
  const totalPortfolio = data.salesInvoices.reduce((sum, si) => sum + si.totalCollected, 0);
  const columns: Column<any>[] = [
    { key: 'salesOrderId', label: 'Sales Order' },
    { key: 'id', label: 'Invoice ID(s)' },
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'lastPayment', label: 'Last Payment' },
    { key: 'totalCollected', label: 'Total Collected', render: r => `$${r.totalCollected.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'salesOrderId', label: 'Sales Order', type: 'select', required: true, options: data.salesOrders.map(s => ({ value: s.id, label: s.id })) },
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'lastPayment', label: 'Last Payment Date', type: 'date' },
    { key: 'totalCollected', label: 'Total Collected', type: 'number' },
  ];
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-card border">
        <p className="text-sm text-muted-foreground">Total Portfolio Collection</p>
        <p className="text-2xl font-bold text-foreground">${totalPortfolio.toLocaleString()}</p>
      </div>
      <DataTable title="Sales Invoices" collection="salesInvoices" idPrefix="SI" columns={columns} fields={fields} statusOptions={['Unpaid', 'Partially Paid', 'Paid', 'Overdue']} />
    </div>
  );
}

function PaymentsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Payment ID' },
    { key: 'invoiceId', label: 'Inv ID' },
    { key: 'customerId', label: 'Customer', render: r => data.customers.find(c => c.id === r.customerId)?.name ?? r.customerId },
    { key: 'paymentDate', label: 'Date' },
    { key: 'method', label: 'Method' },
    { key: 'amount', label: 'Amount', render: r => `$${r.amount.toLocaleString()}` },
    { key: 'reference', label: 'Reference' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'invoiceId', label: 'Invoice', type: 'select', required: true, options: data.salesInvoices.map(i => ({ value: i.id, label: i.id })) },
    { key: 'customerId', label: 'Customer', type: 'select', required: true, options: data.customers.map(c => ({ value: c.id, label: c.name })) },
    { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
    { key: 'method', label: 'Method', type: 'select', options: [{ value: 'Bank Transfer', label: 'Bank Transfer' }, { value: 'Check', label: 'Check' }, { value: 'Credit Card', label: 'Credit Card' }, { value: 'Cash', label: 'Cash' }] },
    { key: 'amount', label: 'Amount', type: 'number', required: true },
    { key: 'reference', label: 'Reference', type: 'text' },
  ];
  return <DataTable title="Payments" collection="payments" idPrefix="PAY" columns={columns} fields={fields} statusOptions={['Pending', 'Completed', 'Failed']} />;
}

function JournalEntriesView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'ID' },
    { key: 'entryType', label: 'Entry Type' },
    { key: 'entryDate', label: 'Date' },
    { key: 'totalDebit', label: 'Total Debit', render: r => `$${r.totalDebit.toLocaleString()}` },
    { key: 'totalCredit', label: 'Total Credit', render: r => `$${r.totalCredit.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'entryType', label: 'Entry Type', type: 'select', options: [{ value: 'Payroll', label: 'Payroll' }, { value: 'Sales', label: 'Sales' }, { value: 'Purchase', label: 'Purchase' }, { value: 'Adjustment', label: 'Adjustment' }] },
    { key: 'entryDate', label: 'Date', type: 'date', required: true },
    { key: 'totalDebit', label: 'Total Debit', type: 'number', required: true },
    { key: 'totalCredit', label: 'Total Credit', type: 'number', required: true },
  ];
  return <DataTable title="Journal Entries" collection="journalEntries" idPrefix="JE" columns={columns} fields={fields} statusOptions={['Draft', 'Posted', 'Cancelled']} />;
}

function PaymentTermsView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Term ID' },
    { key: 'termName', label: 'Term Name' },
    { key: 'daysDue', label: 'Days Due' },
    { key: 'discountPercent', label: 'Discount %', render: r => `${r.discountPercent}%` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'termName', label: 'Term Name', type: 'text', required: true },
    { key: 'daysDue', label: 'Days Due', type: 'number', required: true },
    { key: 'discountPercent', label: 'Discount %', type: 'number' },
  ];
  return <DataTable title="Payment Terms (Masters)" collection="paymentTerms" idPrefix="PT" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function LandedCostView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Voucher ID' },
    { key: 'purchaseReceiptId', label: 'Purchase Receipt' },
    { key: 'chargesType', label: 'Charges Type' },
    { key: 'totalCharges', label: 'Total Charges', render: r => `$${r.totalCharges.toLocaleString()}` },
    { key: 'basis', label: 'Basis' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'purchaseReceiptId', label: 'Purchase Receipt', type: 'select', required: true, options: data.purchaseReceipts.map(p => ({ value: p.id, label: p.id })) },
    { key: 'chargesType', label: 'Charges Type', type: 'select', options: [{ value: 'Freight', label: 'Freight' }, { value: 'Customs Duty', label: 'Customs Duty' }, { value: 'Insurance', label: 'Insurance' }] },
    { key: 'totalCharges', label: 'Total Charges', type: 'number', required: true },
    { key: 'basis', label: 'Basis', type: 'select', options: [{ value: 'Amount', label: 'Amount' }, { value: 'Quantity', label: 'Quantity' }] },
  ];
  return <DataTable title="Landed Cost" collection="landedCosts" idPrefix="LC" columns={columns} fields={fields} statusOptions={['Draft', 'Applied', 'Cancelled']} />;
}
