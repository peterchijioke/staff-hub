'use client';

import { useStore } from '@/store/useStore';
import { Employee } from '@/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterGradeLevelId]);

  const employees = getFilteredEmployees();
  
  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6 flex flex-col h-full md:h-[85dvh]">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            className=' bg-white'
            placeholder="Search by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <Select
            value={filterGradeLevelId || '__empty__'}
            onValueChange={(value) => setFilterGradeLevelId(value === '__empty__' ? null : value)}
          >
            <SelectTrigger className=' bg-white'>
              <SelectValue placeholder="All Grade Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__empty__">All Grade Levels</SelectItem>
              {gradeLevels.map((gl) => (
                <SelectItem key={gl.id} value={gl.id}>
                  {gl.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Count */}
      <div className="text-sm text-muted-foreground">
        Showing {employees.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, employees.length)} of {employees.length} employee{employees.length !== 1 ? 's' : ''}
      </div>

      {/* Employee Grid */}
      {employees.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No employees found.</p>
          <p className="mt-2">Click "Add Employee" to get started.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onView={handleViewProfile}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {/* Placeholder cards to prevent layout jump when last page has fewer items */}
          {paginatedEmployees.length > 0 && paginatedEmployees.length < ITEMS_PER_PAGE &&
            Array.from({ length: ITEMS_PER_PAGE - paginatedEmployees.length }).map((_, index) => (
              <div key={`placeholder-${index}`} className="invisible" />
            ))}
          </div>
        </>
      )}

      {/* Pagination - always rendered with flex-shrink-0 to prevent layout jump */}
      <div className="flex-shrink-0 flex items-center justify-end gap-2 mt-auto py-4">
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
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
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
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{employee.name}</CardTitle>
            <CardDescription>{employee.role}</CardDescription>
          </div>
          {gradeLevel && (
            <Badge variant="secondary">{gradeLevel.name}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{employee.department}</p>
        <p className="text-sm mt-2">
          <span className="font-medium">Location:</span> {employee.state}, {employee.country}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(employee.id)}
          className="flex-1"
        >
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(employee.id)}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(employee.id, employee.name)}
          className="flex-1"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
