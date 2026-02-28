import { useAuth } from '@/store/auth-store';
import { UserRole } from '@/types/erp';
import { NavLink } from '@/components/NavLink';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Users, ShoppingCart, ShoppingBag, FolderKanban,
  Headphones, Warehouse, UserCog, Factory, LogOut, Building2, Calculator,
} from 'lucide-react';

interface ModuleNav {
  title: string;
  url: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const modules: ModuleNav[] = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['admin'] },
  { title: 'CRM', url: '/crm', icon: Users, roles: ['admin', 'crm'] },
  { title: 'Selling', url: '/selling', icon: ShoppingCart, roles: ['admin', 'selling'] },
  { title: 'Buying', url: '/buying', icon: ShoppingBag, roles: ['admin', 'buying'] },
  { title: 'Project', url: '/project', icon: FolderKanban, roles: ['admin', 'project'] },
  { title: 'Service', url: '/service', icon: Headphones, roles: ['admin', 'service'] },
  { title: 'Distribution', url: '/distribution', icon: Warehouse, roles: ['admin', 'distribution'] },
  { title: 'HR', url: '/hr', icon: UserCog, roles: ['admin', 'hr'] },
  { title: 'Manufacturing', url: '/manufacturing', icon: Factory, roles: ['admin', 'manufacturing'] },
  { title: 'Accounts', url: '/accounts', icon: Calculator, roles: ['admin', 'accounts'] },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const visibleModules = modules.filter(m => m.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Enterprise ERP</p>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{user.role.toUpperCase()}</Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleModules.map(mod => (
                <SidebarMenuItem key={mod.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={mod.url} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                      <mod.icon className="mr-2 h-4 w-4" />
                      <span>{mod.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-sidebar-foreground truncate">
            <p className="font-medium">{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
