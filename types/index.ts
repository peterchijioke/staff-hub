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



export type ViewMode = 'list' | 'add' | 'edit' | 'profile';
export type City = {
  country: string;
  geonameid: number;
  name: string;
  subcountry: string;
};