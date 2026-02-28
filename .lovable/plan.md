

# Full ERP System Redesign — All Modules as Sub-Applications

## Overview
Rewrite ALL 9 modules (Distribution + CRM + Selling + Buying + Service + Manufacturing + HR + Project + new Accounts/Finance) as full sub-applications following the Distribution pattern: each with an internal sidebar, dark navy header, dedicated sub-pages, and colored badge action buttons. Massively expand types, seed data, and store.

---

## Phase 1: Foundation — Shared Sub-Application Component

Create a reusable `SubApplicationLayout` component (`src/components/erp/SubApplicationLayout.tsx`) that every module will use:
- Dark navy header bar with module title, user avatar circle, username, Logout button
- Light-background internal sidebar with icon + label nav items, blue highlight on active
- Main content panel on the right
- Accepts: module title, sidebar items (label, icon, key), active key, children

Create a reusable `DataTable` component (`src/components/erp/DataTable.tsx`):
- Uppercase column headers
- Alternating row colors
- Search bar
- Optional "+ Add" button
- Colored badge action buttons (View=teal, Edit=blue, Delete=red, Adjust=blue)
- Pagination placeholder

---

## Phase 2: Types Expansion (`src/types/erp.ts`)

Add all new types organized by module:

**CRM**: `Customer` (expanded with contactPerson, industry, address), `Lead`, `Opportunity`, `Product`, `MaterialRequest`, `ProductBundle`

**Selling**: `SalesOrder` (expanded with product, qty, address, unitPrice), `Invoice`, `Delivery`

**Buying**: `Supplier` (expanded with contactPerson, contactDetails, address), `MaterialRequest` (shared with CRM)

**Distribution**: `Item` (unit, cost instead of price/category), `Warehouse`, `PurchaseReceipt`, `DeliveryNote`, `StockBalance`

**Service**: `MaintenanceService`, `MaintenanceVisit`, `WarrantyClaim`, `SupportTicket`

**Manufacturing**: `ItemMaster`, `OperationMaster`, `WorkstationMaster`, `BillOfMaterials`, `ProductionPlan`, `WorkOrder` (expanded), `JobCard`, `StockExchange`, `StockTransfer`

**HR**: `Employee` (expanded with contactNo), `PayrollComponent`, `SalaryStructure`, `PayrollEntry`, `ExpenseClaim`

**Project**: `Project` (expanded with managerId, estCost), `Task` (expanded with typeId, estHours), `Timesheet`, `ProjectUser`, `TaskType`, `ActivityCost`

**Accounts/Finance** (NEW module): `SalesInvoice`, `Payment`, `JournalEntry`, `PaymentTerm`, `LandedCost`

Update `ERPData` interface and `ERPCollection` type to include all new collections.

---

## Phase 3: Auth & Routing Updates

**Auth** (`src/store/auth-store.tsx`):
- Add `accounts` role with demo credentials

**App.tsx**:
- Add `/accounts` route with ProtectedRoute for `accounts` role
- Import new `AccountsPage`

**AppSidebar** (`src/components/erp/AppSidebar.tsx`):
- Add Accounts/Finance module entry with appropriate icon

---

## Phase 4: Seed Data (`src/store/seed-data.ts`)

Populate all new collections with 30-50 realistic records each:
- Items: ~49 records with ITM-xxx IDs, unit, cost fields
- Warehouses: 3 regional warehouses
- Purchase Receipts, Delivery Notes, Stock Balances: ~30-50 each
- Leads, Opportunities, Products, Bundles, Material Requests: ~20-30 each
- Invoices, Deliveries, Payments, Journal Entries: ~20-30 each
- Maintenance Services, Visits, Warranty Claims, Tickets: ~15-20 each
- Operation Masters, Workstations, BOMs, Production Plans, Job Cards, Stock Exchanges, Stock Transfers: ~10-20 each
- Payroll Components, Salary Structures, Payroll Entries, Expense Claims: ~10-20 each
- Timesheets, Project Users, Task Types, Activity Costs: ~10-20 each
- Payment Terms, Landed Costs: ~5-10 each

All with proper cross-references using existing IDs.

---

## Phase 5: Store Updates (`src/store/erp-store.tsx`)

- Add all new collections to the store state
- Add dependency mappings for referential integrity (e.g., Lead references Customer, Opportunity references Lead, Invoice references SalesOrder, Payment references Invoice, etc.)
- Support all new CRUD operations

---

## Phase 6: Module Implementations

Each module follows the same pattern — a single page component with internal state-driven navigation (no sub-routes).

### Distribution Module (`src/pages/modules/DistributionPage.tsx`)
Sidebar: Overview | Items | Warehouses | Stock Balance | Purchase Receipts | Delivery Notes
- Overview: 4 summary cards + Quick Actions
- Each sub-page: search bar, add button, data table with colored badge actions

