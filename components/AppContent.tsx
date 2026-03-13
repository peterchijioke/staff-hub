'use client';

import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import EmployeeList from '@/components/EmployeeList';
import EmployeeForm from '@/components/forms/EmployeeForm';
import EmployeeProfile from '@/components/EmployeeProfile';
import GradeLevelManager from '@/components/GradeLevelManager';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface AppContentProps {
  countries: string[];
}

export default function AppContent({ countries }: AppContentProps) {
  const { viewMode, setViewMode, selectedEmployeeId } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isGradeLevelSheetOpen, setIsGradeLevelSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (viewMode === 'edit' && selectedEmployeeId) {
      setIsEditDialogOpen(true);
    }
  }, [viewMode, selectedEmployeeId]);

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setViewMode('list');
  };

  const handleEditDialogOpenChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setViewMode('list');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Staff Hub</h1>
            <div className="flex items-center gap-2">
              <Sheet open={isGradeLevelSheetOpen} onOpenChange={setIsGradeLevelSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    Grade Levels
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col">
                  <SheetHeader className="flex-shrink-0">
                    <SheetTitle>Grade Level Manager</SheetTitle>
                    <SheetDescription>
                      Create and manage grade levels for employees
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto -mx-6 px-6 pb-6 mt-4">
                    <GradeLevelManager className="border-0 shadow-none rounded-none" />
                  </div>
                </SheetContent>
              </Sheet>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Employee</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                      Fill in the employee details below.
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm 
                    isEdit={false} 
                    countries={countries} 
                    onSuccess={handleAddSuccess}
                    onCancel={() => setIsAddDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {viewMode === 'list' && <EmployeeList />}
            {viewMode === 'profile' && (
              <>
                <EmployeeList />
                <EmployeeProfile />
              </>
            )}
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <GradeLevelManager />
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogOpenChange}>
        <DialogContent className="sm:max-w-[600px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee information below.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm 
            isEdit={true} 
            countries={countries}
            onSuccess={handleEditSuccess}
            onCancel={() => {
              setIsEditDialogOpen(false);
              setViewMode('list');
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
