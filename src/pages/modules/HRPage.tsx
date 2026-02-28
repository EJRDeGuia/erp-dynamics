import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UserPlus, DollarSign, FileSpreadsheet, CreditCard, Receipt } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'employees', label: 'Employee Registration', icon: UserPlus },
  { key: 'payrollComponents', label: 'Payroll Components', icon: DollarSign },
  { key: 'salaryStructures', label: 'Salary Structures', icon: FileSpreadsheet },
  { key: 'payrollEntry', label: 'Payroll Entry', icon: CreditCard },
  { key: 'expenseClaims', label: 'Expense Claims', icon: Receipt },
];

export default function HRPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Human Resources Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'employees' && <EmployeesView />}
      {activeKey === 'payrollComponents' && <PayrollComponentsView />}
      {activeKey === 'salaryStructures' && <SalaryStructuresView />}
      {activeKey === 'payrollEntry' && <PayrollEntryView />}
      {activeKey === 'expenseClaims' && <ExpenseClaimsView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Employees', value: data.employees.length },
    { label: 'Payroll Components', value: data.payrollComponents.length },
    { label: 'Salary Structures', value: data.salaryStructures.length },
    { label: 'Expense Claims', value: data.expenseClaims.length },
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
        <Button variant="outline" onClick={() => onNavigate('employees')}>Employee Registration</Button>
        <Button variant="outline" onClick={() => onNavigate('payrollEntry')}>Payroll Entry</Button>
        <Button variant="outline" onClick={() => onNavigate('expenseClaims')}>Expense Claims</Button>
      </div>
    </div>
  );
}

function EmployeesView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Emp ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'department', label: 'Department' },
    { key: 'email', label: 'Email' },
    { key: 'contactNo', label: 'Contact No.' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'name', label: 'Full Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'department', label: 'Department', type: 'text', required: true },
    { key: 'position', label: 'Position', type: 'text', required: true },
    { key: 'contactNo', label: 'Contact No.', type: 'text' },
    { key: 'hireDate', label: 'Hire Date', type: 'date', required: true },
  ];
  return <DataTable title="Employee Registration" collection="employees" idPrefix="EMP" columns={columns} fields={fields} statusOptions={['Active', 'On Leave', 'Terminated']} />;
}

function PayrollComponentsView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Comp ID' },
    { key: 'componentName', label: 'Name' },
    { key: 'componentType', label: 'Type' },
    { key: 'defaultAmount', label: 'Default Amount', render: r => `$${r.defaultAmount.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'componentName', label: 'Component Name', type: 'text', required: true },
    { key: 'componentType', label: 'Type', type: 'select', required: true, options: [{ value: 'Earning', label: 'Earning' }, { value: 'Deduction', label: 'Deduction' }] },
    { key: 'defaultAmount', label: 'Default Amount', type: 'number', required: true },
  ];
  return <DataTable title="Payroll Components" collection="payrollComponents" idPrefix="PC" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function SalaryStructuresView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Structure ID' },
    { key: 'employeeId', label: 'Employee', render: r => data.employees.find(e => e.id === r.employeeId)?.name ?? r.employeeId },
    { key: 'totalCTC', label: 'Total CTC', render: r => `$${r.totalCTC.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'employeeId', label: 'Employee', type: 'select', required: true, options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'totalCTC', label: 'Total CTC', type: 'number', required: true },
  ];
  return <DataTable title="Salary Structures" collection="salaryStructures" idPrefix="SS" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function PayrollEntryView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Payroll ID' },
    { key: 'journalEntryId', label: 'Journal Entry ID' },
    { key: 'payrollDate', label: 'Date' },
    { key: 'netAmount', label: 'Net Amount', render: r => `$${r.netAmount.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'journalEntryId', label: 'Journal Entry ID', type: 'text' },
    { key: 'payrollDate', label: 'Payroll Date', type: 'date', required: true },
    { key: 'netAmount', label: 'Net Amount', type: 'number', required: true },
  ];
  return <DataTable title="Payroll Entry" collection="payrollEntries" idPrefix="PRL" columns={columns} fields={fields} statusOptions={['Draft', 'Processed', 'Paid']} />;
}

function ExpenseClaimsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Claim ID' },
    { key: 'employeeId', label: 'Emp ID', render: r => data.employees.find(e => e.id === r.employeeId)?.name ?? r.employeeId },
    { key: 'claimType', label: 'Type' },
    { key: 'amount', label: 'Amount', render: r => `$${r.amount.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'employeeId', label: 'Employee', type: 'select', required: true, options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'claimType', label: 'Claim Type', type: 'select', options: [{ value: 'Travel', label: 'Travel' }, { value: 'Equipment', label: 'Equipment' }, { value: 'Training', label: 'Training' }, { value: 'Office Supplies', label: 'Office Supplies' }] },
    { key: 'amount', label: 'Amount', type: 'number', required: true },
  ];
  return <DataTable title="Expense Claims" collection="expenseClaims" idPrefix="EC" columns={columns} fields={fields} statusOptions={['Pending', 'Approved', 'Rejected', 'Paid']} />;
}
