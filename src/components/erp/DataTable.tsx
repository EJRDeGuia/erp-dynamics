import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Eye, Pencil, Trash2, Settings2 } from 'lucide-react';
import { BaseRecord, ERPCollection } from '@/types/erp';
import { useERPStore } from '@/store/erp-store';

export interface Column<T> {
  key: string;
  label: string;
  render?: (record: T) => React.ReactNode;
}

export interface Field {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface DataTableProps<T extends BaseRecord> {
  title: string;
  collection: ERPCollection;
  idPrefix: string;
  columns: Column<T>[];
  fields: Field[];
  statusOptions: string[];
  addLabel?: string;
  showAdjust?: boolean;
  onAdjust?: (record: T) => void;
}

function ActionBadge({ variant, icon: Icon, onClick, label }: { variant: 'view' | 'edit' | 'delete' | 'adjust'; icon: React.ElementType; onClick: () => void; label: string }) {
  const styles = {
    view: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
    edit: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    delete: 'bg-red-100 text-red-700 hover:bg-red-200',
    adjust: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${styles[variant]}`}>
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}

export function DataTable<T extends BaseRecord>({
  title, collection, idPrefix, columns, fields, statusOptions, addLabel = '+ Add', showAdjust, onAdjust,
}: DataTableProps<T>) {
  const { data, addRecord, updateRecord, deleteRecord } = useERPStore();
  const records = data[collection] as unknown as T[];
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState<T | null>(null);
  const [editRecord, setEditRecord] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const filtered = useMemo(() => {
    if (!search) return records;
    const q = search.toLowerCase();
    return records.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
  }, [records, search]);

  const openCreate = () => {
    setEditRecord(null);
    const d: Record<string, any> = {};
    fields.forEach(f => { d[f.key] = f.type === 'number' ? 0 : ''; });
    d.status = statusOptions[0];
    setFormData(d);
    setFormOpen(true);
  };

  const openEdit = (record: T) => {
    setEditRecord(record);
    const d: Record<string, any> = {};
    fields.forEach(f => { d[f.key] = (record as any)[f.key] ?? ''; });
    d.status = record.status;
    setFormData(d);
    setFormOpen(true);
  };

  const handleSave = () => {
    for (const f of fields) {
      if (f.required && !formData[f.key] && formData[f.key] !== 0) return;
    }
    if (editRecord) {
      updateRecord(collection, editRecord.id, formData);
    } else {
      addRecord(collection, formData as any, idPrefix);
    }
    setFormOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-64" />
          </div>
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-1" /> {addLabel}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map(c => (
                  <TableHead key={c.key} className="uppercase text-xs font-semibold tracking-wider text-muted-foreground">
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">No records found.</TableCell></TableRow>
              ) : filtered.map((record, idx) => (
                <TableRow key={record.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  {columns.map(c => (
                    <TableCell key={c.key} className="text-sm">
                      {c.render ? c.render(record) : String((record as any)[c.key] ?? '')}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <ActionBadge variant="view" icon={Eye} onClick={() => setViewRecord(record)} label="View" />
                      {showAdjust && onAdjust ? (
                        <ActionBadge variant="adjust" icon={Settings2} onClick={() => onAdjust(record)} label="Adjust" />
                      ) : (
                        <>
                          <ActionBadge variant="edit" icon={Pencil} onClick={() => openEdit(record)} label="Edit" />
                          <ActionBadge variant="delete" icon={Trash2} onClick={() => deleteRecord(collection, record.id)} label="Delete" />
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
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

      {/* Create/Edit Dialog */}
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
