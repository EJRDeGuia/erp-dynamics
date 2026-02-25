import { ERPData } from '@/types/erp';

const now = new Date().toISOString();

export const seedData: ERPData = {
  customers: [
    { id: 'CUST-001', name: 'Acme Corp', email: 'contact@acme.com', phone: '+1-555-0101', company: 'Acme Corp', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-002', name: 'Globex Inc', email: 'info@globex.com', phone: '+1-555-0102', company: 'Globex Inc', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-003', name: 'Initech LLC', email: 'hello@initech.com', phone: '+1-555-0103', company: 'Initech LLC', status: 'Lead', createdAt: now, updatedAt: now },
    { id: 'CUST-004', name: 'Umbrella Co', email: 'sales@umbrella.com', phone: '+1-555-0104', company: 'Umbrella Co', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-005', name: 'Wayne Enterprises', email: 'bruce@wayne.com', phone: '+1-555-0105', company: 'Wayne Enterprises', status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  salesOrders: [
    { id: 'SO-001', customerId: 'CUST-001', items: ['ITEM-001', 'ITEM-002'], quantities: [10, 5], total: 2500, status: 'Confirmed', orderDate: '2026-02-20', createdAt: now, updatedAt: now },
    { id: 'SO-002', customerId: 'CUST-002', items: ['ITEM-003'], quantities: [20], total: 4000, status: 'Draft', orderDate: '2026-02-22', createdAt: now, updatedAt: now },
    { id: 'SO-003', customerId: 'CUST-004', items: ['ITEM-001'], quantities: [50], total: 7500, status: 'Delivered', orderDate: '2026-02-10', createdAt: now, updatedAt: now },
  ],
  suppliers: [
    { id: 'SUP-001', name: 'Steel Works Ltd', email: 'orders@steelworks.com', phone: '+1-555-0201', company: 'Steel Works Ltd', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SUP-002', name: 'Plastic Solutions', email: 'sales@plastic.com', phone: '+1-555-0202', company: 'Plastic Solutions', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SUP-003', name: 'ElectroParts Co', email: 'info@electroparts.com', phone: '+1-555-0203', company: 'ElectroParts Co', status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  purchaseOrders: [
    { id: 'PO-001', supplierId: 'SUP-001', items: ['ITEM-001'], quantities: [100], cost: 5000, status: 'Received', orderDate: '2026-02-01', createdAt: now, updatedAt: now },
    { id: 'PO-002', supplierId: 'SUP-002', items: ['ITEM-003'], quantities: [200], cost: 8000, status: 'Ordered', orderDate: '2026-02-15', createdAt: now, updatedAt: now },
  ],
  items: [
    { id: 'ITEM-001', name: 'Steel Rod A', sku: 'SR-001', category: 'Raw Materials', price: 150, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITEM-002', name: 'Circuit Board B', sku: 'CB-002', category: 'Electronics', price: 200, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITEM-003', name: 'Plastic Housing C', sku: 'PH-003', category: 'Components', price: 200, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITEM-004', name: 'Motor Unit D', sku: 'MU-004', category: 'Machinery', price: 500, status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  warehouses: [
    { id: 'WH-001', name: 'Main Warehouse', location: 'New York', capacity: 10000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WH-002', name: 'West Coast Hub', location: 'Los Angeles', capacity: 8000, status: 'Active', createdAt: now, updatedAt: now },
  ],
  stockTransactions: [
    { id: 'STK-001', itemId: 'ITEM-001', warehouseId: 'WH-001', type: 'In', quantity: 100, referenceType: 'Purchase', referenceId: 'PO-001', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'STK-002', itemId: 'ITEM-001', warehouseId: 'WH-001', type: 'Out', quantity: 10, referenceType: 'Sale', referenceId: 'SO-001', status: 'Completed', createdAt: now, updatedAt: now },
  ],
  employees: [
    { id: 'EMP-001', name: 'John Smith', email: 'john@company.com', department: 'Engineering', position: 'Senior Engineer', hireDate: '2024-01-15', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-002', name: 'Sarah Johnson', email: 'sarah@company.com', department: 'Sales', position: 'Sales Manager', hireDate: '2023-06-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-003', name: 'Mike Davis', email: 'mike@company.com', department: 'HR', position: 'HR Director', hireDate: '2022-03-10', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-004', name: 'Emily Chen', email: 'emily@company.com', department: 'Engineering', position: 'Project Manager', hireDate: '2024-08-20', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-005', name: 'Robert Wilson', email: 'robert@company.com', department: 'Manufacturing', position: 'Floor Supervisor', hireDate: '2023-11-05', status: 'On Leave', createdAt: now, updatedAt: now },
  ],
  projects: [
    { id: 'PRJ-001', name: 'ERP Implementation', description: 'Internal ERP rollout', startDate: '2026-01-01', endDate: '2026-06-30', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'PRJ-002', name: 'Website Redesign', description: 'Corporate website overhaul', startDate: '2026-02-01', endDate: '2026-04-30', status: 'Planning', createdAt: now, updatedAt: now },
  ],
  tasks: [
    { id: 'TSK-001', projectId: 'PRJ-001', assigneeId: 'EMP-001', title: 'Database Schema Design', description: 'Design the database schema', dueDate: '2026-02-28', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'TSK-002', projectId: 'PRJ-001', assigneeId: 'EMP-004', title: 'UI Wireframes', description: 'Create wireframes for all modules', dueDate: '2026-03-15', status: 'To Do', createdAt: now, updatedAt: now },
    { id: 'TSK-003', projectId: 'PRJ-002', assigneeId: 'EMP-001', title: 'Homepage Layout', description: 'Design new homepage', dueDate: '2026-03-01', status: 'To Do', createdAt: now, updatedAt: now },
  ],
  serviceRequests: [
    { id: 'SRV-001', customerId: 'CUST-001', assigneeId: 'EMP-002', type: 'Technical Support', priority: 'High', description: 'System integration issue', status: 'Open', createdAt: now, updatedAt: now },
    { id: 'SRV-002', customerId: 'CUST-002', assigneeId: 'EMP-001', type: 'Maintenance', priority: 'Medium', description: 'Quarterly maintenance check', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'SRV-003', customerId: 'CUST-004', assigneeId: 'EMP-002', type: 'Consultation', priority: 'Low', description: 'Product usage consultation', status: 'Resolved', createdAt: now, updatedAt: now },
  ],
  workOrders: [
    { id: 'WO-001', itemId: 'ITEM-001', quantity: 500, startDate: '2026-02-01', endDate: '2026-03-01', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'WO-002', itemId: 'ITEM-002', quantity: 200, startDate: '2026-02-15', endDate: '2026-03-15', status: 'Planned', createdAt: now, updatedAt: now },
  ],
};
