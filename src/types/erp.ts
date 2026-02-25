// ========== ROLES ==========
export type UserRole = 'admin' | 'crm' | 'selling' | 'buying' | 'project' | 'service' | 'distribution' | 'hr' | 'manufacturing';

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

// ========== BASE RECORD ==========
export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

// ========== CRM ==========
export interface Customer extends BaseRecord {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'Active' | 'Inactive' | 'Lead';
}

// ========== SELLING ==========
export interface SalesOrder extends BaseRecord {
  customerId: string;
  items: string[];
  quantities: number[];
  total: number;
  status: 'Draft' | 'Confirmed' | 'Delivered' | 'Cancelled';
  orderDate: string;
}

// ========== BUYING ==========
export interface Supplier extends BaseRecord {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'Active' | 'Inactive';
}

export interface PurchaseOrder extends BaseRecord {
  supplierId: string;
  items: string[];
  quantities: number[];
  cost: number;
  status: 'Draft' | 'Ordered' | 'Received' | 'Cancelled';
  orderDate: string;
}

// ========== DISTRIBUTION ==========
export interface Item extends BaseRecord {
  name: string;
  sku: string;
  category: string;
  price: number;
  status: 'Active' | 'Inactive';
}

export interface Warehouse extends BaseRecord {
  name: string;
  location: string;
  capacity: number;
  status: 'Active' | 'Inactive';
}

export interface StockTransaction extends BaseRecord {
  itemId: string;
  warehouseId: string;
  type: 'In' | 'Out';
  quantity: number;
  referenceType: 'Purchase' | 'Sale' | 'Adjustment';
  referenceId: string;
  status: 'Completed' | 'Pending';
}

// ========== HR ==========
export interface Employee extends BaseRecord {
  name: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

// ========== PROJECT ==========
export interface Project extends BaseRecord {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
}

export interface Task extends BaseRecord {
  projectId: string;
  assigneeId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

// ========== SERVICE ==========
export interface ServiceRequest extends BaseRecord {
  customerId: string;
  assigneeId: string;
  type: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
}

// ========== MANUFACTURING ==========
export interface WorkOrder extends BaseRecord {
  itemId: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
}

// ========== STORE ==========
export interface ERPData {
  customers: Customer[];
  salesOrders: SalesOrder[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  items: Item[];
  warehouses: Warehouse[];
  stockTransactions: StockTransaction[];
  employees: Employee[];
  projects: Project[];
  tasks: Task[];
  serviceRequests: ServiceRequest[];
  workOrders: WorkOrder[];
}

export type ERPCollection = keyof ERPData;
