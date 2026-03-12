'use client';

import { useStore } from '@/store/useStore';
import EmployeeList from '@/components/EmployeeList';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeProfile from '@/components/EmployeeProfile';
import GradeLevelManager from '@/components/GradeLevelManager';

export default function Home() {
  const { viewMode, setViewMode } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Staff Hub</h1>
            <nav className="flex gap-4">
              {viewMode === 'list' && (
                <button
                  onClick={() => setViewMode('add')}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Employee
                </button>
              )}
              {viewMode !== 'list' && (
                <button
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to List
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {viewMode === 'list' && <EmployeeList />}
            {viewMode === 'add' && <EmployeeForm isEdit={false} />}
            {viewMode === 'edit' && <EmployeeForm isEdit={true} />}
            {viewMode === 'profile' && <EmployeeProfile />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <GradeLevelManager />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
