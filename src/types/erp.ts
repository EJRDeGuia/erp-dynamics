// ========== ROLES ==========
export type UserRole = 'admin' | 'crm' | 'selling' | 'buying' | 'project' | 'service' | 'distribution' | 'hr' | 'manufacturing' | 'accounts';

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
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  address: string;
  status: 'Active' | 'Inactive' | 'Lead';
}

export interface Lead extends BaseRecord {
  customerId: string;
  source: string;
  leadDate: string;
  bundleId: string;
  assignedTo: string;
  followUp: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
}

export interface Opportunity extends BaseRecord {
  leadId: string;
  customerId: string;
  assignedTo: string;
  estimatedValue: number;
  probability: number;
  stage: string;
  status: 'Open' | 'Won' | 'Lost' | 'Negotiation';
}

export interface Product extends BaseRecord {
  productName: string;
  qty: number;
  unitPrice: number;
  status: 'Active' | 'Inactive';
}

export interface MaterialRequest extends BaseRecord {
  bundleId: string;
  requestedBy: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled';
}

export interface ProductBundle extends BaseRecord {
  bundleName: string;
  itemsIncluded: string[];
  totalCost: number;
  status: 'Active' | 'Draft' | 'Inactive';
}

// ========== SELLING ==========
export interface SalesOrder extends BaseRecord {
  customerId: string;
  productId: string;
  qty: number;
  orderDate: string;
  address: string;
  unitPrice: number;
  total: number;
  status: 'Draft' | 'Confirmed' | 'Delivered' | 'Cancelled';
}

export interface Invoice extends BaseRecord {
  salesOrderId: string;
  customerId: string;
  amount: number;
  invoiceDate: string;
  status: 'Unpaid' | 'Paid' | 'Overdue' | 'Cancelled';
}

export interface Delivery extends BaseRecord {
  customerId: string;
  productId: string;
  warehouseId: string;
  deliveryDate: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Returned';
}

// ========== BUYING ==========
export interface Supplier extends BaseRecord {
  name: string;
  contactPerson: string;
  contactDetails: string;
  address: string;
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
  unit: string;
  cost: number;
  status: 'Active' | 'Inactive';
}

export interface Warehouse extends BaseRecord {
  name: string;
  location: string;
  capacity: number;
  status: 'Active' | 'Inactive';
}

export interface PurchaseReceipt extends BaseRecord {
  supplierId: string;
  receiptDate: string;
  status: 'Received' | 'Pending' | 'Cancelled';
}

export interface DeliveryNote extends BaseRecord {
  customerId: string;
  deliveryDate: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
}

