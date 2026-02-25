import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BaseRecord, ERPCollection } from '@/types/erp';
import { useERPStore } from '@/store/erp-store';
import { Plus, Search, Eye, Pencil, Trash2, BarChart3, FileText, LayoutDashboard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ========== TYPES ==========
export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  render?: (record: T) => React.ReactNode;
}

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface ModulePageProps<T extends BaseRecord> {
  title: string;
  collection: ERPCollection;
  idPrefix: string;
  columns: ColumnDef<T>[];
  fields: FieldDef[];
  statusOptions: string[];
  getStatusColor: (status: string) => string;
}

// ========== STATUS BADGE ==========
export function StatusBadge({ status, getColor }: { status: string; getColor: (s: string) => string }) {
  const color = getColor(status);
  return <Badge className={color}>{status}</Badge>;
}

// ========== MODULE PAGE ==========
export function ModulePage<T extends BaseRecord>({
  title, collection, idPrefix, columns, fields, statusOptions, getStatusColor,
}: ModulePageProps<T>) {
  const { data, addRecord, updateRecord, deleteRecord } = useERPStore();
  const records = data[collection] as unknown as T[];

  const [view, setView] = useState<'dashboard' | 'table' | 'report'>('dashboard');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState<T | null>(null);
  const [editRecord, setEditRecord] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Summary counts
  const totalRecords = records.length;
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    statusOptions.forEach(s => counts[s] = 0);
    records.forEach(r => { counts[r.status] = (counts[r.status] || 0) + 1; });
    return counts;
  }, [records, statusOptions]);

  // Filtered records
  const filtered = useMemo(() => {
    return records.filter(r => {
      const matchSearch = !search || Object.values(r).some(v =>
        String(v).toLowerCase().includes(search.toLowerCase())
      );
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [records, search, statusFilter]);

  // Form handling
  const openCreateForm = () => {
    setEditRecord(null);
    const defaults: Record<string, any> = {};
    fields.forEach(f => {
      defaults[f.key] = f.type === 'number' ? 0 : '';
    });
    defaults.status = statusOptions[0];
    setFormData(defaults);
    setFormOpen(true);
  };

  const openEditForm = (record: T) => {
    setEditRecord(record);
    const vals: Record<string, any> = {};
    fields.forEach(f => { vals[f.key] = (record as any)[f.key] ?? ''; });
    vals.status = record.status;
    setFormData(vals);
    setFormOpen(true);
  };

  const handleSave = () => {
    // Validate required fields
    for (const f of fields) {
      if (f.required && !formData[f.key] && formData[f.key] !== 0) {
        return; // simple validation
      }
    }
    if (editRecord) {
      updateRecord(collection, editRecord.id, formData);
    } else {
      addRecord(collection, formData as any, idPrefix);
    }
    setFormOpen(false);
  };

  // Chart data
  const chartData = useMemo(() =>
    statusOptions.map(s => ({ name: s, count: statusCounts[s] || 0 })),
  [statusCounts, statusOptions]);

  const CHART_COLORS = ['hsl(210, 70%, 50%)', 'hsl(45, 90%, 50%)', 'hsl(140, 60%, 45%)', 'hsl(0, 70%, 55%)', 'hsl(270, 50%, 55%)'];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <div className="flex gap-2">
          <Button variant={view === 'dashboard' ? 'default' : 'outline'} size="sm" onClick={() => setView('dashboard')}>
            <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
          </Button>
          <Button variant={view === 'table' ? 'default' : 'outline'} size="sm" onClick={() => setView('table')}>
            <FileText className="h-4 w-4 mr-1" /> Data Table
          </Button>
          <Button variant={view === 'report' ? 'default' : 'outline'} size="sm" onClick={() => setView('report')}>
            <BarChart3 className="h-4 w-4 mr-1" /> Reports
          </Button>
        </div>
      </div>

      {/* ====== DASHBOARD VIEW ====== */}
      {view === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{totalRecords}</p></CardContent></Card>
            {statusOptions.slice(0, 3).map(s => (
              <Card key={s}><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{s}</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">{statusCounts[s] || 0}</p></CardContent></Card>
            ))}
          </div>
          <div className="flex gap-4">
            <Button onClick={openCreateForm}><Plus className="h-4 w-4 mr-1" /> New Record</Button>
            <Button variant="outline" onClick={() => setView('table')}>View All Records</Button>
          </div>
        </div>
      )}

      {/* ====== TABLE VIEW ====== */}
      {view === 'table' && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={openCreateForm}><Plus className="h-4 w-4 mr-1" /> Add</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    {columns.map(c => <TableHead key={String(c.key)}>{c.label}</TableHead>)}
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={columns.length + 3} className="text-center text-muted-foreground py-8">No records found.</TableCell></TableRow>
                  ) : filtered.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-xs">{record.id}</TableCell>
                      {columns.map(c => (
                        <TableCell key={String(c.key)}>
                          {c.render ? c.render(record) : String((record as any)[c.key] ?? '')}
                        </TableCell>
                      ))}
                      <TableCell><StatusBadge status={record.status} getColor={getStatusColor} /></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setViewRecord(record)}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditForm(record)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteRecord(collection, record.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====== REPORT VIEW ====== */}
      {view === 'report' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Records</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{totalRecords}</p></CardContent></Card>
            {statusOptions.map(s => (
              <Card key={s}><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{s}</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">{statusCounts[s] || 0}</p></CardContent></Card>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Status Distribution (Bar)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Status Breakdown (Pie)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="count" label={({ name, count }) => `${name}: ${count}`}>
                      {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ====== VIEW DETAIL DIALOG ====== */}
      <Dialog open={!!viewRecord} onOpenChange={() => setViewRecord(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Record Details — {viewRecord?.id}</DialogTitle></DialogHeader>
          {viewRecord && (
            <div className="space-y-2 text-sm">
              {Object.entries(viewRecord).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1">
                  <span className="font-medium text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{Array.isArray(v) ? v.join(', ') : String(v)}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ====== CREATE/EDIT FORM DIALOG ====== */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editRecord ? `Edit ${editRecord.id}` : 'Create New Record'}</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {fields.map(f => (
              <div key={f.key} className="space-y-1.5">
                <Label>{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
                {f.type === 'select' ? (
                  <Select value={formData[f.key] ?? ''} onValueChange={v => setFormData(p => ({ ...p, [f.key]: v }))}>
                    <SelectTrigger><SelectValue placeholder={`Select ${f.label}`} /></SelectTrigger>
                    <SelectContent>
                      {f.options?.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : f.type === 'textarea' ? (
                  <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData[f.key] ?? ''} onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))} />
                ) : (
                  <Input type={f.type} value={formData[f.key] ?? ''} placeholder={f.placeholder}
                    onChange={e => setFormData(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} />
                )}
              </div>
            ))}
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={formData.status ?? statusOptions[0]} onValueChange={v => setFormData(p => ({ ...p, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editRecord ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
