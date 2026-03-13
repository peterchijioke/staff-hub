'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import GradeLevelManager from '@/components/GradeLevelManager';
import EmployeeForm from '@/components/forms/EmployeeForm';

interface HeaderProps {
  countries: string[];
}

export default function Header({ countries }: HeaderProps) {
  // We need these state values to be managed here since Sheet and Dialog need client-side state
  // However, to make this a server component pattern, we could pass callbacks from parent
  // For now, keeping it as 'use client' for the interactive elements
  
  // Using inline handlers for simplicity - in a full implementation, 
  // you might want to lift state up or use a more sophisticated pattern
  const [isGradeLevelSheetOpen, setIsGradeLevelSheetOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Staff Hub</h1>
          <div className="flex items-center gap-2">
            {/* Mobile Grade Level Button */}
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
                  onSuccess={() => setIsAddDialogOpen(false)}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
