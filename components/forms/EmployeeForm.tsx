'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { getStates } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EmployeeFormProps {
  isEdit?: boolean;
  countries: string[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EmployeeForm({ 
  isEdit = false, 
  countries, 
  onSuccess, 
  onCancel 
}: EmployeeFormProps) {
  const { addEmployee, updateEmployee, selectedEmployeeId, getEmployeeById, gradeLevels, assignGradeLevel } = useStore();
  const [states, setStates] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    state: '',
    address: '',
    role: '',
    department: '',
    gradeLevelId: '',
  });

  if (isEdit && selectedEmployeeId && formData.country === '') {
    const employee = getEmployeeById(selectedEmployeeId);
    if (employee) {
      formData.name = employee.name;
      formData.country = employee.country;
      formData.state = employee.state;
      formData.address = employee.address;
      formData.role = employee.role;
      formData.department = employee.department;
      formData.gradeLevelId = employee.gradeLevelId || '';
      const countryStates = getStates(employee.country);
      setStates(countryStates);
    }
  }

  const handleCountryChange = (country: string) => {
    setFormData({ ...formData, country, state: '' });
    const countryStates = getStates(country);
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
    
    onSuccess?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            type="text"
            id="name"
            required
            className="h-10"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country || '__empty__'}
            onValueChange={(value) => value !== '__empty__' && handleCountryChange(value)}
          >
            <SelectTrigger className="w-full" >
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__empty__">Select Country</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State/Province *</Label>
          <Select
            value={formData.state || '__empty__'}
            onValueChange={(value) => value !== '__empty__' && setFormData({ ...formData, state: value })}
            disabled={!formData.country}
          >
            <SelectTrigger className="w-full" style={{ height: '2.5rem' }}>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__empty__">Select State</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            type="text"
            id="address"
            required
            className="h-10"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Input
            type="text"
            id="role"
            required
            className="h-10"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Enter role"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Input
            type="text"
            id="department"
            required
            className="h-10"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Enter department"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="gradeLevel">Grade Level (Optional)</Label>
          <Select
            value={formData.gradeLevelId || '__empty__'}
            onValueChange={(value) => setFormData({ ...formData, gradeLevelId: value === '__empty__' ? '' : value })}
          >
            <SelectTrigger className="w-full" style={{ height: '2.5rem' }}>
              <SelectValue placeholder="Select Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__empty__">No Grade Level</SelectItem>
              {gradeLevels.map((gl) => (
                <SelectItem key={gl.id} value={gl.id}>
                  {gl.name} {gl.description ? `- ${gl.description}` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1">
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