export interface StockBalance extends BaseRecord {
  itemId: string;
  warehouseId: string;
  quantityOnHand: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
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

// ========== SERVICE ==========
export interface MaintenanceService extends BaseRecord {
  salesOrderId: string;
  serviceType: string;
  requestDate: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface MaintenanceVisit extends BaseRecord {
  serviceId: string;
  technicianId: string;
  visitDate: string;
  remarks: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface WarrantyClaim extends BaseRecord {
  salesOrderId: string;
  claimDate: string;
  issue: string;
  status: 'Open' | 'Under Review' | 'Approved' | 'Rejected';
}

export interface SupportTicket extends BaseRecord {
  salesOrderId: string;
  ticketDate: string;
  ticketType: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
}

// ========== MANUFACTURING ==========
export interface ItemMaster extends BaseRecord {
  itemName: string;
  type: string;
  supplierId: string;
  stockUom: string;
  cost: number;
  status: 'Active' | 'Inactive';
}

export interface OperationMaster extends BaseRecord {
  operationName: string;
  standardTime: number;
  costRatePerHour: number;
  status: 'Active' | 'Inactive';
}

export interface WorkstationMaster extends BaseRecord {
  workstationName: string;
  location: string;
  capacityPerDay: number;
  status: 'Active' | 'Inactive';
}

export interface BillOfMaterials extends BaseRecord {
  finishedItemId: string;
  version: string;
  createdDate: string;
  status: 'Active' | 'Draft' | 'Obsolete';
}

export interface ProductionPlan extends BaseRecord {
  planDate: string;
  plannedStart: string;
  plannedEnd: string;
  createdBy: string;
  remarks: string;
  status: 'Draft' | 'Confirmed' | 'In Progress' | 'Completed';
}

export interface WorkOrder extends BaseRecord {
  itemId: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface JobCard extends BaseRecord {
  workOrderId: string;
  assignedTo: string;
  startTime: string;
  endTime: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface StockExchange extends BaseRecord {
  workOrderId: string;
  exchangeDate: string;
  fromLocation: string;
  toLocation: string;
  remarks: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

export interface StockTransfer extends BaseRecord {
  transferType: string;
  refId: string;
  transferDate: string;
  fromWarehouse: string;
  toWarehouse: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

// ========== HR ==========
export interface Employee extends BaseRecord {
  name: string;
  email: string;
  department: string;
  position: string;
  contactNo: string;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface PayrollComponent extends BaseRecord {
  componentName: string;
  componentType: string;
  defaultAmount: number;
  status: 'Active' | 'Inactive';
}

export interface SalaryStructure extends BaseRecord {
  employeeId: string;
  totalCTC: number;
  status: 'Active' | 'Inactive';
}

export interface PayrollEntry extends BaseRecord {
  journalEntryId: string;
  payrollDate: string;
  netAmount: number;
  status: 'Draft' | 'Processed' | 'Paid';
}

export interface ExpenseClaim extends BaseRecord {
  employeeId: string;
  claimType: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
}

// ========== PROJECT ==========
export interface Project extends BaseRecord {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  managerId: string;
  estCost: number;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
}

export interface Task extends BaseRecord {
  taskName: string;
  projectId: string;
  typeId: string;
  userId: string;
  startDate: string;
  endDate: string;
  estHours: number;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface Timesheet extends BaseRecord {
  taskId: string;
  userId: string;
  logDate: string;
  hours: number;
  remarks: string;
  status: 'Draft' | 'Submitted' | 'Approved';
}

export interface ProjectUser extends BaseRecord {
  employeeId: string;
  employeeName: string;
  role: string;
  specialization: string;
  email: string;
  contactNo: string;
  status: 'Active' | 'Inactive';
}

export interface TaskType extends BaseRecord {
  taskTypeName: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface ActivityCost extends BaseRecord {
  taskTypeId: string;
  rate: number;
  costType: string;
  effectiveDate: string;
  status: 'Active' | 'Inactive';
}

// ========== ACCOUNTS / FINANCE ==========
export interface SalesInvoice extends BaseRecord {
  salesOrderId: string;
  customerId: string;
  lastPayment: string;
  totalCollected: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue';
}

export interface Payment extends BaseRecord {
  invoiceId: string;
  customerId: string;
  paymentDate: string;
  method: string;
  amount: number;
  reference: string;
  status: 'Pending' | 'Completed' | 'Failed';
}

export interface JournalEntry extends BaseRecord {
  entryType: string;
  entryDate: string;
  totalDebit: number;
  totalCredit: number;
  status: 'Draft' | 'Posted' | 'Cancelled';
}

export interface PaymentTerm extends BaseRecord {
  termName: string;
  daysDue: number;
  discountPercent: number;
  status: 'Active' | 'Inactive';
}

export interface LandedCost extends BaseRecord {
  purchaseReceiptId: string;
  chargesType: string;
  totalCharges: number;
  basis: string;
  status: 'Draft' | 'Applied' | 'Cancelled';
}

// ========== STORE ==========
export interface ERPData {
  customers: Customer[];
  leads: Lead[];
  opportunities: Opportunity[];
  products: Product[];
  materialRequests: MaterialRequest[];
  productBundles: ProductBundle[];
  salesOrders: SalesOrder[];
  invoices: Invoice[];
  deliveries: Delivery[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  items: Item[];
  warehouses: Warehouse[];
  purchaseReceipts: PurchaseReceipt[];
  deliveryNotes: DeliveryNote[];
  stockBalances: StockBalance[];
  stockTransactions: StockTransaction[];
  maintenanceServices: MaintenanceService[];
  maintenanceVisits: MaintenanceVisit[];
  warrantyClaims: WarrantyClaim[];
  supportTickets: SupportTicket[];
  itemMasters: ItemMaster[];
  operationMasters: OperationMaster[];
  workstationMasters: WorkstationMaster[];
  billOfMaterials: BillOfMaterials[];
  productionPlans: ProductionPlan[];
  workOrders: WorkOrder[];
  jobCards: JobCard[];
  stockExchanges: StockExchange[];
  stockTransfers: StockTransfer[];
  employees: Employee[];
  payrollComponents: PayrollComponent[];
  salaryStructures: SalaryStructure[];
  payrollEntries: PayrollEntry[];
  expenseClaims: ExpenseClaim[];
  projects: Project[];
  tasks: Task[];
  timesheets: Timesheet[];
  projectUsers: ProjectUser[];
  taskTypes: TaskType[];
  activityCosts: ActivityCost[];
  salesInvoices: SalesInvoice[];
  payments: Payment[];
  journalEntries: JournalEntry[];
  paymentTerms: PaymentTerm[];
  landedCosts: LandedCost[];
}

export type ERPCollection = keyof ERPData;
