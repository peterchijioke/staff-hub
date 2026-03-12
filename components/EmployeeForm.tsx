'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { fetchCities, getUniqueCountries, getStatesByCountry } from '@/lib/api';
import { City } from '@/types';

interface EmployeeFormProps {
  isEdit?: boolean;
}

export default function EmployeeForm({ isEdit = false }: EmployeeFormProps) {
  const { addEmployee, updateEmployee, selectedEmployeeId, getEmployeeById, setViewMode, gradeLevels, assignGradeLevel } = useStore();
  
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    state: '',
    address: '',
    role: '',
    department: '',
    gradeLevelId: '',
  });

  useEffect(() => {
    async function loadCities() {
      const data = await fetchCities();
      setCities(data);
      setCountries(getUniqueCountries(data));
      setLoading(false);
    }
    loadCities();
  }, []);

  useEffect(() => {
    if (isEdit && selectedEmployeeId) {
      const employee = getEmployeeById(selectedEmployeeId);
      if (employee) {
        setFormData({
          name: employee.name,
          country: employee.country,
          state: employee.state,
          address: employee.address,
          role: employee.role,
          department: employee.department,
          gradeLevelId: employee.gradeLevelId || '',
        });
        // Load states for the selected country
        const countryStates = getStatesByCountry(cities, employee.country);
        setStates(countryStates);
      }
    }
  }, [isEdit, selectedEmployeeId, getEmployeeById, cities]);

  const handleCountryChange = (country: string) => {
    setFormData({ ...formData, country, state: '' });
    const countryStates = getStatesByCountry(cities, country);
    setStates(countryStates);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && selectedEmployeeId) {
      updateEmployee(selectedEmployeeId, {
        name: formData.name,
        country: formData.country,
        state: formData.state,
        address: formData.address,
        role: formData.role,
        department: formData.department,
      });
      if (formData.gradeLevelId) {
        assignGradeLevel(selectedEmployeeId, formData.gradeLevelId);
      } else {
        assignGradeLevel(selectedEmployeeId, null);
      }
    } else {
      addEmployee({
        name: formData.name,
        country: formData.country,
        state: formData.state,
        address: formData.address,
        role: formData.role,
        department: formData.department,
        gradeLevelId: formData.gradeLevelId || null,
      });
    }
    
    setViewMode('list');
  };

  const handleCancel = () => {
    setViewMode('list');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? 'Edit Employee' : 'Add New Employee'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              id="country"
              required
              value={formData.country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State/Province *
            </label>
            <select
              id="state"
              required
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <input
              type="text"
              id="role"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <input
              type="text"
              id="department"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Grade Level */}
          <div className="md:col-span-2">
            <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level (Optional)
            </label>
            <select
              id="gradeLevel"
              value={formData.gradeLevelId}
              onChange={(e) => setFormData({ ...formData, gradeLevelId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">No Grade Level</option>
              {gradeLevels.map((gl) => (
                <option key={gl.id} value={gl.id}>
                  {gl.name} {gl.description ? `- ${gl.description}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEdit ? 'Update Employee' : 'Add Employee'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