### CRM Module (`src/pages/modules/CRMPage.tsx`)
Sidebar: Overview | Customers | Leads | Opportunities | Products | Material Requests | Product Bundles
- Customers table: Customer ID, Name, Contact Person, Email, Phone, Industry, Address, Status
- Leads table: Lead ID, Customer ID, Source, Lead Date, Bundle ID, Assigned To, Follow-Up, Status
- Opportunities table: Opp ID, Lead ID, Customer ID, Assigned To, Est. Value, Probability, Stage, Status
- Products table: Prod ID, Product Name, Qty, Unit Price
- Material Requests table: MR ID, Bundle ID, Requested By, Request Date, Status
- Product Bundles table: Bundle ID, Bundle Name, Items Included, Total Cost, Status

### Selling Module (`src/pages/modules/SellingPage.tsx`)
Sidebar: Overview | Customers | Products | Sales Orders | Invoices | Deliveries
- Customers: Code, Customer Name, Industry, Phone, Email, Address, Status
- Products: QI ID, QUO ID, Prod ID, Product Name, Supplier, Qty, Unit Price, Total
- Sales Orders: Order ID, Customer, Product, Qty, Date, Address, Unit Price, Total, Status
- Invoices: Invoice ID, Sales Order, Customer, Amount, Date, Status
- Deliveries: Delivery ID, Customer/Product, Warehouse, Date, Status

### Buying Module (`src/pages/modules/BuyingPage.tsx`)
Sidebar: Overview | Suppliers | Material Requests
- Suppliers: ID, Supplier Name, Contact Person, Contact Details, Address, Status
- Material Requests: MR ID, Bundle ID, Requested By, Request Date, Status

### Service Module (`src/pages/modules/ServicePage.tsx`)
Sidebar: Overview | Maintenance Service | Maintenance Visits | Warranty Claims | Tickets
- Maintenance Service: Service ID, Sales Order ID, Service Type, Request Date, Status
- Maintenance Visits: Visit ID, Service ID, Technician ID, Visit Date, Remarks
- Warranty Claims: Claim ID, Sales Order ID, Claim Date, Issue, Status
- Support Tickets: Issue ID, Sales Order ID, Date, Type, Status

### Manufacturing Module (`src/pages/modules/ManufacturingPage.tsx`)
Sidebar: Overview | Item Master | Operation Master | Workstation Master | BOM | Production Planning | Work Orders | Job Cards | Stock Exchange | Stock Transfer
- All 9 sub-pages with their respective columns as specified

### HR Module (`src/pages/modules/HRPage.tsx`)
Sidebar: Overview | Employee Registration | Payroll Components | Salary Structures | Payroll Entry | Expense Claims
- All 5 sub-pages with their respective columns as specified

### Project Module (`src/pages/modules/ProjectPage.tsx`)
Sidebar: Overview | Project List | Tasks | Timesheets | Project Users | Task Types | Activity Costs
- All 6 sub-pages with their respective columns as specified

### Accounts & Finance Module (`src/pages/modules/AccountsPage.tsx`) — NEW
Sidebar: Overview | Sales Invoices | Payments | Journal Entries | Payment Terms | Landed Cost
- Sales Invoices: Sales Order, Invoice ID(s), Customer, Last Payment, Total Collected, Status + Total Portfolio Collection display
- Payments: Payment ID, Inv ID, Customer, Date, Method, Amount, Reference, Status
- Journal Entries: ID, Entry Type, Date, Total Debit, Total Credit, Status
- Payment Terms: Term ID, Term Name, Days Due, Discount %, Status
- Landed Cost: Voucher ID, Purchase Receipt, Charges Type, Total Charges, Basis, Status

---

## Phase 7: Admin Dashboard Update

Update `AdminDashboard.tsx` to include the new Accounts/Finance module card and reference all new collections for accurate counts.

---

## Files Changed
1. `src/types/erp.ts` — Massive expansion with ~30 new types
2. `src/store/seed-data.ts` — Extensive seed data for all collections
3. `src/store/erp-store.tsx` — New collections + dependency mappings
4. `src/store/auth-store.tsx` — Add accounts role
5. `src/components/erp/SubApplicationLayout.tsx` — NEW shared layout
6. `src/components/erp/DataTable.tsx` — NEW shared table component
7. `src/pages/modules/DistributionPage.tsx` — Full rewrite
8. `src/pages/modules/CRMPage.tsx` — Full rewrite
9. `src/pages/modules/SellingPage.tsx` — Full rewrite
10. `src/pages/modules/BuyingPage.tsx` — Full rewrite
11. `src/pages/modules/ServicePage.tsx` — Full rewrite
12. `src/pages/modules/ManufacturingPage.tsx` — Full rewrite
13. `src/pages/modules/HRPage.tsx` — Full rewrite
14. `src/pages/modules/ProjectPage.tsx` — Full rewrite
15. `src/pages/modules/AccountsPage.tsx` — NEW
16. `src/pages/AdminDashboard.tsx` — Updated
17. `src/components/erp/AppSidebar.tsx` — Add Accounts nav
18. `src/App.tsx` — Add accounts route

