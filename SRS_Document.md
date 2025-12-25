# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## Ultimate Success Institute - Learning Management Platform

**Version 1.0**  
**Date: December 25, 2024**

---

## 1. INTRODUCTION

### 1.1 Purpose

The purpose of this document is to formally define the Software Requirements Specification (SRS) and Technical Frontend Architecture for the Ultimate Success Institute web-based learning management and library subscription platform.

This document serves as:
- A contractual reference between stakeholders, developers, and evaluators
- A technical blueprint for frontend and backend development
- A validation artifact to ensure the implemented system satisfies all functional and non-functional requirements
- A maintenance and scalability reference for future enhancements

The intended audience includes:
- Software developers (frontend and backend)
- UI/UX designers
- Project evaluators and instructors
- System testers and maintainers
- Technical reviewers and auditors
- Institute administrators and management

### 1.2 Scope

Ultimate Success Institute is a full-stack Next.js-based educational management platform designed to digitize and streamline student learning experiences through library subscriptions, coaching class enrollments, computer class management, progress tracking, and administrative oversight.

**In Scope:**
- Role-based authentication and authorization for Students and Admins
- Library subscription management with flexible pricing (duration, shift, seat type)
- Payment gateway integration with Razorpay
- Student dashboard with progress tracking, goals, and todos
- Feedback and testimonials system
- Seat availability and occupancy management
- Admin dashboard with revenue analytics and user management
- WhatsApp reminders for subscription expiry
- Responsive web interface using modern frontend technologies
- Coaching classes and computer classes information pages
- Gallery showcase and location services

**Out of Scope:**
- Native mobile applications (Android/iOS)
- Live video streaming for online classes
- Direct video consultation features
- Integration with government educational databases
- Offline mode functionality

The system is implemented as a server-side rendered application with API routes using Next.js App Router architecture.

### 1.3 Definitions, Acronyms, and Abbreviations

| Term / Acronym | Definition |
|----------------|------------|
| SRS | Software Requirements Specification |
| SSR | Server-Side Rendering |
| Next.js | React-based web framework with SSR capabilities |
| RBAC | Role-Based Access Control |
| UI | User Interface |
| UX | User Experience |
| API | Application Programming Interface |
| HTTP/HTTPS | HyperText Transfer Protocol (Secure) |
| CRUD | Create, Read, Update, Delete |
| Tailwind CSS | Utility-first CSS framework |
| Radix UI | Accessible component primitives for React |
| Lucide React | Icon library for React |
| JWT | JSON Web Token |
| Razorpay | Indian payment gateway service |
| DFD | Data Flow Diagram |
| TypeScript | Typed superset of JavaScript |

### 1.4 References

1. IEEE Std 830-1998 – IEEE Recommended Practice for Software Requirements Specifications
2. Next.js Official Documentation – https://nextjs.org
3. React.js Official Documentation – https://react.dev
4. Tailwind CSS Documentation – https://tailwindcss.com
5. Radix UI Documentation – https://www.radix-ui.com
6. TypeScript Documentation – https://www.typescriptlang.org
7. Razorpay API Documentation – https://razorpay.com/docs
8. OWASP Top 10 Security Risks – https://owasp.org
9. REST Architectural Style – Roy Fielding Dissertation
10. Web Content Accessibility Guidelines (WCAG) 2.1

### 1.5 Overview

This document is organized into the following major sections:

**Section 1 – Introduction**  
Defines the purpose, scope, terminology, and structure of the document.

**Section 2 – General Description**  
Provides an overall description of the system, including product perspective, user classes, constraints, and assumptions.

**Section 3 – Specific Requirements**  
Details functional, non-functional, interface, and design constraints in a structured and testable format.

**Section 4 – Analysis Models**  
Describes system behavior using Data Flow Diagrams (DFDs).

**Section 5 – Project Links**  
Provides GitHub repository and deployed application information.

**Section 6 – Appendices**  
Contains supplementary technical details and supporting documentation.

---

## 2. GENERAL DESCRIPTION

### 2.1 Product Perspective

Ultimate Success Institute is a new, self-contained web-based software system developed as a full-stack application using Next.js framework. The system follows a modern client–server model where the frontend and backend are tightly integrated through Next.js App Router, providing server-side rendering, API routes, and optimized performance.

**Architectural Perspective**

**Frontend Layer**  
Built using Next.js 16 with React 18.3, the frontend provides server-side rendered pages, interactive components, client-side state management, and seamless routing with the App Router. The UI is responsive and accessible.

**Backend Layer**  
Implemented using Next.js API routes, the backend exposes RESTful endpoints for authentication, subscription management, payment processing, user management, and administrative operations.

**Database Layer**  
MongoDB is used as a NoSQL document-oriented database to store users, subscriptions, payments, seats, progress tracking, feedback, and system logs.

**External Services**  
- Razorpay for payment processing
- WhatsApp API for subscription reminders

**Design Paradigm**
- Component-based UI architecture with React Server Components
- Role-Based Access Control (RBAC)
- Cookie-based authentication with HTTP-only cookies
- Separation of concerns between UI, business logic, and data layers
- TypeScript for type safety across the application

Ultimate Success Institute does not depend on any legacy educational systems and is designed to be modular, scalable, and extensible for future educational technology needs.

### 2.2 Product Functions

The primary functions of the Ultimate Success Institute system are grouped by user role:

**Student Functions**
- User registration with email and phone number
- Secure login with credential validation
- Browse library subscription plans with flexible options:
  - Duration: 1 Month, 3 Months, 7 Months
  - Shift: Full Day, Morning, Evening
  - Seat Type: Regular, Special
  - Add-ons: Registration fee, Locker facility
- Complete payment through Razorpay integration
- View current subscription details and expiry date
- Track study progress with visual analytics
- Set and manage personal learning goals
- Create and track daily todos
- Submit feedback and testimonials
- View available seats in real-time
- Receive subscription renewal reminders
- Manage personal profile information
- Browse coaching classes and computer classes offerings
- View institute gallery and location information

**Admin Functions**
- Secure authentication with admin-level access
- View comprehensive dashboard with key metrics:
  - Total revenue and monthly revenue trends
  - Active students count
  - Expiring subscriptions alerts
  - New signups tracking
  - Renewal rate analytics
