'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import GradeLevelSheet from '@/components/GradeLevelSheet';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';

interface HeaderProps {
  countries: string[];
}

export default function Header({ countries }: HeaderProps) {
  const [isGradeLevelSheetOpen, setIsGradeLevelSheetOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Staff Hub</h1>
          <div className="flex items-center gap-2">
            <GradeLevelSheet 
              open={isGradeLevelSheetOpen} 
              onOpenChange={setIsGradeLevelSheetOpen} 
            />
            <AddEmployeeDialog 
              open={isAddDialogOpen} 
              onOpenChange={setIsAddDialogOpen} 
              countries={countries}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
