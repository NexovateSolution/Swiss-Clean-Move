# SwissCleanMove Admin Dashboard

A comprehensive admin dashboard for managing cleaning projects, clients, payments, and invoices.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use).

## 🔐 Admin Access

### Login Credentials
- **URL**: `http://localhost:3001/admin/login`
- **Email**: `admin@swisscleanmove.ch`
- **Password**: `admin123`

### Admin Dashboard
- **URL**: `http://localhost:3001/admin`

## 📊 Dashboard Features

### 1. **Dashboard Overview**
- Total clients statistics
- Revenue tracking
- Payment status overview
- Quick action buttons

### 2. **Client Management**
- ✅ **Edit**: Update client information and project details
- ✅ **Pay**: Add payments and track balances
- ✅ **Delete**: Remove clients with confirmation
- ✅ **Invoice**: Generate professional PDF invoices
- ✅ **Photos**: Upload and manage project photos

### 3. **Advanced Features**
- **Search & Filter**: Find clients quickly
- **Pagination**: Handle large client lists
- **Real-time Updates**: All changes reflect immediately
- **Responsive Design**: Works on desktop and mobile

## 🎯 Modal Functions

### Edit Modal
- Complete client information form
- Project details (dates, service type, building type)
- Payment tracking with auto-calculated balance
- Form validation and error handling

### Payment Modal
- Add payments with multiple methods (Cash, Bank Transfer, Credit Card, PayPal)
- Real-time balance calculation
- Payment summary preview
- Automatic status updates

### Delete Modal
- Confirmation dialog with client details
- Warning for outstanding balances
- Safe deletion with cascade

### Photo Modal
- Drag & drop photo upload
- Multiple file selection
- Image preview grid
- Delete photos functionality

### Invoice Modal
- Professional invoice creation
- Auto-generates PDF for download/print
- Swiss tax calculation (7.7% VAT)
- Professional invoice template

## 🗄️ Database Schema

### Models
- **User**: Admin authentication
- **Client**: Customer information and project details
- **Payment**: Payment tracking and history
- **Photo**: Project photo management
- **Invoice**: Invoice generation and tracking

### Status Types
- **Project Status**: UNPAID, PARTIAL, PAID, COMPLETED, CANCELLED
- **Payment Methods**: CASH, BANK_TRANSFER, CREDIT_CARD, PAYPAL
- **Invoice Status**: PENDING, SENT, PAID, OVERDUE, CANCELLED

## 🎨 UI/UX Features

- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Beautiful, consistent styling
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Visual feedback for async operations
- **Responsive Design**: Mobile-first approach
- **Professional Color Scheme**: Swiss-inspired design

## 📱 Mobile Support

The admin dashboard is fully responsive and works perfectly on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Middleware protection for admin areas
- **HTTP-Only Cookies**: Secure token storage
- **Password Hashing**: bcrypt password protection
- **Input Validation**: Form validation and sanitization

## 📁 File Structure

```
src/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   │   ├── page.tsx          # Main dashboard
│   │   └── login/page.tsx    # Login page
│   └── api/admin/            # Admin API routes
│       ├── clients/          # Client management
│       ├── payments/         # Payment processing
│       ├── photos/           # Photo upload
│       └── invoices/         # Invoice generation
├── components/admin/         # Admin UI components
│   ├── AdminLayout.tsx       # Main layout
│   ├── ClientModal.tsx       # Edit client modal
│   ├── PaymentModal.tsx      # Payment modal
│   ├── DeleteModal.tsx       # Delete confirmation
│   ├── PhotoModal.tsx        # Photo upload
│   └── InvoiceModal.tsx      # Invoice generation
├── lib/
│   ├── db.ts                 # Database connection
│   └── auth.ts               # Authentication utilities
└── prisma/
    ├── schema.prisma         # Database schema
    └── seed.ts               # Sample data
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Clients
- `GET /api/admin/clients` - List clients with pagination/search
- `POST /api/admin/clients` - Create new client
- `GET /api/admin/clients/[id]` - Get client details
- `PUT /api/admin/clients/[id]` - Update client
- `DELETE /api/admin/clients/[id]` - Delete client

### Payments
- `POST /api/admin/payments` - Add payment

### Photos
- `POST /api/admin/photos` - Upload photo
- `DELETE /api/admin/photos` - Delete photo

### Invoices
- `POST /api/admin/invoices` - Create invoice
- `GET /api/admin/invoices` - List invoices

## 🎯 Next Steps

The admin dashboard is fully functional and ready for use. You can:

1. **Test the system** with the provided demo credentials
2. **Add more clients** through the dashboard
3. **Process payments** and track balances
4. **Generate invoices** for clients
5. **Upload project photos** for documentation

The system is production-ready and can be deployed to any hosting platform that supports Next.js applications.
