

# Enterprise ERP System - Implementation Plan

## Overview
A fully functional, logic-simulated Enterprise ERP system with authentication, role-based access control, 8 interconnected modules, in-memory database simulation, and dynamic dashboards. All data persists during session and updates across views in real-time.

---

## Phase 1: Core Infrastructure

### Authentication & Login
- Login page with email, password, and role selector (Admin / CRM / Selling / Buying / Project / Service / Distribution / HR / Manufacturing)
- Pre-seeded demo credentials for each role
- Session stored in React context; unauthenticated users always redirected to login
- Logout functionality from sidebar

### Role-Based Access Control (RBAC)
- **Admin**: Full access to all 8 modules and the admin dashboard
- **Functional Users**: Access only their assigned module dashboard, forms, tables, and reports
- Routes protected both visually (hidden nav items) and logically (redirect on direct URL access)

### In-Memory Data Store
- Centralized global store (React Context) acting as a simulated relational database
- Pre-seeded with realistic sample data across all modules
- ID-based foreign key references between tables
- All CRUD operations go through API-like helper functions that enforce validation, unique constraints, and referential integrity

---

## Phase 2: Layout & Navigation

### App Shell
- Dark sidebar with module icons and labels (collapsible)
- Top header bar with user info, role badge, and logout
- Main content area for dynamic page rendering
- Sidebar items dynamically filtered based on user role

### Routing Structure
- `/login` — Login page
- `/dashboard` — Admin overview dashboard
- `/crm`, `/selling`, `/buying`, `/project`, `/service`, `/distribution`, `/hr`, `/manufacturing` — Each with sub-routes for dashboard, forms, tables, and reports

---

## Phase 3: The 8 Functional Modules

Each module follows an identical structure with module-specific fields and relationships:

### 1. CRM
- **Data**: Customers (name, email, phone, company, status)
- **Referenced by**: Selling (Sales Orders), Service (Service Requests)

### 2. Selling
- **Data**: Sales Orders (customer dropdown from CRM, items, quantity, total, status, date)
- **References**: CRM Customers, Distribution Items

### 3. Buying
- **Data**: Suppliers, Purchase Orders (supplier dropdown, items, quantity, cost, status, date)
- **Referenced by**: Distribution (Stock Transactions)

### 4. Distribution / Stock
- **Data**: Items (name, SKU, category), Warehouses, Stock Transactions
- **References**: Buying (Purchase Orders), Selling (Sales Orders)

### 5. Human Resources
- **Data**: Employees (name, department, position, email, hire date, status)
- **Referenced by**: Project (Task assignments)

### 6. Project
- **Data**: Projects (name, status, start/end date), Tasks (project dropdown, assigned employee dropdown, status)
- **References**: HR Employees

### 7. Service
- **Data**: Service Requests (customer dropdown from CRM, type, priority, status, assigned employee)
- **References**: CRM Customers

### 8. Manufacturing
- **Data**: Work Orders (item dropdown from Distribution, quantity, status, start/end date)
- **References**: Distribution Items

---

## Phase 4: Per-Module Features (Applied to All 8 Modules)

### Module Dashboard
- Summary cards: Total records, Pending, In Progress, Completed
- Counts update automatically when data changes
- Quick-action buttons to create new records or view tables

### Data Entry Forms
- Dialog/page-based forms with all required fields
- Auto-generated unique IDs and timestamps
- Dropdowns dynamically populated from related tables (e.g., customer selector pulls from CRM store)
- Required field validation with error messages
- Success/error toast notifications

### Data Tables
- Sortable columns with all record fields
- Search bar (filters across key fields)
- Status and date filters
- Action buttons per row: View (detail dialog), Edit (pre-filled form), Delete (with dependency check)
- Pagination controls

### Reports
- Live summary cards (totals, status breakdown)
- Filterable by date range and status
- Bar/pie charts using Recharts, driven by live store data
- Automatically refreshes after any CRUD operation

---

## Phase 5: Admin Dashboard

- Overview cards for all 8 modules showing total records, pending, and completed counts
- Cards are clickable, navigating to the respective module
- All counts derived from live store data — update instantly on any change
- Recent activity feed showing latest actions across all modules

---

## Phase 6: Data Integrity & Validation

- **Unique ID enforcement**: No duplicate IDs allowed
- **Foreign key simulation**: Dropdowns only show valid referenced records
- **Deletion protection**: Cannot delete a customer referenced by a sales order; shows error toast explaining the dependency
- **Status transitions**: Logical flow (e.g., Draft → In Progress → Completed)
- **Timestamp tracking**: Created and updated timestamps on all records

---

## Design Style
- Dark sidebar with light main content area
- Clean, professional enterprise aesthetic using shadcn/ui components
- Consistent card-based layouts across all dashboards
- Color-coded status badges (green for completed, yellow for pending, blue for in progress)

