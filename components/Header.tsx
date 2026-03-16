'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Award, Plus } from 'lucide-react';
import GradeLevelSheet from '@/components/GradeLevelSheet';
import DepartmentSheet from '@/components/DepartmentSheet';
import RoleSheet from '@/components/RoleSheet';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';


export default function Header() {
  const [isGradeLevelSheetOpen, setIsGradeLevelSheetOpen] = useState(false);
  const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <img src="/logo.png" alt="Staff Hub Logo" className="h-10 md:h-16 w-auto" />
          <div className="flex items-center gap-2">
            <RoleSheet 
              open={isRoleSheetOpen} 
              onOpenChange={setIsRoleSheetOpen} 
            />
            <DepartmentSheet 
              open={isDepartmentSheetOpen} 
              onOpenChange={setIsDepartmentSheetOpen} 
            />
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
