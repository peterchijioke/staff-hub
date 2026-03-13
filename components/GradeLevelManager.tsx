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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface GradeLevelManagerProps {
  className?: string;
}

export default function GradeLevelManager({ className }: GradeLevelManagerProps) {
  const { gradeLevels, addGradeLevel, deleteGradeLevel, employees } = useStore();
  const [mounted, setMounted] = useState(false);
  const [newGradeName, setNewGradeName] = useState('');
  const [newGradeDescription, setNewGradeDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const totalPages = Math.ceil(gradeLevels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGradeLevels = gradeLevels.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (!mounted) {
    return null;
  }

  return (
    <Card className={`${className} h-full md:h-187.5`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Grade Level Manager</CardTitle>
          <Button
            variant={isAdding ? "outline" : "default"}
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Cancel" : "Add Grade Level"}
          </Button>
        </div>
        <CardDescription>
          Create and manage grade levels for employees
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-auto">
        {/* Add Form */}
        {isAdding && (
          <form
            onSubmit={handleAddGradeLevel}
            className="mb-6 p-4 bg-muted rounded-lg space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="gradeName">Grade Level Name *</Label>
              <Input
                type="text"
                id="gradeName"
                required
                placeholder="e.g., LVL1, LVL2, SENIOR"
                value={newGradeName}
                onChange={(e) => setNewGradeName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradeDescription">Description (Optional)</Label>
              <Input
                type="text"
                id="gradeDescription"
                placeholder="e.g., Entry Level"
                value={newGradeDescription}
                onChange={(e) => setNewGradeDescription(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Grade Level
            </Button>
          </form>
        )}

        {/* Grade Level List */}
        {gradeLevels.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No grade levels created yet.</p>
            <p className="text-sm mt-1">
              Create grade levels to assign to employees.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedGradeLevels.map((gl) => {
                const employeeCount = getEmployeeCount(gl.id);
                return (
                  <div
                    key={gl.id}
                    className="flex items-center justify-between p-4 bg-muted border-primary rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{gl.name}</h4>
                      {gl.description && (
                        <p className="text-sm text-muted-foreground">
                          {gl.description}
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
                      onClick={() => handleDeleteGradeLevel(gl.id, gl.name)}
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
