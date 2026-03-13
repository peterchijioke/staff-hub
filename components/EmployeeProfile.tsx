'use client';

import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function EmployeeProfile() {
  const { selectedEmployeeId, getEmployeeById, setViewMode, deleteEmployee, gradeLevels, assignGradeLevel } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const employee = selectedEmployeeId ? getEmployeeById(selectedEmployeeId) : null;

  if (!mounted) {
    return null;
  }
  
  if (!employee) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Employee not found.</p>
        <Button
          onClick={() => setViewMode('list')}
          className="mt-4"
        >
          Back to List
        </Button>
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2 -ml-2">
              ← Back to List
            </Button>
            <CardTitle className="text-2xl">{employee.name}</CardTitle>
            <CardDescription className="text-base">{employee.role}</CardDescription>
            <p className="text-muted-foreground">{employee.department}</p>
          </div>
          {gradeLevel && (
            <Badge variant="secondary">{gradeLevel.name}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location</h3>
          <p className="mt-1">{employee.address}</p>
          <p className="text-muted-foreground">{employee.state}, {employee.country}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Grade Level</h3>
          <div className="mt-2">
            {gradeLevels.length === 0 ? (
              <p className="text-muted-foreground italic">No grade levels available. Create one in the Grade Level Manager.</p>
            ) : (
              <Select
                value={employee.gradeLevelId || '__empty__'}
                onValueChange={(value) => assignGradeLevel(employee.id, value === '__empty__' ? null : value)}
              >
                <SelectTrigger className="w-full md:w-[300px]">
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
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Created</h3>
            <p className="mt-1">{new Date(employee.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Last Updated</h3>
            <p className="mt-1">{new Date(employee.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button onClick={handleEdit} className="flex-1">
          Edit Employee
        </Button>
        <Button variant="destructive" onClick={handleDelete} className="flex-1">
          Delete Employee
        </Button>
      </CardFooter>
    </Card>
  );
}
