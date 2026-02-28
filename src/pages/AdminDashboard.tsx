import { useNavigate } from 'react-router-dom';
import { useERPStore } from '@/store/erp-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, ShoppingBag, FolderKanban, Headphones, Warehouse, UserCog, Factory, Calculator } from 'lucide-react';

const modules = [
  { key: 'customers', title: 'CRM', icon: Users, path: '/crm', collections: ['customers', 'leads', 'opportunities'] as const },
  { key: 'salesOrders', title: 'Selling', icon: ShoppingCart, path: '/selling', collections: ['salesOrders', 'invoices', 'deliveries'] as const },
  { key: 'purchaseOrders', title: 'Buying', icon: ShoppingBag, path: '/buying', collections: ['suppliers', 'purchaseOrders', 'materialRequests'] as const },
  { key: 'projects', title: 'Project', icon: FolderKanban, path: '/project', collections: ['projects', 'tasks', 'timesheets'] as const },
  { key: 'maintenanceServices', title: 'Service', icon: Headphones, path: '/service', collections: ['maintenanceServices', 'maintenanceVisits', 'warrantyClaims', 'supportTickets'] as const },
  { key: 'items', title: 'Distribution', icon: Warehouse, path: '/distribution', collections: ['items', 'warehouses', 'stockBalances', 'purchaseReceipts', 'deliveryNotes'] as const },
  { key: 'employees', title: 'HR', icon: UserCog, path: '/hr', collections: ['employees', 'payrollComponents', 'salaryStructures', 'payrollEntries', 'expenseClaims'] as const },
  { key: 'workOrders', title: 'Manufacturing', icon: Factory, path: '/manufacturing', collections: ['workOrders', 'jobCards', 'itemMasters', 'productionPlans'] as const },
  { key: 'salesInvoices', title: 'Accounts', icon: Calculator, path: '/accounts', collections: ['salesInvoices', 'payments', 'journalEntries', 'paymentTerms', 'landedCosts'] as const },
];

export default function AdminDashboard() {
  const { data } = useERPStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="text-muted-foreground">Enterprise overview across all modules</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(mod => {
          const records = mod.collections.flatMap(c => data[c] as any[]);
          const total = records.length;
          const pending = records.filter(r => ['Draft', 'Lead', 'Open', 'Planning', 'Planned', 'To Do', 'Pending', 'Ordered', 'New', 'Unpaid', 'Scheduled'].includes(r.status)).length;
          const completed = records.filter(r => ['Delivered', 'Completed', 'Done', 'Resolved', 'Closed', 'Received', 'Paid', 'Approved', 'Won', 'Applied', 'Posted'].includes(r.status)).length;
          const Icon = mod.icon;
          return (
            <Card key={mod.key} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(mod.path)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{mod.title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{total}</p>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="text-amber-600">{pending} pending</span>
                  <span className="text-emerald-600">{completed} completed</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
