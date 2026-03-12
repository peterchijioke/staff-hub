export interface GradeLevel {
  id: string;
  name: string;
  description?: string;
}

export interface Employee {
  id: string;
  name: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevelId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  name: string;
  country: string;
  subcountry?: string;
}

export type ViewMode = 'list' | 'add' | 'edit' | 'profile';
