# 🏗️ Architecture Overview - CodeMaster DSA Platform

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │   Tablet     │  │   Mobile     │      │
│  │  (Desktop)   │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │               │
│         └─────────────────┼──────────────────┘               │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│                     Port: 5173 (dev)                         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Pages Layer                       │   │
│  │  • Home  • Problems  • Problem Detail               │   │
│  │  • Companies  • Dashboard  • Login  • Register      │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Components Layer                     │   │
│  │  • Navbar  • ProblemCard  • CompanyCard             │   │
│  │  • StatCard  • LoadingSpinner  • Monaco Editor      │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 State Management                     │   │
│  │  • AuthContext (User authentication)                │   │
│  │  • ThemeContext (Dark/Light mode)                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   API Layer                          │   │
│  │  • Axios interceptors  • API utility functions      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │ HTTP/REST
                            │ (JSON)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Node.js + Express)                  │
│                     Port: 5000                               │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Middleware                         │   │
│  │  • CORS  • JSON Parser  • Auth (JWT)                │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Route Handlers                      │   │
│  │                                                       │   │
│  │  /api/auth        → Authentication                   │   │
│  │  /api/problems    → Problem Management               │   │
│  │  /api/companies   → Company Data                     │   │
│  │  /api/submissions → Code Submissions                 │   │
│  │  /api/user        → User Profile & Stats             │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Business Logic                      │   │
│  │  • User Authentication  • Problem Filtering          │   │
│  │  • Code Validation  • Statistics Calculation         │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Data Models                        │   │
│  │  • User  • Problem  • Company  • Submission          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │ Mongoose ODM
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                        │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  users   │  │ problems │  │companies │  │submissions│   │
│  │          │  │          │  │          │  │           │   │
│  │ • _id    │  │ • _id    │  │ • _id    │  │ • _id     │   │
│  │ • email  │  │ • title  │  │ • name   │  │ • user    │   │
│  │ • pass   │  │ • desc   │  │ • logo   │  │ • problem │   │
│  │ • solved │  │ • diff   │  │ • probs  │  │ • code    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Authentication Flow

```
┌────────┐          ┌──────────┐          ┌─────────┐          ┌──────────┐
│ User   │          │ Frontend │          │ Backend │          │ MongoDB  │
└───┬────┘          └────┬─────┘          └────┬────┘          └────┬─────┘
    │                    │                     │                     │
    │ Enter credentials  │                     │                     │
    │──────────────────→ │                     │                     │
    │                    │                     │                     │
    │                    │ POST /api/auth/login│                     │
    │                    │────────────────────→│                     │
    │                    │                     │                     │
    │                    │                     │ Verify credentials  │
    │                    │                     │────────────────────→│
    │                    │                     │                     │
    │                    │                     │ User data           │
    │                    │                     │←────────────────────│
    │                    │                     │                     │
    │                    │                     │ Generate JWT        │
    │                    │                     │─────────┐           │
    │                    │                     │         │           │
    │                    │                     │←────────┘           │
    │                    │                     │                     │
    │                    │ JWT Token + User    │                     │
    │                    │←────────────────────│                     │
    │                    │                     │                     │
    │                    │ Store in localStorage│                    │
    │                    │──────────┐          │                     │
    │                    │          │          │                     │
    │                    │←─────────┘          │                     │
    │                    │                     │                     │
    │ Redirect to Dashboard                    │                     │
    │←───────────────────│                     │                     │
```

### 2. Problem Browsing Flow