- Manage all registered users with detailed profiles
- View individual user subscription and payment history
- Monitor seat occupancy and availability
- Add, update, or remove seats (bulk operations supported)
- Track revenue with visual charts and breakdowns
- Send WhatsApp reminders to users with expiring subscriptions
- View system-wide statistics and analytics
- Enforce platform-level policies
- Maintain overall system integrity

**Common Functions**
- Responsive design across all devices
- Theme toggle (light/dark mode)
- Secure data transmission
- Real-time updates for subscription status
- Password reset functionality
- Profile management

All functions are exposed through an intuitive web interface backed by validated server-side logic and secure API endpoints.

### 2.3 User Characteristics

The system defines two primary user classes, each with distinct characteristics and access privileges:

**Student**
- Age group: 16-35 years (primarily college students and young professionals)
- Education level: High school to graduate and postgraduate students
- Technical proficiency: Basic to moderate web literacy
- Familiar with web browsing, online payments, and form-based interactions
- No prior technical expertise required
- Primary focus on ease of use, clear subscription options, and progress tracking
- Motivated by academic and career success goals
- Value-conscious regarding subscription pricing and benefits

**Admin**
- Institute staff and management personnel
- Technically proficient users
- Familiar with dashboard interfaces and data analytics
- Responsible for user management, revenue tracking, and operational oversight
- Requires detailed visibility and control over platform data
- Decision-makers for institute operations and student management
- Sensitive to data accuracy, security, and reporting needs

The system UI is designed to accommodate both user types with minimal learning curve, intuitive navigation, and role-appropriate feature visibility.

### 2.4 General Constraints

The Ultimate Success Institute system operates under the following constraints:

**Technical Constraints**
- Must run entirely in modern web browsers (Chrome, Firefox, Safari, Edge)
- Frontend restricted to Next.js with React ecosystem
- Backend limited to Next.js API routes
- MongoDB used as the primary datastore
- TypeScript required for type safety
- Razorpay payment gateway for payment processing (India-specific)

**Security Constraints**
- Cookie-based authentication is mandatory with HTTP-only cookies
- Passwords must be hashed using industry-standard algorithms
- Role-based authorization enforced at API and UI levels
- Sensitive data must be encrypted in transit (HTTPS)
- Payment information handled securely through Razorpay SDK

**Regulatory Constraints**
- Student data must be treated as sensitive information
- Access to personal and financial records restricted by role
- Compliance with data protection regulations
- Payment gateway compliance with RBI guidelines

**Business Constraints**
- Pricing model is fixed and must be maintained through pricing module
- Subscription durations limited to predefined options (1, 3, 7 months)
- Seat types and shifts are fixed configurations
- Payment gateway fees absorbed by the institute

**Deployment Constraints**
- Application hosted on cloud-based infrastructure
- Environment variables used for sensitive configuration
- Continuous deployment required for updates
- Database backups must be maintained

**Performance Constraints**
- Page load time should not exceed 3 seconds
- API response time should be under 500ms for standard operations
- Support for at least 100 concurrent users
- Real-time seat availability updates

### 2.5 Assumptions and Dependencies

**Assumptions**
- Users have access to stable internet connection
- Users operate on modern browsers with JavaScript enabled
- Users have valid email addresses and phone numbers
- Students have access to payment methods supported by Razorpay (UPI, Cards, Net Banking)
- Admins actively monitor dashboard and respond to alerts
- Institute operates during defined business hours
- Seat capacity is managed appropriately by admins
- Users consent to data collection and storage
- WhatsApp reminders are enabled and functional

**Dependencies**
- MongoDB database availability and performance
- Next.js framework stability and compatibility
- Razorpay payment gateway uptime and reliability
- Third-party libraries (React, Tailwind CSS, Radix UI, Lucide React)
- Hosting platform reliability (e.g., Vercel, AWS, DigitalOcean)
- Email service for notifications (if implemented)
- WhatsApp API for reminder functionality
- Browser compatibility with modern web standards
- SSL certificate for HTTPS
- CDN for static asset delivery

Any failure in these dependencies may impact system functionality and require fallback mechanisms or error handling strategies.

---

## 3. SPECIFIC REQUIREMENTS

This section specifies the detailed functional and non-functional requirements of the Ultimate Success Institute system. All requirements defined in this section are mandatory unless explicitly stated as optional or future enhancement.

### 3.1 External Interface Requirements

#### 3.1.1 User Interfaces

The Ultimate Success Institute system shall provide a responsive, web-based user interface developed using Next.js, React.js, and Tailwind CSS.

**General UI Requirements**
- The system shall support desktop (1920x1080), tablet (768x1024), and mobile (375x667) screen resolutions
- The UI shall follow a consistent visual hierarchy using Radix UI component primitives
- Icons shall be rendered using Lucide React for visual clarity and consistency
- Navigation shall be role-specific and dynamically rendered based on authentication status
- The system shall provide light and dark theme modes with persistent user preference
- Form validation shall provide real-time feedback to users
- Loading states shall be indicated with skeleton screens or spinners
- Error messages shall be user-friendly and actionable

**Role-Based UI Pages**

*Student Pages:*
- Home Page with hero section, about, services, testimonials, location
- Login Page with email/password authentication
- Signup Page with registration form
- Student Dashboard with subscription overview
- Library Subscription Page with plan selection and payment
- Progress Tracker Page with visual analytics
- Todo Management Page
- Feedback Submission Page
- Password Reset Pages (Request and Reset)
- Coaching Classes Information Page
- Computer Classes Information Page
- Gallery Page
- Payment Success/Failure Pages

*Admin Pages:*
- Admin Dashboard with comprehensive statistics
- User Management Page with search and filters
- Revenue Analytics Page with charts
- Seat Management Page with occupancy tracking
- WhatsApp Reminders Page for subscription alerts

*Common Pages:*
- 404 Error Page
- 500 Error Page
- Profile Management Page

All user interactions shall be validated both client-side and server-side with appropriate error handling.

#### 3.1.2 Hardware Interfaces

The system does not directly interface with specialized hardware.

