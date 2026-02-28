import { useState } from 'react';
import { SubApplicationLayout, SidebarItem } from '@/components/erp/SubApplicationLayout';
import { DataTable, Column, Field } from '@/components/erp/DataTable';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderKanban, ListTodo, Clock, Users, Tag, DollarSign } from 'lucide-react';

const sidebarItems: SidebarItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'projects', label: 'Project List', icon: FolderKanban },
  { key: 'tasks', label: 'Tasks', icon: ListTodo },
  { key: 'timesheets', label: 'Timesheets', icon: Clock },
  { key: 'projectUsers', label: 'Project Users', icon: Users },
  { key: 'taskTypes', label: 'Task Types', icon: Tag },
  { key: 'activityCosts', label: 'Activity Costs', icon: DollarSign },
];

export default function ProjectPage() {
  const [activeKey, setActiveKey] = useState('overview');

  return (
    <SubApplicationLayout title="Project Management Dashboard" sidebarItems={sidebarItems} activeKey={activeKey} onNavigate={setActiveKey}>
      {activeKey === 'overview' && <Overview onNavigate={setActiveKey} />}
      {activeKey === 'projects' && <ProjectsView />}
      {activeKey === 'tasks' && <TasksView />}
      {activeKey === 'timesheets' && <TimesheetsView />}
      {activeKey === 'projectUsers' && <ProjectUsersView />}
      {activeKey === 'taskTypes' && <TaskTypesView />}
      {activeKey === 'activityCosts' && <ActivityCostsView />}
    </SubApplicationLayout>
  );
}

function Overview({ onNavigate }: { onNavigate: (k: string) => void }) {
  const { data } = useERPStore();
  const cards = [
    { label: 'Projects', value: data.projects.length },
    { label: 'Tasks', value: data.tasks.length },
    { label: 'Timesheets', value: data.timesheets.length },
    { label: 'Project Users', value: data.projectUsers.length },
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
        <Button variant="outline" onClick={() => onNavigate('projects')}>Project List</Button>
        <Button variant="outline" onClick={() => onNavigate('tasks')}>Tasks</Button>
        <Button variant="outline" onClick={() => onNavigate('timesheets')}>Timesheets</Button>
      </div>
    </div>
  );
}

function ProjectsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Project ID' },
    { key: 'name', label: 'Project Name' },
    { key: 'description', label: 'Description' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'managerId', label: 'Manager', render: r => data.employees.find(e => e.id === r.managerId)?.name ?? r.managerId },
    { key: 'estCost', label: 'Est. Cost', render: r => `$${r.estCost.toLocaleString()}` },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'name', label: 'Project Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'endDate', label: 'End Date', type: 'date', required: true },
    { key: 'managerId', label: 'Manager', type: 'select', options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'estCost', label: 'Estimated Cost', type: 'number' },
  ];
  return <DataTable title="Project List" collection="projects" idPrefix="PRJ" columns={columns} fields={fields} statusOptions={['Planning', 'In Progress', 'Completed', 'On Hold']} />;
}

function TasksView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'Task ID' },
    { key: 'taskName', label: 'Task Name' },
    { key: 'projectId', label: 'Project ID' },
    { key: 'typeId', label: 'Type', render: r => data.taskTypes.find(t => t.id === r.typeId)?.taskTypeName ?? r.typeId },
    { key: 'userId', label: 'User', render: r => data.projectUsers.find(u => u.id === r.userId)?.employeeName ?? r.userId },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'estHours', label: 'Est. Hours' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'taskName', label: 'Task Name', type: 'text', required: true },
    { key: 'projectId', label: 'Project', type: 'select', required: true, options: data.projects.map(p => ({ value: p.id, label: p.name })) },
    { key: 'typeId', label: 'Task Type', type: 'select', options: data.taskTypes.map(t => ({ value: t.id, label: t.taskTypeName })) },
    { key: 'userId', label: 'User', type: 'select', options: data.projectUsers.map(u => ({ value: u.id, label: u.employeeName })) },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'endDate', label: 'End Date', type: 'date', required: true },
    { key: 'estHours', label: 'Estimated Hours', type: 'number' },
  ];
  return <DataTable title="Tasks" collection="tasks" idPrefix="TSK" columns={columns} fields={fields} statusOptions={['To Do', 'In Progress', 'Done']} />;
}

function TimesheetsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'ID' },
    { key: 'taskId', label: 'Task ID' },
    { key: 'userId', label: 'User', render: r => data.projectUsers.find(u => u.id === r.userId)?.employeeName ?? r.userId },
    { key: 'logDate', label: 'Date' },
    { key: 'hours', label: 'Hours' },
    { key: 'remarks', label: 'Remarks' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'taskId', label: 'Task', type: 'select', required: true, options: data.tasks.map(t => ({ value: t.id, label: t.taskName })) },
    { key: 'userId', label: 'User', type: 'select', required: true, options: data.projectUsers.map(u => ({ value: u.id, label: u.employeeName })) },
    { key: 'logDate', label: 'Date', type: 'date', required: true },
    { key: 'hours', label: 'Hours', type: 'number', required: true },
    { key: 'remarks', label: 'Remarks', type: 'textarea' },
  ];
  return <DataTable title="Timesheets" collection="timesheets" idPrefix="TS" columns={columns} fields={fields} statusOptions={['Draft', 'Submitted', 'Approved']} />;
}

function ProjectUsersView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'User ID' },
    { key: 'employeeName', label: 'Employee Name' },
    { key: 'role', label: 'Role' },
    { key: 'specialization', label: 'Spec.' },
    { key: 'email', label: 'Email' },
    { key: 'contactNo', label: 'Contact No.' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'employeeId', label: 'Employee', type: 'select', required: true, options: data.employees.map(e => ({ value: e.id, label: e.name })) },
    { key: 'employeeName', label: 'Employee Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', required: true },
    { key: 'specialization', label: 'Specialization', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'contactNo', label: 'Contact No.', type: 'text' },
  ];
  return <DataTable title="Project Users" collection="projectUsers" idPrefix="PU" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function TaskTypesView() {
  const columns: Column<any>[] = [
    { key: 'id', label: 'Type ID' },
    { key: 'taskTypeName', label: 'Task Type Name' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'taskTypeName', label: 'Task Type Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
  ];
  return <DataTable title="Task Types" collection="taskTypes" idPrefix="TT" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}

function ActivityCostsView() {
  const { data } = useERPStore();
  const columns: Column<any>[] = [
    { key: 'id', label: 'ID' },
    { key: 'taskTypeId', label: 'Task Type', render: r => data.taskTypes.find(t => t.id === r.taskTypeId)?.taskTypeName ?? r.taskTypeId },
    { key: 'rate', label: 'Rate (₱)', render: r => `₱${r.rate.toLocaleString()}` },
    { key: 'costType', label: 'Cost Type' },
    { key: 'effectiveDate', label: 'Effective Date' },
    { key: 'status', label: 'Status' },
  ];
  const fields: Field[] = [
    { key: 'taskTypeId', label: 'Task Type', type: 'select', required: true, options: data.taskTypes.map(t => ({ value: t.id, label: t.taskTypeName })) },
    { key: 'rate', label: 'Rate', type: 'number', required: true },
    { key: 'costType', label: 'Cost Type', type: 'select', options: [{ value: 'Hourly', label: 'Hourly' }, { value: 'Fixed', label: 'Fixed' }] },
    { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
  ];
  return <DataTable title="Activity Costs" collection="activityCosts" idPrefix="AC" columns={columns} fields={fields} statusOptions={['Active', 'Inactive']} />;
}
