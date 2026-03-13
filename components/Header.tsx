'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import GradeLevelSheet from '@/components/GradeLevelSheet';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';
import { useStore } from '@/store/useStore';


export default function Header() {
  const [isGradeLevelSheetOpen, setIsGradeLevelSheetOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <img src="/logo.png" alt="Staff Hub Logo" className="h-20 w-auto" />
          <div className="flex items-center gap-2">
            <GradeLevelSheet 
              open={isGradeLevelSheetOpen} 
              onOpenChange={setIsGradeLevelSheetOpen} 
            />
            <AddEmployeeDialog 
              open={isAddDialogOpen} 
              onOpenChange={setIsAddDialogOpen} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