**Minimum Client Hardware Requirements:**
- Internet-enabled device (desktop, laptop, tablet, or smartphone)
- Input device (keyboard, touchscreen, or mouse)
- Display with minimum resolution of 375x667 pixels
- Printer (optional, for subscription receipts or certificates)

**Server Hardware Requirements:**
- Abstracted through cloud hosting services
- Minimum 2 vCPUs, 2GB RAM for basic deployment
- Scalable infrastructure based on user load
- SSD storage for database performance

#### 3.1.3 Software Interfaces

| Software Component | Version | Description |
|-------------------|---------|-------------|
| Next.js | 16.0.7 | Full-stack React framework with SSR |
| React | 18.3.1 | UI library for component-based development |
| React DOM | 18.3.1 | React rendering for web |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.1.9 | Utility-first CSS framework |
| Radix UI | Various | Accessible component primitives |
| Lucide React | 0.454.0 | Icon library |
| Framer Motion | 12.23.26 | Animation library |
| React Hook Form | 7.60.0 | Form validation library |
| Zod | 3.25.67 | Schema validation |
| date-fns | 4.1.0 | Date utility library |
| Recharts | Latest | Charting library for analytics |
| Sonner | 1.7.4 | Toast notifications |
| MongoDB | Latest | NoSQL database |
| Razorpay SDK | Latest | Payment processing |

**API Communication:**
- Protocol: HTTP/HTTPS
- Data Format: JSON
- Authentication: HTTP-only cookies with JWT tokens
- Endpoint Base: `/api`

**External Service Integrations:**
- Razorpay Payment Gateway API for payment processing
- WhatsApp Business API for subscription reminders
- Email service (optional) for notifications

#### 3.1.4 Communications Interfaces

**Network Protocols:**
- HTTP/HTTPS for client-server communication
- WebSocket (optional) for real-time updates
- TLS 1.2 or higher for encryption

**Data Formats:**
- JSON for API requests and responses
- FormData for file uploads (if applicable)
- URL-encoded for specific POST requests

**Authentication Flow:**
- Cookie-based session management
- JWT tokens stored in HTTP-only cookies
- CSRF protection for state-changing operations
- Secure cookie attributes (HttpOnly, Secure, SameSite)

**API Response Structure:**
```json
{
  "success": boolean,
  "data": object | array,
  "message": string,
  "error": string (optional)
}
```

### 3.2 Functional Requirements

#### 3.2.1 Authentication and Authorization

**FR-1:** The system shall allow users to register as a Student with name, email, phone, and password.

**FR-2:** The system shall validate email uniqueness during registration.

**FR-3:** The system shall authenticate users using email and password credentials.

**FR-4:** The system shall assign roles (Student or Admin) upon authentication.

**FR-5:** The system shall store authentication tokens in HTTP-only cookies.

**FR-6:** The system shall restrict access to routes based on user role (RBAC).

**FR-7:** The system shall invalidate sessions on logout and clear authentication cookies.

**FR-8:** The system shall provide password reset functionality via email.

**FR-9:** The system shall enforce password complexity requirements (minimum 8 characters).

**FR-10:** The system shall prevent brute force attacks with rate limiting.

#### 3.2.2 Library Subscription Management

**FR-11:** Students shall be able to view available subscription plans with pricing details.

**FR-12:** The system shall display pricing based on duration (1, 3, 7 months), shift (Full Day, Morning, Evening), and seat type (Regular, Special).

**FR-13:** Students shall be able to select add-ons (Registration fee: ₹150, Locker: ₹100).

**FR-14:** The system shall calculate total subscription cost dynamically based on selections.

**FR-15:** Students shall be able to initiate payment through Razorpay integration.

**FR-16:** The system shall verify payment signature before creating subscription.

**FR-17:** The system shall create subscription record upon successful payment verification.

**FR-18:** Students shall be able to view current subscription status, start date, and expiry date.

**FR-19:** The system shall calculate days remaining in subscription.

**FR-20:** Students shall receive renewal reminders 7 days before expiry.

**FR-21:** The system shall allow subscription renewal before expiry.

**FR-22:** The system shall mark subscriptions as expired after expiry date.

#### 3.2.3 Student Dashboard and Features

**FR-23:** Students shall be able to access a personalized dashboard showing subscription overview.

**FR-24:** The system shall display current streak and total study days.

**FR-25:** Students shall be able to set and track learning goals with completion status.

**FR-26:** Students shall be able to create, update, and delete daily todos.

**FR-27:** Students shall be able to view progress analytics with visual charts.

**FR-28:** Students shall be able to submit feedback with ratings and comments.

**FR-29:** The system shall display founder's message and institute information.

**FR-30:** Students shall be able to view available seat count in real-time.

**FR-31:** Students shall be able to update profile information (name, phone).

#### 3.2.4 Payment Processing

**FR-32:** The system shall integrate with Razorpay for payment processing.

**FR-33:** The system shall create Razorpay orders with plan details and amount.

**FR-34:** The system shall handle payment callbacks (success, failure).

**FR-35:** The system shall verify payment signatures using Razorpay secret key.

**FR-36:** The system shall store payment records with transaction IDs.

**FR-37:** Students shall be redirected to success/failure pages based on payment status.

**FR-38:** The system shall provide payment history to students.

**FR-39:** The system shall handle payment failures gracefully with retry options.

#### 3.2.5 Admin Management

**FR-40:** Admins shall be able to view dashboard with key statistics:
- Total revenue
- Monthly revenue
- Active students count
- Expiring subscriptions count
- New signups count
- Renewal rate percentage

**FR-41:** Admins shall be able to view list of all users with search and filter options.

**FR-42:** Admins shall be able to filter users by subscription status (active, expired, expiring, no plan).

**FR-43:** Admins shall be able to view detailed user profile with subscription and payment history.

**FR-44:** Admins shall be able to manage seats:
- View all seats with occupancy status
- Add seats in bulk (specify type and count)
- Update seat occupancy status
- Delete seats (single or bulk)

**FR-45:** Admins shall be able to view revenue analytics with charts:
- Total revenue over time
- Monthly revenue breakdown
- Subscription type distribution

