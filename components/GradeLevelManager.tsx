'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function GradeLevelManager() {
  const { gradeLevels, addGradeLevel, deleteGradeLevel, employees } = useStore();
  const [newGradeName, setNewGradeName] = useState('');
  const [newGradeDescription, setNewGradeDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddGradeLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGradeName.trim()) {
      addGradeLevel(newGradeName.trim(), newGradeDescription.trim() || undefined);
      setNewGradeName('');
      setNewGradeDescription('');
      setIsAdding(false);
    }
  };

  const handleDeleteGradeLevel = (id: string, name: string) => {
    const employeesWithGrade = employees.filter(emp => emp.gradeLevelId === id);
    if (employeesWithGrade.length > 0) {
      if (confirm(`This will remove ${employeesWithGrade.length} employee(s) from ${name}. Are you sure?`)) {
        deleteGradeLevel(id);
      }
    } else {
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        deleteGradeLevel(id);
      }
    }
  };

  const getEmployeeCount = (gradeLevelId: string) => {
    return employees.filter(emp => emp.gradeLevelId === gradeLevelId).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Grade Level Manager</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isAdding ? 'Cancel' : 'Add Grade Level'}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAddGradeLevel} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div>
              <label htmlFor="gradeName" className="block text-sm font-medium text-gray-700 mb-1">
                Grade Level Name *
              </label>
              <input
                type="text"
                id="gradeName"
                required
                placeholder="e.g., LVL1, LVL2, SENIOR"
                value={newGradeName}
                onChange={(e) => setNewGradeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="gradeDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                id="gradeDescription"
                placeholder="e.g., Entry Level"
                value={newGradeDescription}
                onChange={(e) => setNewGradeDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Grade Level
            </button>
          </div>
        </form>
      )}

      {/* Grade Level List */}
      {gradeLevels.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No grade levels created yet.</p>
          <p className="text-sm mt-1">Create grade levels to assign to employees.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {gradeLevels.map((gl) => {
            const employeeCount = getEmployeeCount(gl.id);
            return (
              <div
                key={gl.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{gl.name}</h4>
                  {gl.description && (
                    <p className="text-sm text-gray-500">{gl.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {employeeCount} employee{employeeCount !== 1 ? 's' : ''} assigned
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteGradeLevel(gl.id, gl.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Grade Level"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
