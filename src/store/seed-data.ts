import { ERPData } from '@/types/erp';

const now = new Date().toISOString();

export const seedData: ERPData = {
  // ========== CRM ==========
  customers: [
    { id: 'CUST-001', name: 'Acme Corp', contactPerson: 'John Doe', email: 'contact@acme.com', phone: '+1-555-0101', industry: 'Manufacturing', address: '123 Main St, New York', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-002', name: 'Globex Inc', contactPerson: 'Jane Smith', email: 'info@globex.com', phone: '+1-555-0102', industry: 'Technology', address: '456 Oak Ave, San Francisco', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-003', name: 'Initech LLC', contactPerson: 'Mike Ross', email: 'hello@initech.com', phone: '+1-555-0103', industry: 'Finance', address: '789 Pine Rd, Chicago', status: 'Lead', createdAt: now, updatedAt: now },
    { id: 'CUST-004', name: 'Umbrella Co', contactPerson: 'Lisa Chen', email: 'sales@umbrella.com', phone: '+1-555-0104', industry: 'Pharma', address: '321 Elm St, Houston', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-005', name: 'Wayne Enterprises', contactPerson: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1-555-0105', industry: 'Defense', address: '1 Gotham Plaza, Gotham', status: 'Inactive', createdAt: now, updatedAt: now },
    { id: 'CUST-006', name: 'Stark Industries', contactPerson: 'Tony Stark', email: 'tony@stark.com', phone: '+1-555-0106', industry: 'Technology', address: '10880 Malibu Point', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-007', name: 'Oscorp', contactPerson: 'Norman Osborn', email: 'info@oscorp.com', phone: '+1-555-0107', industry: 'Biotech', address: '200 Park Ave, NY', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'CUST-008', name: 'LexCorp', contactPerson: 'Lex Luthor', email: 'lex@lexcorp.com', phone: '+1-555-0108', industry: 'Energy', address: '1 LexCorp Tower, Metropolis', status: 'Lead', createdAt: now, updatedAt: now },
  ],
  leads: [
    { id: 'LEAD-001', customerId: 'CUST-003', source: 'Website', leadDate: '2026-02-01', bundleId: 'BDL-001', assignedTo: 'EMP-002', followUp: '2026-03-01', status: 'New', createdAt: now, updatedAt: now },
    { id: 'LEAD-002', customerId: 'CUST-008', source: 'Referral', leadDate: '2026-02-05', bundleId: 'BDL-002', assignedTo: 'EMP-002', followUp: '2026-03-05', status: 'Contacted', createdAt: now, updatedAt: now },
    { id: 'LEAD-003', customerId: 'CUST-005', source: 'Trade Show', leadDate: '2026-02-10', bundleId: 'BDL-001', assignedTo: 'EMP-004', followUp: '2026-03-10', status: 'Qualified', createdAt: now, updatedAt: now },
    { id: 'LEAD-004', customerId: 'CUST-006', source: 'Cold Call', leadDate: '2026-02-12', bundleId: '', assignedTo: 'EMP-002', followUp: '2026-03-12', status: 'New', createdAt: now, updatedAt: now },
    { id: 'LEAD-005', customerId: 'CUST-007', source: 'LinkedIn', leadDate: '2026-02-15', bundleId: 'BDL-003', assignedTo: 'EMP-004', followUp: '2026-03-15', status: 'Lost', createdAt: now, updatedAt: now },
  ],
  opportunities: [
    { id: 'OPP-001', leadId: 'LEAD-001', customerId: 'CUST-003', assignedTo: 'EMP-002', estimatedValue: 50000, probability: 60, stage: 'Proposal', status: 'Open', createdAt: now, updatedAt: now },
    { id: 'OPP-002', leadId: 'LEAD-003', customerId: 'CUST-005', assignedTo: 'EMP-004', estimatedValue: 120000, probability: 80, stage: 'Negotiation', status: 'Negotiation', createdAt: now, updatedAt: now },
    { id: 'OPP-003', leadId: 'LEAD-002', customerId: 'CUST-008', assignedTo: 'EMP-002', estimatedValue: 75000, probability: 40, stage: 'Discovery', status: 'Open', createdAt: now, updatedAt: now },
    { id: 'OPP-004', leadId: 'LEAD-005', customerId: 'CUST-007', assignedTo: 'EMP-004', estimatedValue: 30000, probability: 10, stage: 'Closed', status: 'Lost', createdAt: now, updatedAt: now },
  ],
  products: [
    { id: 'PROD-001', productName: 'Steel Assembly Kit', qty: 100, unitPrice: 250, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PROD-002', productName: 'Circuit Board Module', qty: 200, unitPrice: 180, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PROD-003', productName: 'Hydraulic Pump Set', qty: 50, unitPrice: 450, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PROD-004', productName: 'Motor Controller Unit', qty: 75, unitPrice: 320, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PROD-005', productName: 'Industrial Sensor Pack', qty: 150, unitPrice: 120, status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  materialRequests: [
    { id: 'MR-001', bundleId: 'BDL-001', requestedBy: 'EMP-001', requestDate: '2026-02-10', status: 'Approved', createdAt: now, updatedAt: now },
    { id: 'MR-002', bundleId: 'BDL-002', requestedBy: 'EMP-004', requestDate: '2026-02-12', status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'MR-003', bundleId: 'BDL-003', requestedBy: 'EMP-001', requestDate: '2026-02-15', status: 'Fulfilled', createdAt: now, updatedAt: now },
    { id: 'MR-004', bundleId: 'BDL-001', requestedBy: 'EMP-005', requestDate: '2026-02-18', status: 'Pending', createdAt: now, updatedAt: now },
  ],
  productBundles: [
    { id: 'BDL-001', bundleName: 'Starter Manufacturing Kit', itemsIncluded: ['ITM-001', 'ITM-002', 'ITM-005'], totalCost: 850, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'BDL-002', bundleName: 'Advanced Electronics Bundle', itemsIncluded: ['ITM-003', 'ITM-004', 'ITM-006'], totalCost: 1200, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'BDL-003', bundleName: 'Heavy Machinery Pack', itemsIncluded: ['ITM-007', 'ITM-008', 'ITM-010'], totalCost: 3500, status: 'Draft', createdAt: now, updatedAt: now },
  ],

  // ========== SELLING ==========
  salesOrders: [
    { id: 'SO-001', customerId: 'CUST-001', productId: 'PROD-001', qty: 10, orderDate: '2026-02-20', address: '123 Main St, New York', unitPrice: 250, total: 2500, status: 'Confirmed', createdAt: now, updatedAt: now },
    { id: 'SO-002', customerId: 'CUST-002', productId: 'PROD-003', qty: 20, orderDate: '2026-02-22', address: '456 Oak Ave, San Francisco', unitPrice: 450, total: 9000, status: 'Draft', createdAt: now, updatedAt: now },
    { id: 'SO-003', customerId: 'CUST-004', productId: 'PROD-001', qty: 50, orderDate: '2026-02-10', address: '321 Elm St, Houston', unitPrice: 150, total: 7500, status: 'Delivered', createdAt: now, updatedAt: now },
    { id: 'SO-004', customerId: 'CUST-006', productId: 'PROD-002', qty: 30, orderDate: '2026-02-25', address: '10880 Malibu Point', unitPrice: 180, total: 5400, status: 'Confirmed', createdAt: now, updatedAt: now },
    { id: 'SO-005', customerId: 'CUST-007', productId: 'PROD-004', qty: 15, orderDate: '2026-02-18', address: '200 Park Ave, NY', unitPrice: 320, total: 4800, status: 'Cancelled', createdAt: now, updatedAt: now },
  ],
  invoices: [
    { id: 'INV-001', salesOrderId: 'SO-001', customerId: 'CUST-001', amount: 2500, invoiceDate: '2026-02-21', status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'INV-002', salesOrderId: 'SO-003', customerId: 'CUST-004', amount: 7500, invoiceDate: '2026-02-11', status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'INV-003', salesOrderId: 'SO-004', customerId: 'CUST-006', amount: 5400, invoiceDate: '2026-02-26', status: 'Unpaid', createdAt: now, updatedAt: now },
    { id: 'INV-004', salesOrderId: 'SO-002', customerId: 'CUST-002', amount: 9000, invoiceDate: '2026-02-23', status: 'Overdue', createdAt: now, updatedAt: now },
  ],
  deliveries: [
    { id: 'DEL-001', customerId: 'CUST-001', productId: 'PROD-001', warehouseId: 'WH-001', deliveryDate: '2026-02-25', status: 'Delivered', createdAt: now, updatedAt: now },
    { id: 'DEL-002', customerId: 'CUST-004', productId: 'PROD-001', warehouseId: 'WH-001', deliveryDate: '2026-02-15', status: 'Delivered', createdAt: now, updatedAt: now },
    { id: 'DEL-003', customerId: 'CUST-006', productId: 'PROD-002', warehouseId: 'WH-002', deliveryDate: '2026-03-01', status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'DEL-004', customerId: 'CUST-002', productId: 'PROD-003', warehouseId: 'WH-001', deliveryDate: '2026-03-05', status: 'In Transit', createdAt: now, updatedAt: now },
  ],

  // ========== BUYING ==========
  suppliers: [
    { id: 'SUP-001', name: 'Steel Works Ltd', contactPerson: 'Robert Chen', contactDetails: '+1-555-0201 | orders@steelworks.com', address: '100 Industrial Blvd, Pittsburgh', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SUP-002', name: 'Plastic Solutions', contactPerson: 'Maria Garcia', contactDetails: '+1-555-0202 | sales@plastic.com', address: '50 Polymer Dr, Dallas', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SUP-003', name: 'ElectroParts Co', contactPerson: 'David Kim', contactDetails: '+1-555-0203 | info@electroparts.com', address: '75 Circuit Ln, San Jose', status: 'Inactive', createdAt: now, updatedAt: now },
    { id: 'SUP-004', name: 'MechSupply Inc', contactPerson: 'Anna White', contactDetails: '+1-555-0204 | anna@mechsupply.com', address: '200 Gear Ave, Detroit', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SUP-005', name: 'RawMat Global', contactPerson: 'James Brown', contactDetails: '+1-555-0205 | jb@rawmat.com', address: '88 Resource Rd, Cleveland', status: 'Active', createdAt: now, updatedAt: now },
  ],
  purchaseOrders: [
    { id: 'PO-001', supplierId: 'SUP-001', items: ['ITM-001'], quantities: [100], cost: 5000, status: 'Received', orderDate: '2026-02-01', createdAt: now, updatedAt: now },
    { id: 'PO-002', supplierId: 'SUP-002', items: ['ITM-005'], quantities: [200], cost: 8000, status: 'Ordered', orderDate: '2026-02-15', createdAt: now, updatedAt: now },
    { id: 'PO-003', supplierId: 'SUP-004', items: ['ITM-007'], quantities: [50], cost: 25000, status: 'Draft', orderDate: '2026-02-20', createdAt: now, updatedAt: now },
    { id: 'PO-004', supplierId: 'SUP-005', items: ['ITM-001', 'ITM-002'], quantities: [200, 100], cost: 15000, status: 'Ordered', orderDate: '2026-02-22', createdAt: now, updatedAt: now },
  ],

  // ========== DISTRIBUTION ==========
  items: [
    { id: 'ITM-001', name: 'Steel Bolt M8', sku: 'SB-M8', unit: 'pcs', cost: 2.5, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-002', name: 'Steel Nut M8', sku: 'SN-M8', unit: 'pcs', cost: 1.8, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-003', name: 'Copper Wire 2mm', sku: 'CW-2', unit: 'meter', cost: 5.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-004', name: 'Resistor 10K', sku: 'R-10K', unit: 'pcs', cost: 0.5, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-005', name: 'Aluminum Sheet 2mm', sku: 'AS-2', unit: 'sheet', cost: 45.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-006', name: 'PVC Pipe 1in', sku: 'PP-1', unit: 'meter', cost: 8.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-007', name: 'Electric Motor 1HP', sku: 'EM-1HP', unit: 'unit', cost: 350.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-008', name: 'Bearing 6205', sku: 'BR-6205', unit: 'pcs', cost: 12.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-009', name: 'Rubber Seal Ring', sku: 'RS-01', unit: 'pcs', cost: 3.5, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-010', name: 'Hydraulic Cylinder', sku: 'HC-01', unit: 'unit', cost: 800.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-011', name: 'Stainless Steel Rod', sku: 'SSR-01', unit: 'meter', cost: 25.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-012', name: 'LED Module 12V', sku: 'LED-12', unit: 'pcs', cost: 6.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-013', name: 'Capacitor 100uF', sku: 'CAP-100', unit: 'pcs', cost: 1.2, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-014', name: 'Welding Rod 3.2mm', sku: 'WR-32', unit: 'pcs', cost: 0.8, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-015', name: 'Pneumatic Valve', sku: 'PV-01', unit: 'unit', cost: 120.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-016', name: 'Gear Box Assembly', sku: 'GBA-01', unit: 'unit', cost: 450.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-017', name: 'Timing Belt', sku: 'TB-01', unit: 'pcs', cost: 15.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-018', name: 'Heat Sink Plate', sku: 'HSP-01', unit: 'pcs', cost: 22.0, status: 'Inactive', createdAt: now, updatedAt: now },
    { id: 'ITM-019', name: 'Control Panel Box', sku: 'CPB-01', unit: 'unit', cost: 180.0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'ITM-020', name: 'Conveyor Roller', sku: 'CR-01', unit: 'pcs', cost: 65.0, status: 'Active', createdAt: now, updatedAt: now },
  ],
  warehouses: [
    { id: 'WH-001', name: 'Main Warehouse', location: 'Quezon City', capacity: 10000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WH-002', name: 'Production Warehouse', location: 'Laguna', capacity: 8000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WH-003', name: 'Finished Goods Warehouse', location: 'Cavite', capacity: 6000, status: 'Active', createdAt: now, updatedAt: now },
  ],
  purchaseReceipts: [
    { id: 'PR-001', supplierId: 'SUP-001', receiptDate: '2026-02-02', status: 'Received', createdAt: now, updatedAt: now },
    { id: 'PR-002', supplierId: 'SUP-002', receiptDate: '2026-02-10', status: 'Received', createdAt: now, updatedAt: now },
    { id: 'PR-003', supplierId: 'SUP-004', receiptDate: '2026-02-18', status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'PR-004', supplierId: 'SUP-005', receiptDate: '2026-02-20', status: 'Received', createdAt: now, updatedAt: now },
    { id: 'PR-005', supplierId: 'SUP-001', receiptDate: '2026-02-25', status: 'Pending', createdAt: now, updatedAt: now },
  ],
  deliveryNotes: [
    { id: 'DN-001', customerId: 'CUST-001', deliveryDate: '2026-02-25', status: 'Delivered', createdAt: now, updatedAt: now },
    { id: 'DN-002', customerId: 'CUST-004', deliveryDate: '2026-02-15', status: 'Delivered', createdAt: now, updatedAt: now },
    { id: 'DN-003', customerId: 'CUST-002', deliveryDate: '2026-03-01', status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'DN-004', customerId: 'CUST-006', deliveryDate: '2026-03-05', status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'DN-005', customerId: 'CUST-007', deliveryDate: '2026-02-28', status: 'Delivered', createdAt: now, updatedAt: now },
  ],
  stockBalances: [
    { id: 'SB-001', itemId: 'ITM-001', warehouseId: 'WH-001', quantityOnHand: 500, status: 'In Stock', createdAt: now, updatedAt: now },
    { id: 'SB-002', itemId: 'ITM-002', warehouseId: 'WH-001', quantityOnHand: 300, status: 'In Stock', createdAt: now, updatedAt: now },
    { id: 'SB-003', itemId: 'ITM-003', warehouseId: 'WH-002', quantityOnHand: 150, status: 'In Stock', createdAt: now, updatedAt: now },
    { id: 'SB-004', itemId: 'ITM-005', warehouseId: 'WH-001', quantityOnHand: 25, status: 'Low Stock', createdAt: now, updatedAt: now },
    { id: 'SB-005', itemId: 'ITM-007', warehouseId: 'WH-002', quantityOnHand: 10, status: 'Low Stock', createdAt: now, updatedAt: now },
    { id: 'SB-006', itemId: 'ITM-010', warehouseId: 'WH-003', quantityOnHand: 0, status: 'Out of Stock', createdAt: now, updatedAt: now },
    { id: 'SB-007', itemId: 'ITM-004', warehouseId: 'WH-002', quantityOnHand: 1000, status: 'In Stock', createdAt: now, updatedAt: now },
    { id: 'SB-008', itemId: 'ITM-008', warehouseId: 'WH-001', quantityOnHand: 200, status: 'In Stock', createdAt: now, updatedAt: now },
    { id: 'SB-009', itemId: 'ITM-012', warehouseId: 'WH-003', quantityOnHand: 80, status: 'In Stock', createdAt: now, updatedAt: now },
    { id: 'SB-010', itemId: 'ITM-016', warehouseId: 'WH-002', quantityOnHand: 5, status: 'Low Stock', createdAt: now, updatedAt: now },
  ],
  stockTransactions: [
    { id: 'STK-001', itemId: 'ITM-001', warehouseId: 'WH-001', type: 'In', quantity: 100, referenceType: 'Purchase', referenceId: 'PO-001', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'STK-002', itemId: 'ITM-001', warehouseId: 'WH-001', type: 'Out', quantity: 10, referenceType: 'Sale', referenceId: 'SO-001', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'STK-003', itemId: 'ITM-005', warehouseId: 'WH-001', type: 'In', quantity: 50, referenceType: 'Purchase', referenceId: 'PO-002', status: 'Pending', createdAt: now, updatedAt: now },
  ],

  // ========== SERVICE ==========
  maintenanceServices: [
    { id: 'MS-001', salesOrderId: 'SO-001', serviceType: 'Preventive', requestDate: '2026-02-20', status: 'Open', createdAt: now, updatedAt: now },
    { id: 'MS-002', salesOrderId: 'SO-003', serviceType: 'Corrective', requestDate: '2026-02-15', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'MS-003', salesOrderId: 'SO-004', serviceType: 'Preventive', requestDate: '2026-02-28', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'MS-004', salesOrderId: 'SO-002', serviceType: 'Installation', requestDate: '2026-03-01', status: 'Open', createdAt: now, updatedAt: now },
  ],
  maintenanceVisits: [
    { id: 'MV-001', serviceId: 'MS-001', technicianId: 'EMP-001', visitDate: '2026-02-22', remarks: 'Initial inspection completed', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'MV-002', serviceId: 'MS-002', technicianId: 'EMP-005', visitDate: '2026-02-18', remarks: 'Parts replacement needed', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'MV-003', serviceId: 'MS-002', technicianId: 'EMP-001', visitDate: '2026-02-25', remarks: 'Follow-up visit scheduled', status: 'Scheduled', createdAt: now, updatedAt: now },
    { id: 'MV-004', serviceId: 'MS-004', technicianId: 'EMP-005', visitDate: '2026-03-03', remarks: 'Site survey', status: 'Scheduled', createdAt: now, updatedAt: now },
  ],
  warrantyClaims: [
    { id: 'WC-001', salesOrderId: 'SO-001', claimDate: '2026-02-25', issue: 'Defective bolt in assembly', status: 'Open', createdAt: now, updatedAt: now },
    { id: 'WC-002', salesOrderId: 'SO-003', claimDate: '2026-02-20', issue: 'Motor overheating', status: 'Under Review', createdAt: now, updatedAt: now },
    { id: 'WC-003', salesOrderId: 'SO-004', claimDate: '2026-02-28', issue: 'Wiring fault in controller', status: 'Approved', createdAt: now, updatedAt: now },
  ],
  supportTickets: [
    { id: 'TKT-001', salesOrderId: 'SO-001', ticketDate: '2026-02-22', ticketType: 'Technical', status: 'Open', createdAt: now, updatedAt: now },
    { id: 'TKT-002', salesOrderId: 'SO-003', ticketDate: '2026-02-18', ticketType: 'Billing', status: 'Resolved', createdAt: now, updatedAt: now },
    { id: 'TKT-003', salesOrderId: 'SO-002', ticketDate: '2026-02-25', ticketType: 'General Inquiry', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'TKT-004', salesOrderId: 'SO-004', ticketDate: '2026-02-27', ticketType: 'Technical', status: 'Open', createdAt: now, updatedAt: now },
  ],

  // ========== MANUFACTURING ==========
  itemMasters: [
    { id: 'IM-001', itemName: 'Steel Rod Assembly', type: 'Finished Good', supplierId: 'SUP-001', stockUom: 'pcs', cost: 150, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'IM-002', itemName: 'Circuit Board Module', type: 'Sub-Assembly', supplierId: 'SUP-003', stockUom: 'pcs', cost: 200, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'IM-003', itemName: 'Plastic Housing', type: 'Finished Good', supplierId: 'SUP-002', stockUom: 'pcs', cost: 80, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'IM-004', itemName: 'Motor Unit Complete', type: 'Finished Good', supplierId: 'SUP-004', stockUom: 'unit', cost: 500, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'IM-005', itemName: 'Gear Box Set', type: 'Sub-Assembly', supplierId: 'SUP-004', stockUom: 'unit', cost: 380, status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  operationMasters: [
    { id: 'OP-001', operationName: 'Cutting', standardTime: 30, costRatePerHour: 25, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'OP-002', operationName: 'Welding', standardTime: 45, costRatePerHour: 35, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'OP-003', operationName: 'Assembly', standardTime: 60, costRatePerHour: 30, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'OP-004', operationName: 'Quality Check', standardTime: 20, costRatePerHour: 20, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'OP-005', operationName: 'Painting', standardTime: 40, costRatePerHour: 22, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'OP-006', operationName: 'Packaging', standardTime: 15, costRatePerHour: 15, status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  workstationMasters: [
    { id: 'WS-001', workstationName: 'CNC Machine Bay 1', location: 'Building A', capacityPerDay: 50, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WS-002', workstationName: 'Welding Station 1', location: 'Building A', capacityPerDay: 30, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WS-003', workstationName: 'Assembly Line 1', location: 'Building B', capacityPerDay: 100, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WS-004', workstationName: 'Paint Booth', location: 'Building C', capacityPerDay: 40, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'WS-005', workstationName: 'QC Station', location: 'Building B', capacityPerDay: 80, status: 'Active', createdAt: now, updatedAt: now },
  ],
  billOfMaterials: [
    { id: 'BOM-001', finishedItemId: 'IM-001', version: 'v1.0', createdDate: '2026-01-15', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'BOM-002', finishedItemId: 'IM-002', version: 'v2.1', createdDate: '2026-01-20', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'BOM-003', finishedItemId: 'IM-004', version: 'v1.0', createdDate: '2026-02-01', status: 'Draft', createdAt: now, updatedAt: now },
    { id: 'BOM-004', finishedItemId: 'IM-003', version: 'v1.2', createdDate: '2026-02-10', status: 'Active', createdAt: now, updatedAt: now },
  ],
  productionPlans: [
    { id: 'PP-001', planDate: '2026-02-01', plannedStart: '2026-02-05', plannedEnd: '2026-03-05', createdBy: 'EMP-005', remarks: 'Q1 production run', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'PP-002', planDate: '2026-02-15', plannedStart: '2026-03-01', plannedEnd: '2026-04-01', createdBy: 'EMP-005', remarks: 'New product line', status: 'Draft', createdAt: now, updatedAt: now },
    { id: 'PP-003', planDate: '2026-02-20', plannedStart: '2026-03-10', plannedEnd: '2026-03-30', createdBy: 'EMP-001', remarks: 'Urgent order fulfillment', status: 'Confirmed', createdAt: now, updatedAt: now },
  ],
  workOrders: [
    { id: 'WO-001', itemId: 'ITM-001', quantity: 500, startDate: '2026-02-01', endDate: '2026-03-01', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'WO-002', itemId: 'ITM-003', quantity: 200, startDate: '2026-02-15', endDate: '2026-03-15', status: 'Planned', createdAt: now, updatedAt: now },
    { id: 'WO-003', itemId: 'ITM-007', quantity: 30, startDate: '2026-02-20', endDate: '2026-03-20', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'WO-004', itemId: 'ITM-005', quantity: 100, startDate: '2026-03-01', endDate: '2026-03-31', status: 'Planned', createdAt: now, updatedAt: now },
  ],
  jobCards: [
    { id: 'JC-001', workOrderId: 'WO-001', assignedTo: 'EMP-005', startTime: '2026-02-01 08:00', endTime: '2026-02-01 16:00', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'JC-002', workOrderId: 'WO-001', assignedTo: 'EMP-001', startTime: '2026-02-02 08:00', endTime: '2026-02-02 16:00', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'JC-003', workOrderId: 'WO-003', assignedTo: 'EMP-005', startTime: '2026-02-20 08:00', endTime: '2026-02-20 17:00', status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'JC-004', workOrderId: 'WO-002', assignedTo: 'EMP-001', startTime: '2026-02-15 08:00', endTime: '', status: 'Pending', createdAt: now, updatedAt: now },
  ],
  stockExchanges: [
    { id: 'SE-001', workOrderId: 'WO-001', exchangeDate: '2026-02-01', fromLocation: 'WH-001', toLocation: 'WH-002', remarks: 'Raw materials for production', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'SE-002', workOrderId: 'WO-003', exchangeDate: '2026-02-20', fromLocation: 'WH-002', toLocation: 'WH-003', remarks: 'Finished goods transfer', status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'SE-003', workOrderId: 'WO-001', exchangeDate: '2026-02-15', fromLocation: 'WH-002', toLocation: 'WH-003', remarks: 'Batch completion', status: 'Completed', createdAt: now, updatedAt: now },
  ],
  stockTransfers: [
    { id: 'ST-001', transferType: 'Internal', refId: 'WO-001', transferDate: '2026-02-01', fromWarehouse: 'WH-001', toWarehouse: 'WH-002', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'ST-002', transferType: 'External', refId: 'PO-001', transferDate: '2026-02-02', fromWarehouse: 'WH-001', toWarehouse: 'WH-003', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'ST-003', transferType: 'Internal', refId: 'WO-003', transferDate: '2026-02-20', fromWarehouse: 'WH-002', toWarehouse: 'WH-001', status: 'Pending', createdAt: now, updatedAt: now },
  ],

  // ========== HR ==========
  employees: [
    { id: 'EMP-001', name: 'John Smith', email: 'john@company.com', department: 'Engineering', position: 'Senior Engineer', contactNo: '+1-555-1001', hireDate: '2024-01-15', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-002', name: 'Sarah Johnson', email: 'sarah@company.com', department: 'Sales', position: 'Sales Manager', contactNo: '+1-555-1002', hireDate: '2023-06-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-003', name: 'Mike Davis', email: 'mike@company.com', department: 'HR', position: 'HR Director', contactNo: '+1-555-1003', hireDate: '2022-03-10', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-004', name: 'Emily Chen', email: 'emily@company.com', department: 'Engineering', position: 'Project Manager', contactNo: '+1-555-1004', hireDate: '2024-08-20', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-005', name: 'Robert Wilson', email: 'robert@company.com', department: 'Manufacturing', position: 'Floor Supervisor', contactNo: '+1-555-1005', hireDate: '2023-11-05', status: 'On Leave', createdAt: now, updatedAt: now },
    { id: 'EMP-006', name: 'Jessica Lee', email: 'jessica@company.com', department: 'Finance', position: 'Accountant', contactNo: '+1-555-1006', hireDate: '2024-02-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-007', name: 'David Park', email: 'david@company.com', department: 'Engineering', position: 'Junior Engineer', contactNo: '+1-555-1007', hireDate: '2025-01-10', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'EMP-008', name: 'Amanda Torres', email: 'amanda@company.com', department: 'Sales', position: 'Account Executive', contactNo: '+1-555-1008', hireDate: '2024-05-15', status: 'Active', createdAt: now, updatedAt: now },
  ],
  payrollComponents: [
    { id: 'PC-001', componentName: 'Basic Salary', componentType: 'Earning', defaultAmount: 30000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PC-002', componentName: 'Housing Allowance', componentType: 'Earning', defaultAmount: 5000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PC-003', componentName: 'Transport Allowance', componentType: 'Earning', defaultAmount: 3000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PC-004', componentName: 'Tax Deduction', componentType: 'Deduction', defaultAmount: 5000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PC-005', componentName: 'SSS Contribution', componentType: 'Deduction', defaultAmount: 1200, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PC-006', componentName: 'PhilHealth', componentType: 'Deduction', defaultAmount: 800, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PC-007', componentName: 'Overtime Pay', componentType: 'Earning', defaultAmount: 0, status: 'Active', createdAt: now, updatedAt: now },
  ],
  salaryStructures: [
    { id: 'SS-001', employeeId: 'EMP-001', totalCTC: 480000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SS-002', employeeId: 'EMP-002', totalCTC: 420000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SS-003', employeeId: 'EMP-003', totalCTC: 540000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SS-004', employeeId: 'EMP-004', totalCTC: 450000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SS-005', employeeId: 'EMP-005', totalCTC: 360000, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'SS-006', employeeId: 'EMP-006', totalCTC: 400000, status: 'Active', createdAt: now, updatedAt: now },
  ],
  payrollEntries: [
    { id: 'PRL-001', journalEntryId: 'JE-001', payrollDate: '2026-01-31', netAmount: 35000, status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'PRL-002', journalEntryId: 'JE-002', payrollDate: '2026-02-28', netAmount: 35000, status: 'Processed', createdAt: now, updatedAt: now },
    { id: 'PRL-003', journalEntryId: 'JE-003', payrollDate: '2026-01-31', netAmount: 30000, status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'PRL-004', journalEntryId: '', payrollDate: '2026-02-28', netAmount: 32000, status: 'Draft', createdAt: now, updatedAt: now },
  ],
  expenseClaims: [
    { id: 'EC-001', employeeId: 'EMP-002', claimType: 'Travel', amount: 5000, status: 'Approved', createdAt: now, updatedAt: now },
    { id: 'EC-002', employeeId: 'EMP-001', claimType: 'Equipment', amount: 12000, status: 'Pending', createdAt: now, updatedAt: now },
    { id: 'EC-003', employeeId: 'EMP-004', claimType: 'Training', amount: 8000, status: 'Approved', createdAt: now, updatedAt: now },
    { id: 'EC-004', employeeId: 'EMP-003', claimType: 'Office Supplies', amount: 2500, status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'EC-005', employeeId: 'EMP-006', claimType: 'Travel', amount: 3500, status: 'Rejected', createdAt: now, updatedAt: now },
  ],

  // ========== PROJECT ==========
  projects: [
    { id: 'PRJ-001', name: 'ERP Implementation', description: 'Internal ERP rollout', startDate: '2026-01-01', endDate: '2026-06-30', managerId: 'EMP-004', estCost: 500000, status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'PRJ-002', name: 'Website Redesign', description: 'Corporate website overhaul', startDate: '2026-02-01', endDate: '2026-04-30', managerId: 'EMP-001', estCost: 150000, status: 'Planning', createdAt: now, updatedAt: now },
    { id: 'PRJ-003', name: 'Factory Automation', description: 'Automate production line', startDate: '2026-03-01', endDate: '2026-09-30', managerId: 'EMP-005', estCost: 800000, status: 'Planning', createdAt: now, updatedAt: now },
  ],
  tasks: [
    { id: 'TSK-001', taskName: 'Database Schema Design', projectId: 'PRJ-001', typeId: 'TT-001', userId: 'PU-001', startDate: '2026-01-15', endDate: '2026-02-28', estHours: 80, status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'TSK-002', taskName: 'UI Wireframes', projectId: 'PRJ-001', typeId: 'TT-002', userId: 'PU-002', startDate: '2026-02-01', endDate: '2026-03-15', estHours: 60, status: 'To Do', createdAt: now, updatedAt: now },
    { id: 'TSK-003', taskName: 'Homepage Layout', projectId: 'PRJ-002', typeId: 'TT-002', userId: 'PU-001', startDate: '2026-02-15', endDate: '2026-03-01', estHours: 40, status: 'To Do', createdAt: now, updatedAt: now },
    { id: 'TSK-004', taskName: 'API Development', projectId: 'PRJ-001', typeId: 'TT-001', userId: 'PU-003', startDate: '2026-02-01', endDate: '2026-04-30', estHours: 120, status: 'In Progress', createdAt: now, updatedAt: now },
    { id: 'TSK-005', taskName: 'PLC Programming', projectId: 'PRJ-003', typeId: 'TT-003', userId: 'PU-004', startDate: '2026-03-01', endDate: '2026-05-31', estHours: 200, status: 'To Do', createdAt: now, updatedAt: now },
  ],
  timesheets: [
    { id: 'TS-001', taskId: 'TSK-001', userId: 'PU-001', logDate: '2026-02-20', hours: 8, remarks: 'Schema design for CRM module', status: 'Approved', createdAt: now, updatedAt: now },
    { id: 'TS-002', taskId: 'TSK-001', userId: 'PU-001', logDate: '2026-02-21', hours: 7, remarks: 'Schema design for Sales module', status: 'Approved', createdAt: now, updatedAt: now },
    { id: 'TS-003', taskId: 'TSK-004', userId: 'PU-003', logDate: '2026-02-20', hours: 8, remarks: 'REST API endpoints', status: 'Submitted', createdAt: now, updatedAt: now },
    { id: 'TS-004', taskId: 'TSK-002', userId: 'PU-002', logDate: '2026-02-22', hours: 6, remarks: 'Initial mockups', status: 'Draft', createdAt: now, updatedAt: now },
  ],
  projectUsers: [
    { id: 'PU-001', employeeId: 'EMP-001', employeeName: 'John Smith', role: 'Developer', specialization: 'Backend', email: 'john@company.com', contactNo: '+1-555-1001', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PU-002', employeeId: 'EMP-004', employeeName: 'Emily Chen', role: 'Designer', specialization: 'UI/UX', email: 'emily@company.com', contactNo: '+1-555-1004', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PU-003', employeeId: 'EMP-007', employeeName: 'David Park', role: 'Developer', specialization: 'Frontend', email: 'david@company.com', contactNo: '+1-555-1007', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PU-004', employeeId: 'EMP-005', employeeName: 'Robert Wilson', role: 'Engineer', specialization: 'Automation', email: 'robert@company.com', contactNo: '+1-555-1005', status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  taskTypes: [
    { id: 'TT-001', taskTypeName: 'Development', description: 'Software development tasks', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'TT-002', taskTypeName: 'Design', description: 'UI/UX and graphic design tasks', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'TT-003', taskTypeName: 'Engineering', description: 'Hardware/mechanical engineering', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'TT-004', taskTypeName: 'Testing', description: 'QA and testing tasks', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'TT-005', taskTypeName: 'Documentation', description: 'Technical writing and docs', status: 'Active', createdAt: now, updatedAt: now },
  ],
  activityCosts: [
    { id: 'AC-001', taskTypeId: 'TT-001', rate: 1500, costType: 'Hourly', effectiveDate: '2026-01-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'AC-002', taskTypeId: 'TT-002', rate: 1200, costType: 'Hourly', effectiveDate: '2026-01-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'AC-003', taskTypeId: 'TT-003', rate: 1800, costType: 'Hourly', effectiveDate: '2026-01-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'AC-004', taskTypeId: 'TT-004', rate: 1000, costType: 'Hourly', effectiveDate: '2026-01-01', status: 'Active', createdAt: now, updatedAt: now },
    { id: 'AC-005', taskTypeId: 'TT-005', rate: 800, costType: 'Hourly', effectiveDate: '2026-01-01', status: 'Active', createdAt: now, updatedAt: now },
  ],

  // ========== ACCOUNTS / FINANCE ==========
  salesInvoices: [
    { id: 'SI-001', salesOrderId: 'SO-001', customerId: 'CUST-001', lastPayment: '2026-02-25', totalCollected: 2500, status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'SI-002', salesOrderId: 'SO-003', customerId: 'CUST-004', lastPayment: '2026-02-20', totalCollected: 7500, status: 'Paid', createdAt: now, updatedAt: now },
    { id: 'SI-003', salesOrderId: 'SO-004', customerId: 'CUST-006', lastPayment: '', totalCollected: 0, status: 'Unpaid', createdAt: now, updatedAt: now },
    { id: 'SI-004', salesOrderId: 'SO-002', customerId: 'CUST-002', lastPayment: '2026-02-28', totalCollected: 4500, status: 'Partially Paid', createdAt: now, updatedAt: now },
  ],
  payments: [
    { id: 'PAY-001', invoiceId: 'SI-001', customerId: 'CUST-001', paymentDate: '2026-02-25', method: 'Bank Transfer', amount: 2500, reference: 'BT-20260225-001', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'PAY-002', invoiceId: 'SI-002', customerId: 'CUST-004', paymentDate: '2026-02-20', method: 'Check', amount: 7500, reference: 'CHK-4521', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'PAY-003', invoiceId: 'SI-004', customerId: 'CUST-002', paymentDate: '2026-02-28', method: 'Credit Card', amount: 4500, reference: 'CC-8876', status: 'Completed', createdAt: now, updatedAt: now },
    { id: 'PAY-004', invoiceId: 'SI-003', customerId: 'CUST-006', paymentDate: '', method: '', amount: 0, reference: '', status: 'Pending', createdAt: now, updatedAt: now },
  ],
  journalEntries: [
    { id: 'JE-001', entryType: 'Payroll', entryDate: '2026-01-31', totalDebit: 200000, totalCredit: 200000, status: 'Posted', createdAt: now, updatedAt: now },
    { id: 'JE-002', entryType: 'Payroll', entryDate: '2026-02-28', totalDebit: 210000, totalCredit: 210000, status: 'Draft', createdAt: now, updatedAt: now },
    { id: 'JE-003', entryType: 'Sales', entryDate: '2026-02-25', totalDebit: 2500, totalCredit: 2500, status: 'Posted', createdAt: now, updatedAt: now },
    { id: 'JE-004', entryType: 'Purchase', entryDate: '2026-02-15', totalDebit: 8000, totalCredit: 8000, status: 'Posted', createdAt: now, updatedAt: now },
    { id: 'JE-005', entryType: 'Adjustment', entryDate: '2026-02-20', totalDebit: 1500, totalCredit: 1500, status: 'Cancelled', createdAt: now, updatedAt: now },
  ],
  paymentTerms: [
    { id: 'PT-001', termName: 'Net 30', daysDue: 30, discountPercent: 0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PT-002', termName: 'Net 60', daysDue: 60, discountPercent: 0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PT-003', termName: '2/10 Net 30', daysDue: 30, discountPercent: 2, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PT-004', termName: 'Due on Receipt', daysDue: 0, discountPercent: 0, status: 'Active', createdAt: now, updatedAt: now },
    { id: 'PT-005', termName: 'Net 90', daysDue: 90, discountPercent: 0, status: 'Inactive', createdAt: now, updatedAt: now },
  ],
  landedCosts: [
    { id: 'LC-001', purchaseReceiptId: 'PR-001', chargesType: 'Freight', totalCharges: 2500, basis: 'Amount', status: 'Applied', createdAt: now, updatedAt: now },
    { id: 'LC-002', purchaseReceiptId: 'PR-002', chargesType: 'Customs Duty', totalCharges: 4000, basis: 'Quantity', status: 'Applied', createdAt: now, updatedAt: now },
    { id: 'LC-003', purchaseReceiptId: 'PR-004', chargesType: 'Insurance', totalCharges: 1500, basis: 'Amount', status: 'Draft', createdAt: now, updatedAt: now },
  ],
};