**FR-46:** Admins shall be able to send WhatsApp reminders to users with expiring subscriptions.

**FR-47:** The system shall identify users with subscriptions expiring within 7 days.

**FR-48:** Admins shall be able to view recent activities (signups, renewals, expiries).

#### 3.2.6 Information and Content Management

**FR-49:** The system shall display home page with hero section, about, services, testimonials, and location.

**FR-50:** The system shall provide information pages for:
- Coaching Classes (courses offered, exam preparations)
- Computer Classes (courses, certifications)
- Gallery (institute photos)

**FR-51:** The system shall display testimonials from students.

**FR-52:** The system shall show institute location on map (Google Maps integration).

**FR-53:** The system shall provide contact information (phone, email, address).

### 3.3 Non-Functional Requirements

#### 3.3.1 Performance Requirements

**NFR-1:** The system shall load pages within 3 seconds under normal network conditions.

**NFR-2:** API response time shall not exceed 500ms for standard CRUD operations.

**NFR-3:** Payment processing shall complete within 10 seconds.

**NFR-4:** The system shall support at least 100 concurrent users without performance degradation.

**NFR-5:** Database queries shall be optimized with proper indexing.

**NFR-6:** Static assets shall be served through CDN for faster load times.

**NFR-7:** Images shall be optimized and lazy-loaded.

**NFR-8:** The system shall use server-side rendering for improved initial page load.

#### 3.3.2 Reliability Requirements

**NFR-9:** The system shall prevent double subscription creation for the same payment.

**NFR-10:** The system shall ensure atomic operations for payment verification and subscription creation.

**NFR-11:** The system shall handle errors gracefully with user-friendly messages.

**NFR-12:** The system shall maintain data integrity across all operations.

**NFR-13:** The system shall log critical errors for debugging.

**NFR-14:** The system shall provide fallback mechanisms for external service failures.

#### 3.3.3 Availability Requirements

**NFR-15:** The system shall be available 24×7, excluding scheduled maintenance.

**NFR-16:** Planned downtime shall be communicated 48 hours in advance.

**NFR-17:** The system shall have 99.5% uptime SLA.

**NFR-18:** Automated health checks shall monitor system availability.

**NFR-19:** Database backups shall be performed daily.

#### 3.3.4 Security Requirements

**NFR-20:** Passwords shall be hashed using bcrypt or equivalent strong hashing algorithm.

**NFR-21:** Authentication tokens shall be stored in HTTP-only, Secure, SameSite cookies.

**NFR-22:** API routes shall be protected with authentication middleware.

**NFR-23:** Role-based authorization shall be enforced at the API level.

**NFR-24:** Sensitive data shall be transmitted over HTTPS only.

**NFR-25:** Payment information shall never be stored on the server (handled by Razorpay).

**NFR-26:** The system shall implement CSRF protection for state-changing operations.

**NFR-27:** Input validation shall prevent SQL injection and XSS attacks.

**NFR-28:** Rate limiting shall be implemented to prevent abuse.

**NFR-29:** Admin actions shall be logged for audit purposes.

**NFR-30:** Session timeout shall be enforced after 24 hours of inactivity.

#### 3.3.5 Maintainability Requirements

**NFR-31:** Code shall follow modular architecture with clear separation of concerns.

**NFR-32:** Components shall be reusable and well-documented.

**NFR-33:** Environment-specific configurations shall be externalized.

**NFR-34:** The codebase shall use TypeScript for type safety.

**NFR-35:** Code shall follow consistent naming conventions and formatting.

**NFR-36:** API endpoints shall be versioned for backward compatibility.

**NFR-37:** Database schema changes shall be managed with migrations.

#### 3.3.6 Usability Requirements

**NFR-38:** The user interface shall be intuitive and require minimal training.

**NFR-39:** Navigation shall be consistent across all pages.

**NFR-40:** Form fields shall provide clear labels and validation messages.

**NFR-41:** The system shall provide feedback for all user actions.

**NFR-42:** The system shall be accessible to users with disabilities (WCAG 2.1 Level A compliance).

**NFR-43:** The system shall support light and dark themes.

**NFR-44:** The system shall be fully responsive across all device sizes.

#### 3.3.7 Portability Requirements

**NFR-45:** The application shall run on all modern web browsers (Chrome, Firefox, Safari, Edge).

**NFR-46:** The system shall be deployable on any Node.js-compatible hosting platform.

**NFR-47:** The system shall not depend on platform-specific features.

**NFR-48:** Database connections shall be configurable via environment variables.

### 3.4 Design Constraints

**DC-1:** Frontend must be built using Next.js framework.

**DC-2:** Backend must use Next.js API routes.

**DC-3:** UI must use Tailwind CSS for styling.

**DC-4:** Component library must use Radix UI primitives.

**DC-5:** Database must be MongoDB.

**DC-6:** Payment gateway must be Razorpay (India-specific).

**DC-7:** Authentication must use cookie-based sessions.

**DC-8:** TypeScript must be used throughout the application.

**DC-9:** RESTful API architecture is mandatory.

**DC-10:** Server-side rendering must be used for improved SEO and performance.

### 3.5 Logical Database Requirements

**Database: MongoDB (NoSQL)**

**Collections:**

1. **users**
   - _id: ObjectId (primary key)
   - name: String
   - email: String (unique, indexed)
   - phone: String
   - password: String (hashed)
   - role: String (enum: 'student', 'admin')
   - createdAt: Date
   - updatedAt: Date

2. **subscriptions**
   - _id: ObjectId (primary key)
   - userId: ObjectId (foreign key to users)
   - plan: String
   - duration: String (enum: '1 Month', '3 Months', '7 Months')
   - shift: String (enum: 'Full Day', 'Morning', 'Evening')
   - seatType: String (enum: 'Regular', 'Special')
   - status: String (enum: 'active', 'expired', 'cancelled')
   - startDate: Date
   - expiryDate: Date
   - amountPaid: Number
   - addOns: Object { registration: Boolean, locker: Boolean }
   - createdAt: Date
   - updatedAt: Date