```
┌────────┐          ┌──────────┐          ┌─────────┐          ┌──────────┐
│ User   │          │ Frontend │          │ Backend │          │ MongoDB  │
└───┬────┘          └────┬─────┘          └────┬────┘          └────┬─────┘
    │                    │                     │                     │
    │ Visit /problems    │                     │                     │
    │──────────────────→ │                     │                     │
    │                    │                     │                     │
    │                    │ GET /api/problems   │                     │
    │                    │────────────────────→│                     │
    │                    │                     │                     │
    │                    │                     │ Query problems      │
    │                    │                     │────────────────────→│
    │                    │                     │                     │
    │                    │                     │ Problem list        │
    │                    │                     │←────────────────────│
    │                    │                     │                     │
    │                    │ Problems array      │                     │
    │                    │←────────────────────│                     │
    │                    │                     │                     │
    │                    │ Render problem cards│                     │
    │                    │──────────┐          │                     │
    │                    │          │          │                     │
    │                    │←─────────┘          │                     │
    │                    │                     │                     │
    │ View problems      │                     │                     │
    │←───────────────────│                     │                     │
    │                    │                     │                     │
    │ Apply filters      │                     │                     │
    │──────────────────→ │                     │                     │
    │                    │                     │                     │
    │                    │ GET /api/problems?  │                     │
    │                    │ difficulty=Medium   │                     │
    │                    │────────────────────→│                     │
    │                    │                     │                     │
    │                    │                     │ Filtered query      │
    │                    │                     │────────────────────→│
    │                    │                     │                     │
    │                    │ Filtered results    │                     │
    │                    │←────────────────────│                     │
    │                    │                     │                     │
    │ Updated list       │                     │                     │
    │←───────────────────│                     │                     │
```

### 3. Code Submission Flow

```
┌────────┐          ┌──────────┐          ┌─────────┐          ┌──────────┐
│ User   │          │ Frontend │          │ Backend │          │ MongoDB  │
└───┬────┘          └────┬─────┘          └────┬────┘          └────┬─────┘
    │                    │                     │                     │
    │ Write code in editor                     │                     │
    │──────────────────→ │                     │                     │
    │                    │                     │                     │
    │ Click Submit       │                     │                     │
    │──────────────────→ │                     │                     │
    │                    │                     │                     │
    │                    │ POST /api/submissions│                    │
    │                    │ + JWT Token         │                     │
    │                    │────────────────────→│                     │
    │                    │                     │                     │
    │                    │                     │ Verify JWT          │
    │                    │                     │─────────┐           │
    │                    │                     │         │           │
    │                    │                     │←────────┘           │
    │                    │                     │                     │
    │                    │                     │ Run test cases      │
    │                    │                     │─────────┐           │
    │                    │                     │         │           │
    │                    │                     │←────────┘           │
    │                    │                     │                     │
    │                    │                     │ Save submission     │
    │                    │                     │────────────────────→│
    │                    │                     │                     │
    │                    │                     │ Update problem stats│
    │                    │                     │────────────────────→│
    │                    │                     │                     │
    │                    │                     │ Update user progress│
    │                    │                     │────────────────────→│
    │                    │                     │                     │
    │                    │ Submission result   │                     │
    │                    │←────────────────────│                     │
    │                    │                     │                     │
    │                    │ Show results        │                     │
    │                    │──────────┐          │                     │
    │                    │          │          │                     │
    │                    │←─────────┘          │                     │
    │                    │                     │                     │
    │ View result        │                     │                     │
    │←───────────────────│                     │                     │
```

---

## Technology Stack Details

### Frontend Stack
```
┌─────────────────────────────────────────┐
│           React 18                      │
│  • Component-based architecture         │
│  • Hooks for state management           │
│  • Context API for global state         │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐    ┌───▼───┐    ┌───▼────┐
│ Vite  │    │Tailwind│   │ Router │
│       │    │  CSS   │    │        │
│• Fast │    │• Utility│   │• Routes│
│• HMR  │    │• Custom│   │• Links │
└───────┘    └────────┘    └────────┘
```

### Backend Stack
```
┌─────────────────────────────────────────┐
│           Node.js + Express             │
│  • RESTful API design                   │
│  • Middleware pattern                   │
│  • Async/await                          │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────────┐
    │             │                 │
┌───▼────┐   ┌───▼────┐      ┌────▼────┐
│Mongoose│   │  JWT   │      │bcryptjs │
│        │   │        │      │         │
│• ODM   │   │• Auth  │      │• Hash   │
│• Schema│   │• Token │      │• Verify │
└────────┘   └────────┘      └─────────┘
```

