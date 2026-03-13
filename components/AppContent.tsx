'use client';
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import EmployeeList from '@/components/EmployeeList';
import EmployeeForm from '@/components/forms/EmployeeForm';
import EmployeeProfile from '@/components/EmployeeProfile';
import GradeLevelManager from '@/components/GradeLevelManager';
import Header from '@/components/Header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AppContentProps {
  countries: string[];
}

export default function AppContent({ countries }: AppContentProps) {
  const { viewMode, setViewMode, selectedEmployeeId } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  useEffect(() => {
    if (viewMode === 'edit' && selectedEmployeeId) {
      setIsEditDialogOpen(true);
    }
  }, [viewMode, selectedEmployeeId]);

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
      {/* Header */}
      <Header countries={countries} />

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

      {/* Edit Dialog */}
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