3. **payments**
   - _id: ObjectId (primary key)
   - userId: ObjectId (foreign key to users)
   - orderId: String (Razorpay order ID)
   - paymentId: String (Razorpay payment ID)
   - signature: String (Razorpay signature)
   - amount: Number
   - currency: String
   - status: String (enum: 'success', 'failed', 'pending')
   - plan: String
   - subscriptionId: ObjectId (foreign key to subscriptions)
   - createdAt: Date

4. **seats**
   - _id: ObjectId (primary key)
   - seatNumber: String (unique)
   - type: String (enum: 'REGULAR', 'SPECIAL')
   - occupied: Boolean
   - occupancyType: String (enum: 'FULL_DAY', 'MORNING', 'EVENING', null)
   - createdAt: Date
   - updatedAt: Date

5. **progress**
   - _id: ObjectId (primary key)
   - userId: ObjectId (foreign key to users)
   - currentStreak: Number
   - totalDays: Number
   - lastCheckin: Date
   - createdAt: Date
   - updatedAt: Date

6. **goals**
   - _id: ObjectId (primary key)
   - userId: ObjectId (foreign key to users)
   - title: String
   - description: String
   - completed: Boolean
   - targetDate: Date
   - createdAt: Date
   - updatedAt: Date

7. **todos**
   - _id: ObjectId (primary key)
   - userId: ObjectId (foreign key to users)
   - task: String
   - completed: Boolean
   - priority: String (enum: 'high', 'medium', 'low')
   - createdAt: Date
   - updatedAt: Date

8. **feedback**
   - _id: ObjectId (primary key)
   - userId: ObjectId (foreign key to users)
   - rating: Number (1-5)
   - comment: String
   - approved: Boolean
   - createdAt: Date
   - updatedAt: Date

**Indexes:**
- users.email (unique)
- subscriptions.userId
- subscriptions.expiryDate
- payments.userId
- payments.orderId
- seats.seatNumber (unique)
- goals.userId
- todos.userId
- feedback.userId

### 3.6 Other Requirements

**Logging Requirements:**
- The system shall log all authentication attempts (success and failure)
- The system shall log all payment transactions
- The system shall log admin actions (user management, seat management)
- The system shall log critical errors with stack traces
- Logs shall be stored securely and rotated regularly

**Backup and Recovery:**
- Database backups shall be automated daily
- Backup retention period shall be 30 days
- Recovery procedures shall be documented and tested
- Critical data shall be backed up to multiple locations

**Scalability Requirements:**
- The system architecture shall support horizontal scaling
- Database shall support sharding for future growth
- Static assets shall be served through CDN
- Caching strategies shall be implemented for frequently accessed data

**Future Enhancements (Out of Current Scope):**
- Mobile native applications (Android/iOS)
- Live online classes with video streaming
- Integration with national education databases
- AI-powered study recommendations
- Social features (student community, forums)
- Multiple payment gateway options
- Multi-language support
- Offline mode with data synchronization

---

## 4. ANALYSIS MODELS

Analysis models describe how data flows through the Ultimate Success Institute system, independent of implementation details. Data Flow Diagrams (DFDs) are used to visually and logically represent interactions between users, processes, and data stores.

### 4.1 Data Flow Diagrams (DFD)

#### 4.1.1 DFD Level 0 – Context Diagram

At the highest abstraction level, Ultimate Success Institute is represented as a single process interacting with external entities.

```
┌─────────────┐
│   Student   │
└──────┬──────┘
       │
       │ Registration, Login, Subscription Requests
       │ Goals, Todos, Feedback
       │
       ▼
┌─────────────────────────────────────────────┐
│                                             │
│   Ultimate Success Institute                │
│   Learning Management Platform              │
│                                             │
└─────────────────────────────────────────────┘
       │
       │ Subscription Details, Payment Confirmation
       │ Progress Reports, Reminders
       │
       ▲
       │
       │ User Management, Seat Management
       │ Revenue Reports, WhatsApp Reminders
       │
┌──────┴──────┐        ┌──────────────┐       ┌──────────────┐
│    Admin    │        │   Razorpay   │       │   WhatsApp   │
└─────────────┘        │  (Payment)   │       │     API      │
                       └──────────────┘       └──────────────┘
```

**External Entities:**
- **Student:** End-users who register, subscribe to library services, track progress, and manage learning goals
- **Admin:** Institute staff who manage users, monitor revenue, handle seat allocation, and send reminders
- **Razorpay:** External payment gateway for processing subscription payments
- **WhatsApp API:** External service for sending subscription renewal reminders

**Central Process:**
- **Ultimate Success Institute Learning Management Platform**

**Data Flows:**
- **Student → System:** Registration data, login credentials, subscription selections, payment information, goals, todos, feedback
- **System → Student:** Authentication tokens, subscription confirmations, payment receipts, progress analytics, renewal reminders, seat availability
- **Admin → System:** Login credentials, user management commands, seat operations, report requests, reminder triggers
- **System → Admin:** Dashboard statistics, user lists, revenue analytics, subscription reports, system logs
- **System → Razorpay:** Payment order creation requests, verification data
- **Razorpay → System:** Payment status, transaction IDs, payment signatures
- **System → WhatsApp API:** Reminder messages with user details
- **WhatsApp API → System:** Delivery status confirmations

This level establishes system boundaries and clarifies external interactions with users and third-party services.

#### 4.1.2 DFD Level 1 – Functional Decomposition

At Level 1, the Ultimate Success Institute system is decomposed into major sub-processes:

