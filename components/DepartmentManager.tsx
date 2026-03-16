'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface DepartmentManagerProps {
  className?: string;
}

export default function DepartmentManager({ className }: DepartmentManagerProps) {
  const { departments, addDepartment, deleteDepartment, employees } = useStore();
  const [mounted, setMounted] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptDescription, setNewDeptDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDeptName.trim()) {
      addDepartment(newDeptName.trim(), newDeptDescription.trim() || undefined);
      setNewDeptName('');
      setNewDeptDescription('');
      setIsAdding(false);
    }
  };

  const handleDeleteDepartment = (id: string, name: string) => {
    const employeesWithDept = employees.filter(emp => emp.department === name);
    if (employeesWithDept.length > 0) {
      if (confirm(`This will affect ${employeesWithDept.length} employee(s) in ${name}. Are you sure?`)) {
        deleteDepartment(id);
      }
    } else {
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        deleteDepartment(id);
      }
    }
  };

  const getEmployeeCount = (deptName: string) => {
    return employees.filter(emp => emp.department === deptName).length;
  };

  const totalPages = Math.ceil(departments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDepartments = departments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (!mounted) {
    return null;
  }

  return (
    <Card className={`${className} h-full`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Department Manager</CardTitle>
          <Button
            variant={isAdding ? "outline" : "default"}
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Cancel" : "Add Department"}
          </Button>
        </div>
        <CardDescription>
          Create and manage departments
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-auto">
        {/* Add Form */}
        {isAdding && (
          <form
            onSubmit={handleAddDepartment}
            className="mb-6 p-4 bg-muted rounded-lg space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="deptName">Department Name *</Label>
              <Input
                type="text"
                id="deptName"
                required
                placeholder="e.g., Engineering, HR, Sales"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deptDescription">Description (Optional)</Label>
              <Input
                type="text"
                id="deptDescription"
                placeholder="e.g., Software Development Team"
                value={newDeptDescription}
                onChange={(e) => setNewDeptDescription(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Department
            </Button>
          </form>
        )}

        {/* Department List */}
        {departments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No departments created yet.</p>
            <p className="text-sm mt-1">
              Create departments to assign to employees.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedDepartments.map((dept) => {
                const employeeCount = getEmployeeCount(dept.name);
                return (
                  <div
                    key={dept.id}
                    className="flex items-center justify-between p-4 bg-muted border-primary rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{dept.name}</h4>
                      {dept.description && (
                        <p className="text-sm text-muted-foreground">
                          {dept.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {employeeCount} employee{employeeCount !== 1 ? "s" : ""}{" "}
                        assigned
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteDepartment(dept.id, dept.name)}
                      className="text-destructive hover:text-destructive"
                    >
                     <Trash2/>
                    </Button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Pagination - always rendered to prevent layout jump */}
        <div className="flex-shrink-0 flex items-center justify-center gap-2 pt-4 border-t mt-auto">
          {totalPages > 1 ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </>
          ) : (
            <span className="h-6" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
