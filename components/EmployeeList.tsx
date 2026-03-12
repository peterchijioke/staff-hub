'use client';

import { useStore } from '@/store/useStore';
import { Employee } from '@/types';

export default function EmployeeList() {
  const { 
    getFilteredEmployees, 
    selectEmployee, 
    setViewMode, 
    deleteEmployee,
    gradeLevels,
    filterGradeLevelId,
    setFilterGradeLevelId,
    searchQuery,
    setSearchQuery
  } = useStore();
  
  const employees = getFilteredEmployees();

  const handleViewProfile = (id: string) => {
    selectEmployee(id);
    setViewMode('profile');
  };

  const handleEdit = (id: string) => {
    selectEmployee(id);
    setViewMode('edit');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={filterGradeLevelId || ''}
            onChange={(e) => setFilterGradeLevelId(e.target.value || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Grade Levels</option>
            {gradeLevels.map((gl) => (
              <option key={gl.id} value={gl.id}>
                {gl.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Count */}
      <div className="text-sm text-gray-600">
        Showing {employees.length} employee{employees.length !== 1 ? 's' : ''}
      </div>

      {/* Employee Grid */}
      {employees.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No employees found.</p>
          <p className="mt-2">Click "Add Employee" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onView={handleViewProfile}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface EmployeeCardProps {
  employee: Employee;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

function EmployeeCard({ employee, onView, onEdit, onDelete }: EmployeeCardProps) {
  const { getGradeLevelById } = useStore();
  const gradeLevel = employee.gradeLevelId ? getGradeLevelById(employee.gradeLevelId) : null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.role}</p>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>
        {gradeLevel && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {gradeLevel.name}
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {employee.state}, {employee.country}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView(employee.id)}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(employee.id)}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(employee.id, employee.name)}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
