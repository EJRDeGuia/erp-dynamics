import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/auth-store';
import { UserRole } from '@/types/erp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const roles: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'crm', label: 'CRM' },
  { value: 'selling', label: 'Selling' },
  { value: 'buying', label: 'Buying' },
  { value: 'project', label: 'Project' },
  { value: 'service', label: 'Service' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'accounts', label: 'Accounts & Finance' },
];

const credentialsHint: Record<UserRole, string> = {
  admin: 'admin@erp.com / admin123',
  crm: 'crm@erp.com / crm123',
  selling: 'selling@erp.com / selling123',
  buying: 'buying@erp.com / buying123',
  project: 'project@erp.com / project123',
  service: 'service@erp.com / service123',
  distribution: 'distribution@erp.com / dist123',
  hr: 'hr@erp.com / hr123',
  manufacturing: 'manufacturing@erp.com / mfg123',
  accounts: 'accounts@erp.com / acc123',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = login(email, password, role);
    if (success) {
      navigate(role === 'admin' ? '/dashboard' : `/${role}`);
    } else {
      setError('Invalid credentials. Check the hint below.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Enterprise ERP</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {roles.map(r => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Sign In</Button>
            <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>{credentialsHint[role]}</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
