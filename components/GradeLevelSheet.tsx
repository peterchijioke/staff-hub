'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import GradeLevelManager from "@/components/GradeLevelManager";

interface GradeLevelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GradeLevelSheet({ open, onOpenChange }: GradeLevelSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
  );
}