### Database Structure
```
MongoDB Collections:
├── users
│   ├── _id (ObjectId)
│   ├── username (String, unique)
│   ├── email (String, unique)
│   ├── password (String, hashed)
│   ├── avatar (String)
│   ├── solvedProblems ([ObjectId])
│   └── submissions ([ObjectId])
│
├── problems
│   ├── _id (ObjectId)
│   ├── title (String)
│   ├── slug (String, unique)
│   ├── description (String)
│   ├── difficulty (Enum)
│   ├── category (String)
│   ├── tags ([String])
│   ├── companies ([ObjectId])
│   ├── examples ([Object])
│   ├── constraints ([String])
│   ├── starterCode (Object)
│   └── testCases ([Object])
│
├── companies
│   ├── _id (ObjectId)
│   ├── name (String, unique)
│   ├── slug (String, unique)
│   ├── logo (String)
│   └── problems ([ObjectId])
│
└── submissions
    ├── _id (ObjectId)
    ├── user (ObjectId)
    ├── problem (ObjectId)
    ├── code (String)
    ├── language (String)
    ├── status (Enum)
    ├── runtime (String)
    ├── memory (String)
    └── submittedAt (Date)
```

---

## Deployment Architecture

```
┌───────────────────────────────────────────────────────────┐
│                    Production Setup                        │
└───────────────────────────────────────────────────────────┘

┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│   Vercel    │        │   Render    │        │  MongoDB    │
│  (Frontend) │───────→│  (Backend)  │───────→│   Atlas     │
│             │  HTTPS │             │  HTTPS │  (Database) │
│ • React app │        │ • Node.js   │        │             │
│ • CDN       │        │ • Express   │        │ • Replica   │
│ • SSL       │        │ • API       │        │ • Backup    │
└─────────────┘        └─────────────┘        └─────────────┘
      │                      │                       │
      │                      │                       │
      └──────────────────────┴───────────────────────┘
                             │
                    Global Distribution
                             │
                    ┌────────▼────────┐
                    │      Users      │
                    │  (Worldwide)    │
                    └─────────────────┘
```

---

## Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Security Layers                        │
└──────────────────────────────────────────────────────────┘

Frontend:
├── HTTPS Only
├── JWT Token Storage (localStorage)
├── Protected Routes (AuthContext)
├── Input Validation
└── XSS Prevention (React default)

Backend:
├── CORS Configuration
├── JWT Verification Middleware
├── Password Hashing (bcryptjs)
├── Environment Variables
├── Rate Limiting (future)
└── Input Sanitization (future)

Database:
├── MongoDB Atlas Security
├── Network Whitelist
├── Database User Permissions
├── Encrypted Connections
└── Regular Backups
```

---

## Component Hierarchy

```
App
├── ThemeProvider
│   └── AuthProvider
│       └── Router
│           ├── Navbar
│           │   ├── Logo
│           │   ├── Navigation Links
│           │   ├── Theme Toggle
│           │   └── User Menu
│           │
│           └── Routes
│               ├── Home
│               │   ├── Hero Section
│               │   ├── Features Grid
│               │   ├── Stats Cards
│               │   └── CTA Section
│               │
│               ├── ProblemsPage
│               │   ├── Search Bar
│               │   ├── Filters
│               │   └── ProblemCard[]
│               │
│               ├── ProblemDetail
│               │   ├── Description Panel
│               │   │   ├── Header
│               │   │   ├── Tabs
│               │   │   └── Content
│               │   └── Editor Panel
│               │       ├── Language Selector
│               │       ├── Monaco Editor
│               │       └── Submit Button
│               │
│               ├── CompaniesPage
│               │   ├── Search
│               │   └── CompanyCard[]
│               │
│               ├── Dashboard
│               │   ├── StatCard[]
│               │   ├── Progress Charts
│               │   └── Recent Problems
│               │
│               ├── Login
│               │   └── Login Form
│               │
│               └── Register
│                   └── Register Form
```

---

This architecture provides a scalable, maintainable, and secure foundation for the DSA platform!