```
                    ┌────────────────────────────────────────────────┐
                    │            Data Stores                         │
                    │                                                │
                    │  D1: Users                                     │
                    │  D2: Subscriptions                            │
                    │  D3: Payments                                 │
                    │  D4: Seats                                    │
                    │  D5: Progress & Goals                         │
                    │  D6: Feedback                                 │
                    └────────────────────────────────────────────────┘
                               │        ▲
                               │        │
                               ▼        │
┌──────────┐        ┌────────────────────────────┐         ┌──────────┐
│ Student  │───────▶│  Process 1.0               │────────▶│  Admin   │
└──────────┘        │  Authentication &          │         └──────────┘
                    │  Authorization             │
                    └────────────────────────────┘
                               │
                               ▼
                    ┌────────────────────────────┐
                    │  Process 2.0               │
                    │  Subscription Management   │◀────────Razorpay
                    └────────────────────────────┘
                               │
                               ▼
                    ┌────────────────────────────┐
                    │  Process 3.0               │
                    │  Payment Processing        │◀────────Razorpay
                    └────────────────────────────┘
                               │
                               ▼
                    ┌────────────────────────────┐
                    │  Process 4.0               │
                    │  Student Dashboard         │
                    │  & Progress Tracking       │
                    └────────────────────────────┘
                               │
                               ▼
                    ┌────────────────────────────┐
                    │  Process 5.0               │
                    │  Admin Control &           │────────▶WhatsApp API
                    │  Monitoring                │
                    └────────────────────────────┘
                               │
                               ▼
                    ┌────────────────────────────┐
                    │  Process 6.0               │
                    │  Seat Management           │
                    └────────────────────────────┘
```

**Process 1.0: Authentication & Authorization**
- **Inputs:** Email, password, registration data, user role
- **Outputs:** JWT tokens (in cookies), user session data, role-based access permissions
- **Data Stores:** D1: Users
- **Processing:** Validate credentials, hash passwords, create/verify JWT tokens, assign roles, manage sessions
- **Validation:** Email uniqueness, password strength, token expiry, role verification

**Process 2.0: Subscription Management**
- **Inputs:** Subscription plan selection (duration, shift, seat type), add-ons, user ID
- **Outputs:** Subscription details, expiry dates, days remaining, renewal status
- **Data Stores:** D2: Subscriptions
- **Processing:** Calculate pricing, create subscription records, track expiry dates, handle renewals, update subscription status
- **Business Rules:** Pricing based on duration/shift/seat type matrix, subscription expiry logic, renewal eligibility

**Process 3.0: Payment Processing**
- **Inputs:** Payment details from Razorpay, order ID, payment ID, signature, subscription plan, amount
- **Outputs:** Payment confirmation, transaction records, subscription activation
- **Data Stores:** D2: Subscriptions, D3: Payments
- **External Interface:** Razorpay Payment Gateway
- **Processing:** Create payment orders, verify payment signatures, record transactions, link payments to subscriptions
- **Security:** Signature verification, secure payment data handling, fraud prevention

**Process 4.0: Student Dashboard & Progress Tracking**
- **Inputs:** User ID, goal data, todo items, check-in data, feedback
- **Outputs:** Progress analytics, streak information, goal completion status, todo lists, feedback submissions
- **Data Stores:** D5: Progress & Goals, D6: Feedback
- **Processing:** Track study streaks, calculate progress metrics, manage goals and todos, collect feedback
- **Analytics:** Visual charts, completion percentages, trend analysis

**Process 5.0: Admin Control & Monitoring**
- **Inputs:** Admin commands, filter criteria, date ranges, user IDs
- **Outputs:** Dashboard statistics, user lists, revenue reports, expiry alerts, reminder triggers
- **Data Stores:** D1: Users, D2: Subscriptions, D3: Payments
- **External Interface:** WhatsApp API
- **Processing:** Aggregate statistics, filter and search users, generate revenue analytics, identify expiring subscriptions, trigger reminders
- **Reports:** Total revenue, monthly revenue, active students, renewal rates, subscription breakdowns

**Process 6.0: Seat Management**
- **Inputs:** Seat operations (add, update, delete), seat type, occupancy status, count
- **Outputs:** Seat availability, occupancy reports, seat lists
- **Data Stores:** D4: Seats
- **Processing:** Track seat inventory, update occupancy status, bulk operations, real-time availability
- **Constraints:** Seat capacity limits, occupancy type restrictions

**Data Store Descriptions:**

**D1: Users**
- Stores user account information (students and admins)
- Contains authentication credentials and profile data
- Indexed by email for fast lookup

**D2: Subscriptions**
- Stores all subscription records with plan details
- Tracks subscription lifecycle (active, expired, cancelled)
- Links to users and payments

**D3: Payments**
- Records all payment transactions
- Stores Razorpay transaction details
- Links to subscriptions and users

**D4: Seats**
- Maintains seat inventory
- Tracks occupancy status and types
- Real-time availability data

**D5: Progress & Goals**
- Stores student progress metrics
- Tracks goals and todos
- Historical data for analytics

**D6: Feedback**
- Collects student feedback and ratings
- Supports testimonial approval workflow

This decomposition ensures clarity, traceability, and testability of system behavior across all major functional areas.

#### 4.1.3 DFD Level 2 – Payment Processing (Detailed)

For critical operations like payment processing, a more detailed view is provided:

```
                    ┌─────────────────────────────────────────┐
                    │      Process 3.0 - Payment Processing   │
                    └─────────────────────────────────────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
                ▼                     ▼                     ▼
    ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
    │   Process 3.1     │  │   Process 3.2     │  │   Process 3.3     │
    │   Create Order    │  │   Process Payment │  │   Verify Payment  │
    └───────────────────┘  └───────────────────┘  └───────────────────┘
            │                       │                       │
            ▼                       ▼                       ▼
    Create Razorpay      Collect Payment        Verify Signature
    order with amount    Details from User      & Create Records
            │                       │                       │
            ▼                       ▼                       ▼
    Return Order ID      Submit to Razorpay     Link Payment to
    to Frontend          for Processing         Subscription
            │                       │                       │
            ▼                       ▼                       ▼
    Store Order         Return Payment         Activate
    Reference           Success/Failure        Subscription
```

This detailed decomposition ensures secure, reliable, and auditable payment processing with proper error handling at each stage.

---

## 5. PROJECT LINKS

The complete source code for the Ultimate Success Institute project is hosted on GitHub and follows modern Next.js App Router architecture with TypeScript.

### GitHub Repository

**Repository URL:** https://github.com/rozy754/Ultimate-Success-Institute-Frontend

The repository contains:
- Frontend source code (Next.js, React, TypeScript, Tailwind CSS)
- Backend API routes (Next.js API routes)
- Component library (Radix UI, custom components)
- Configuration files (TypeScript, Tailwind, Next.js)
- Environment configuration templates
- Package dependencies and lock files

