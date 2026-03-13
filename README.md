# Staff Hub - Staff Directory Application

A modern staff directory web application built with Next.js, featuring employee management, grade levels, and persistent state storage.

## Overview

Staff Hub is a comprehensive staff directory application that allows organizations to manage their employees effectively. It provides a clean, responsive interface for viewing, adding, editing, and deleting employee records, with support for grade level management and filtering capabilities.

## Tech Stack & Approach

### Framework
- **Next.js 16** - React framework with App Router for modern server-side rendering and optimized performance

### Language
- **TypeScript** - Full type safety throughout the application

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives
- **Lucide React** - Icon library

### State Management
- **Zustand** - Lightweight state management with built-in persistence middleware
- **Local Storage** - Data persisted across browser sessions

### Data Source
- **World Cities API** - https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json

### Architecture

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx          # Main page entry
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── forms/           # Form components
│   ├── AddEmployeeDialog.tsx
│   ├── AppContent.tsx
│   ├── EmployeeList.tsx
│   ├── EmployeeProfile.tsx
│   ├── GradeLevelManager.tsx
│   ├── GradeLevelSheet.tsx
│   └── Header.tsx
├── hooks/                # Custom React hooks
│   └── use-mobile.ts
├── lib/                  # Utility functions
│   ├── api.ts           # API handling
│   └── utils.ts         # Helper functions
├── store/                # State management
│   └── useStore.ts      # Zustand store
└── types/                # TypeScript types
    └── index.ts
```

## Features Implemented

### Core Employee Management
- ✅ View all employees in a responsive list/table
- ✅ Add new employee with full details
- ✅ Edit existing employee information
- ✅ View individual employee profile
- ✅ Delete employee with confirmation

### Employee Data Model
Each employee has:
- Name
- Country (fetched from world cities API)
- State/Region
- Address
- Role
- Department
- Grade Level (assignable)
- Created/Updated timestamps

### Grade Level Management
- ✅ Create new grade levels (e.g., LVL1, LVL2, LVL3)
- ✅ Delete grade levels
- ✅ Assign employees to grade levels
- ✅ Automatic unassign when grade level is deleted

### Filtering & Search
- ✅ Filter employees by name
- ✅ Filter employees by grade level
- ✅ Combined search and filter

### Data Persistence
- ✅ All employee data persisted to localStorage
- ✅ All grade levels persisted to localStorage
- ✅ State survives browser refresh

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:peterchijioke/staff-hub.git
cd staff-hub
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create environment file (optional - defaults provided):
```bash
# Create .env.local with the following:
API_URL=https://pkgstore.datahub.io
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Usage Guide

### Adding an Employee
1. Click the "Add Employee" button in the header
2. Fill in the employee details (name, country, state, address, role, department)
3. Optionally assign a grade level
4. Click "Save" to create the employee

### Managing Grade Levels
1. Click "Manage Grades" in the header
2. Add new grade levels with name and optional description
3. Delete unused grade levels
4. Employees assigned to deleted grades will be automatically unassigned

### Viewing/Editing Employees
- Click on any employee row to view their profile
- Use the "Edit" button to modify employee details
- Use the "Delete" button to remove an employee

### Filtering
- Use the search bar to filter by name, role, or department
- Use the grade level dropdown to filter by specific grade

## Project Structure Details

### State Management (Zustand)
The [`useStore.ts`](store/useStore.ts) file contains:
- Employee CRUD operations
- Grade level management
- Search and filter state
- Local storage persistence configuration

### API Handling ([`lib/api.ts`](lib/api.ts))
- Fetches cities from the world-cities API
- Extracts unique countries
- Generates state-by-country mapping
- Caches data with 1-hour revalidation

### Types ([`types/index.ts`](types/index.ts))
- `Employee` - Employee data model
- `GradeLevel` - Grade level data model
- `City` - City data from API
- `ViewMode` - Application view states

## License

MIT License
