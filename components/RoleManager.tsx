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
import { Trash2, Briefcase } from 'lucide-react';

interface RoleManagerProps {
  className?: string;
}

export default function RoleManager({ className }: RoleManagerProps) {
  const { roles, addRole, deleteRole, employees } = useStore();
  const [mounted, setMounted] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoleName.trim()) {
      addRole(newRoleName.trim(), newRoleDescription.trim() || undefined);
      setNewRoleName('');
      setNewRoleDescription('');
      setIsAdding(false);
    }
  };

  const handleDeleteRole = (id: string, name: string) => {
    const employeesWithRole = employees.filter(emp => emp.role === name);
    if (employeesWithRole.length > 0) {
      if (confirm(`This will affect ${employeesWithRole.length} employee(s) with role ${name}. Are you sure?`)) {
        deleteRole(id);
      }
    } else {
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        deleteRole(id);
      }
    }
  };

  const getEmployeeCount = (roleName: string) => {
    return employees.filter(emp => emp.role === roleName).length;
  };

  const totalPages = Math.ceil(roles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRoles = roles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (!mounted) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Role Manager
          </CardTitle>
          <Button
            variant={isAdding ? "outline" : "default"}
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Cancel" : "Add Role"}
          </Button>
        </div>
        <CardDescription>
          Create and manage employee roles
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-auto">
        {/* Add Form */}
        {isAdding && (
          <form
            onSubmit={handleAddRole}
            className="mb-6 p-4 bg-muted rounded-lg space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name *</Label>
              <Input
                type="text"
                id="roleName"
                required
                placeholder="e.g., Manager, Developer, Designer"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description (Optional)</Label>
              <Input
                type="text"
                id="roleDescription"
                placeholder="e.g., Team Lead"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Role
            </Button>
          </form>
        )}

        {/* Role List */}
        {roles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No roles created yet.</p>
            <p className="text-sm mt-1">
              Create roles to assign to employees.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedRoles.map((role) => {
                const employeeCount = getEmployeeCount(role.name);
                return (
                  <div
                    key={role.id}
                    className="flex items-center justify-between p-4 bg-muted border-primary rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{role.name}</h4>
                      {role.description && (
                        <p className="text-sm text-muted-foreground">
                          {role.description}
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
                      onClick={() => handleDeleteRole(role.id, role.name)}
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
