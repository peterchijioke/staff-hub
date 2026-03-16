'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import RoleManager from "@/components/RoleManager";

interface RoleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RoleSheet({ open, onOpenChange }: RoleSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden" aria-label="Roles">
          <Briefcase className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Role Manager</SheetTitle>
          <SheetDescription>
            Create and manage employee roles
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto -mx-6 px-6 pb-6 mt-4">
          <RoleManager className="border-0 shadow-none rounded-none" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
