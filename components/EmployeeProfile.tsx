'use client';

import { useStore } from '@/store/useStore';

export default function EmployeeProfile() {
  const { selectedEmployeeId, getEmployeeById, setViewMode, deleteEmployee, gradeLevels, assignGradeLevel } = useStore();
  
  const employee = selectedEmployeeId ? getEmployeeById(selectedEmployeeId) : null;
  
  if (!employee) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Employee not found.</p>
        <button
          onClick={() => setViewMode('list')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to List
        </button>
      </div>
    );
  }

  const gradeLevel = employee.gradeLevelId ? gradeLevels.find(gl => gl.id === employee.gradeLevelId) : null;

  const handleEdit = () => {
    setViewMode('edit');
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      deleteEmployee(employee.id);
    }
  };

  const handleBack = () => {
    setViewMode('list');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to List
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{employee.name}</h2>
            <p className="text-lg text-gray-600 mt-1">{employee.role}</p>
            <p className="text-gray-500">{employee.department}</p>
          </div>
          {gradeLevel && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {gradeLevel.name}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Location</h3>
            <p className="mt-1 text-gray-900">{employee.address}</p>
            <p className="text-gray-600">{employee.state}, {employee.country}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Grade Level</h3>
            <div className="mt-2">
              {gradeLevels.length === 0 ? (
                <p className="text-gray-500 italic">No grade levels available. Create one in the Grade Level Manager.</p>
              ) : (
                <select
                  value={employee.gradeLevelId || ''}
                  onChange={(e) => assignGradeLevel(employee.id, e.target.value || null)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No Grade Level</option>
                  {gradeLevels.map((gl) => (
                    <option key={gl.id} value={gl.id}>
                      {gl.name} {gl.description ? `- ${gl.description}` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Created</h3>
              <p className="mt-1 text-gray-900">{new Date(employee.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Last Updated</h3>
              <p className="mt-1 text-gray-900">{new Date(employee.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleEdit}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Employee
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-6 py-3 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}