**Project Structure:**
```
Ultimate-Success-Institute-Frontend/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin dashboard pages
│   ├── library/             # Student library pages
│   ├── coaching-classes/    # Coaching classes info
│   ├── computer-classes/    # Computer classes info
│   ├── login/               # Authentication pages
│   ├── signup/
│   ├── payment/             # Payment success/failure
│   └── api/                 # API routes (backend)
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   ├── auth/               # Authentication components
│   ├── library/            # Student dashboard components
│   ├── payment/            # Payment components
│   └── ui/                 # Reusable UI components
├── lib/                     # Utility functions and API clients
│   ├── api.ts              # Base API client
│   ├── admin-api.ts        # Admin API functions
│   ├── subscription-api.ts # Subscription API functions
│   ├── payment-api.ts      # Payment API functions
│   └── pricing.ts          # Pricing logic
├── hooks/                   # Custom React hooks
├── styles/                  # Global styles
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

**Setup Instructions:**
1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Configure environment variables (MongoDB, Razorpay keys)
4. Run development server: `npm run dev`
5. Build for production: `npm run build`
6. Start production server: `npm start`

### Deployment Information

**Frontend & Backend:**
- Hosted as a unified Next.js application
- Deployment platform: Vercel / AWS / DigitalOcean (configurable)
- Automatic deployments on main branch push
- Environment variables configured in hosting platform
- Custom domain support

**Database:**
- MongoDB Atlas (cloud-hosted) or self-hosted MongoDB
- Connection string configured via environment variables
- Automated backups enabled

**External Services:**
- Razorpay account for payment processing
- WhatsApp Business API for reminders
- CDN for static asset delivery

---

## 6. APPENDICES

### Appendix A: Conceptual Description of Ultimate Success Institute

#### A.1 Background and Motivation

In traditional educational coaching and library systems, students face several challenges:
- Lack of organized study environments
- Manual subscription management and payment tracking
- No systematic progress tracking or goal-setting tools
- Limited access to resources and study materials
- Inefficient communication for subscription renewals
- Administrative burden on institute staff for user and revenue management

Traditional systems rely on physical registers, manual payment receipts, and face-to-face interactions, which are time-consuming, error-prone, and difficult to scale. With the increasing digitization of educational services and the growing expectations of tech-savvy students, there is a clear need for a modern, web-based platform that streamlines all aspects of institute management.

The Ultimate Success Institute platform addresses these challenges by providing a comprehensive digital solution that benefits both students and administrators. Students gain access to a structured learning environment with progress tracking, goal management, and seamless subscription handling. Administrators benefit from automated revenue tracking, user management tools, and data-driven insights for better decision-making.

#### A.2 Problem Statement

The key problems addressed by the Ultimate Success Institute system include:

**For Students:**
- Difficulty in tracking study progress and maintaining consistency
- Lack of goal-setting and task management tools
- Manual and time-consuming subscription payment processes
- No visibility into seat availability
- Missing reminders for subscription renewals
- Limited feedback channels to the institute

**For Administrators:**
- Manual tracking of subscriptions and payments
- Difficulty in monitoring revenue trends
- No centralized user management system
- Inefficient seat occupancy tracking
- Time-consuming process for sending renewal reminders
- Lack of analytics for data-driven decisions

**For the Institute:**
- Difficulty in scaling operations
- Higher operational costs due to manual processes
- Limited insights into student behavior and preferences
- Inefficient resource utilization
- Challenges in maintaining competitive edge

These issues result in reduced student engagement, administrative inefficiencies, revenue leakage, and suboptimal resource allocation.

#### A.3 Conceptual Solution Overview

The Ultimate Success Institute system provides a comprehensive web-based educational management platform that enables seamless interaction between students and the institute through an intuitive digital interface. The solution is designed around user-centric principles, ensuring that each stakeholder has access to relevant features and information.

**Core Components:**

1. **Student Portal:**
   - Personalized dashboard with subscription overview
   - Progress tracking with visual analytics
   - Goal and task management system
   - Feedback submission mechanism
   - Seamless payment integration

2. **Admin Portal:**
   - Comprehensive dashboard with key metrics
   - User management with advanced filtering
   - Revenue analytics with visual charts
   - Seat management system
   - Automated reminder system

3. **Payment System:**
   - Integration with Razorpay for secure payments
   - Flexible pricing based on duration, shift, and seat type
   - Add-on services (registration fee, locker)
   - Automated subscription activation

4. **Communication System:**
   - WhatsApp integration for renewal reminders
   - In-app notifications for important updates
   - Email notifications (optional)

By digitizing the entire student lifecycle from registration to progress tracking, Ultimate Success Institute improves accessibility, reduces operational overhead, enhances student engagement, and provides valuable insights for continuous improvement.

#### A.4 Core Objectives

The conceptual goals of the Ultimate Success Institute system include:

1. **Digitize Operations:** Transform all manual processes into efficient digital workflows
2. **Enhance Student Experience:** Provide tools for better learning outcomes and engagement
3. **Improve Administrative Efficiency:** Reduce manual work and enable data-driven decisions
4. **Ensure Security:** Protect sensitive student and financial data
5. **Enable Scalability:** Build a foundation that can grow with the institute
6. **Generate Insights:** Provide analytics for continuous improvement
7. **Optimize Resources:** Track and manage seat occupancy efficiently
8. **Facilitate Communication:** Automate reminders and notifications
9. **Increase Revenue:** Reduce subscription lapses through timely reminders
10. **Build Community:** Create a platform for student feedback and testimonials

These objectives guide the system's design, implementation, and future enhancement strategy.

#### A.5 High-Level System Concept

At a conceptual level, Ultimate Success Institute operates as a modern full-stack web application where:

- **Users interact** with the system through a responsive, browser-based interface
- **Business logic** is handled by server-side code with API endpoints
- **Data persistence** is managed through a scalable NoSQL database
- **External services** handle specialized functions (payments, messaging)
- **Authentication** is managed securely with cookie-based sessions
- **Analytics** are generated from transactional data for insights

The system follows best practices for web application development, including:
- Separation of concerns (UI, business logic, data access)
- Role-based access control for security
- Responsive design for multi-device support
- API-first architecture for extensibility
- Type safety through TypeScript
- Performance optimization through server-side rendering

### Appendix B: Development Tools and Technologies

#### B.1 Frontend Technology

**Next.js 16**

Next.js is the primary framework for building the Ultimate Success Institute application. It provides:
- **Server-Side Rendering (SSR):** Improved performance and SEO
- **App Router:** Modern routing system with layouts and nested routes
- **API Routes:** Built-in backend functionality
- **Automatic Code Splitting:** Optimized bundle sizes
- **Image Optimization:** Built-in image component for performance
- **TypeScript Support:** First-class TypeScript integration

Key advantages:
- Unified frontend and backend in a single codebase
- Excellent developer experience with hot module replacement
- Production-ready optimizations out of the box
- Strong ecosystem and community support

**React 18.3**

React is used as the UI library for building component-based interfaces:
- Component reusability and composition
- Virtual DOM for efficient rendering
- Hooks for state management and side effects
- Server Components for improved performance
- Strong typing with TypeScript

**TypeScript 5**

TypeScript provides static type checking:
- Catch errors during development
- Improved IDE support with autocomplete
- Better code maintainability
- Self-documenting code through type annotations
- Reduced runtime errors

#### B.2 Styling and UI Components

**Tailwind CSS 4**

Utility-first CSS framework for rapid UI development:
- Consistent design system
- Responsive design utilities
- Dark mode support
- Small bundle size with purging
- Customizable configuration

**Radix UI**

Accessible component primitives:
- WAI-ARIA compliant components
- Unstyled by default for full customization
- Keyboard navigation support
- Focus management
- Components: Dialog, Dropdown, Select, Toast, etc.

**Lucide React**

Icon library providing:
- Consistent icon design
- Tree-shakable imports
- Customizable size and color
- 1000+ icons
- Lightweight and performant

**Framer Motion**

Animation library for:
- Smooth page transitions
- Component animations
- Gesture handling
- Layout animations
- Enhanced user experience

#### B.3 Form Handling and Validation

**React Hook Form 7**

Form management library:
- Minimal re-renders for better performance
- Easy integration with validation libraries
- Built-in validation rules
- Error handling
- Form state management

**Zod 3**

Schema validation library:
- TypeScript-first design
- Powerful type inference
- Runtime validation
- Composable schemas
- Error messages customization

#### B.4 Data Visualization

**Recharts**

Charting library for admin analytics:
- Built on D3.js
- Responsive charts
- Various chart types (Line, Bar, Pie, Area)
- Customizable styling
- Animations and interactions

**date-fns 4**

Date manipulation library:
- Modern JavaScript API
- Immutable operations
- Tree-shakable functions
- Locale support
- Consistent formatting

#### B.5 Backend Technology

**Next.js API Routes**

Server-side functionality:
- RESTful API endpoints
- Middleware support
- Easy integration with database
- Type-safe request/response handling
- Environment variable support

**MongoDB**

NoSQL database:
- Flexible schema design
- Horizontal scalability
- Rich query language
- Aggregation framework
- Excellent Node.js support

#### B.6 Authentication and Security

**Cookie-based Authentication**

Session management:
- HTTP-only cookies for security
- Secure and SameSite attributes
- CSRF protection
- Token-based approach (JWT)
- Role-based access control

**bcrypt**

Password hashing:
- Industry-standard algorithm
- Salting for additional security
- Configurable work factor
- Protection against rainbow table attacks

#### B.7 Payment Integration

**Razorpay**

Payment gateway for Indian market:
- Multiple payment methods (UPI, Cards, NetBanking, Wallets)
- PCI DSS compliant
- Webhook support for payment events
- Test and live modes
- Comprehensive API documentation
- Signature verification for security

#### B.8 Development Tools

**Visual Studio Code**

Primary code editor:
- IntelliSense for autocompletion
- Integrated terminal
- Git integration
- Extensions for Next.js, TypeScript, Tailwind CSS
- Debugging support

**Git**

Version control system:
- Track code changes
- Branching and merging
- Collaboration support
- History and rollback capabilities

**GitHub**

Remote repository hosting:
- Code collaboration
- Pull request reviews
- Issue tracking
- Actions for CI/CD
- Project management tools

**npm / pnpm**

Package managers:
- Dependency management
- Script execution
- Lockfile for reproducible builds
- Workspaces support (if needed)

#### B.9 Additional Libraries

**Sonner**

Toast notification library:
- Beautiful and accessible notifications
- Promise-based API
- Customizable styling
- Multiple notification types
- Auto-dismiss with timers

**class-variance-authority (CVA)**

Component variant management:
- Type-safe component variants
- Tailwind CSS integration
- Composable class names
- Better DX for styled components

**clsx / tailwind-merge**

Class name utilities:
- Conditional class names
- Merge Tailwind classes intelligently
- Remove duplicate classes
- Tree-shakable

#### B.10 Technology Selection Rationale

The selected technologies were chosen based on the following criteria:

**Performance:**
- Server-side rendering for fast initial page loads
- Automatic code splitting for optimized bundles
- CDN-ready static assets

**Developer Experience:**
- TypeScript for type safety
- Hot module replacement for fast development
- Comprehensive documentation
- Strong IDE support

**Scalability:**
- Horizontal scaling support
- Efficient database queries
- Caching strategies
- CDN integration

**Security:**
- Industry-standard authentication
- Secure payment processing
- Input validation and sanitization
- HTTPS enforcement

**Maintainability:**
- Modular architecture
- Reusable components
- Clear separation of concerns
- Type-safe codebase

**Cost-Effectiveness:**
- Open-source technologies
- Competitive hosting options
- Efficient resource utilization

**Community and Support:**
- Active communities
- Regular updates
- Extensive documentation
- Third-party resources

Together, these tools form a robust, modern, and scalable technology stack suitable for building a secure educational management platform that meets current needs and can evolve with future requirements.

---

## Document Approval

**Prepared by:** Development Team  
**Reviewed by:** Project Stakeholders  
**Approved by:** Institute Management  

**Version History:**

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | December 25, 2024 | Development Team | Initial SRS document for Ultimate Success Institute |

---

**End of Document**
