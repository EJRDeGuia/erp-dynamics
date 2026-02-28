import React from 'react';
import { useAuth } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export interface SidebarItem {
  key: string;
  label: string;
  icon: React.ElementType;
}

interface SubApplicationLayoutProps {
  title: string;
  sidebarItems: SidebarItem[];
  activeKey: string;
  onNavigate: (key: string) => void;
  children: React.ReactNode;
}

export function SubApplicationLayout({ title, sidebarItems, activeKey, onNavigate, children }: SubApplicationLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'U';

  return (
    <div className="flex flex-col h-full -m-6">
      {/* Dark Navy Header */}
      <header className="flex items-center justify-between px-6 py-3" style={{ backgroundColor: 'hsl(222, 47%, 11%)' }}>
        <h1 className="text-lg font-semibold" style={{ color: 'hsl(210, 40%, 98%)' }}>{title}</h1>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: 'hsl(210, 70%, 50%)', color: 'hsl(0, 0%, 100%)' }}>
            {initials}
          </div>
          <span className="text-sm" style={{ color: 'hsl(210, 40%, 90%)' }}>{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/10">
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Internal Sidebar */}
        <aside className="w-56 border-r border-border bg-card overflow-y-auto shrink-0">
          <nav className="py-2">
            {sidebarItems.map(item => {
              const isActive = item.key === activeKey;
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-600'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
