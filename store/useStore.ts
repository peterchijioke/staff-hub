import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Employee, GradeLevel, ViewMode } from '@/types';

interface StoreState {
  employees: Employee[];
  gradeLevels: GradeLevel[];
  selectedEmployeeId: string | null;
  viewMode: ViewMode;
  searchQuery: string;
  filterGradeLevelId: string | null;
  
  // Employee actions
  addEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  selectEmployee: (id: string | null) => void;
  
  // Grade level actions
  addGradeLevel: (name: string, description?: string) => void;
  deleteGradeLevel: (id: string) => void;
  assignGradeLevel: (employeeId: string, gradeLevelId: string | null) => void;
  
  // UI actions
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterGradeLevelId: (id: string | null) => void;
  
  // Computed
  getFilteredEmployees: () => Employee[];
  getEmployeeById: (id: string) => Employee | undefined;
  getGradeLevelById: (id: string) => GradeLevel | undefined;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      employees: [],
      gradeLevels: [],
      selectedEmployeeId: null,
      viewMode: 'list',
      searchQuery: '',
      filterGradeLevelId: null,

      addEmployee: (employee) => {
        const newEmployee: Employee = {
          ...employee,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          employees: [...state.employees, newEmployee],
        }));
      },

      updateEmployee: (id, employeeUpdate) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id
              ? { ...emp, ...employeeUpdate, updatedAt: new Date().toISOString() }
              : emp
          ),
        }));
      },

      deleteEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
          selectedEmployeeId: state.selectedEmployeeId === id ? null : state.selectedEmployeeId,
          viewMode: state.selectedEmployeeId === id ? 'list' : state.viewMode,
        }));
      },

      selectEmployee: (id) => {
        set({ selectedEmployeeId: id });
      },

      addGradeLevel: (name, description) => {
        const newGradeLevel: GradeLevel = {
          id: uuidv4(),
          name,
          description,
        };
        set((state) => ({
          gradeLevels: [...state.gradeLevels, newGradeLevel],
        }));
      },

      deleteGradeLevel: (id) => {
        set((state) => ({
          gradeLevels: state.gradeLevels.filter((gl) => gl.id !== id),
          employees: state.employees.map((emp) =>
            emp.gradeLevelId === id ? { ...emp, gradeLevelId: null } : emp
          ),
          filterGradeLevelId: state.filterGradeLevelId === id ? null : state.filterGradeLevelId,
        }));
      },

      assignGradeLevel: (employeeId, gradeLevelId) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === employeeId
              ? { ...emp, gradeLevelId, updatedAt: new Date().toISOString() }
              : emp
          ),
        }));
      },

      setViewMode: (mode) => {
        set({ viewMode: mode });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setFilterGradeLevelId: (id) => {
        set({ filterGradeLevelId: id });
      },

      getFilteredEmployees: () => {
        const { employees, searchQuery, filterGradeLevelId } = get();
        return employees.filter((emp) => {
          const matchesSearch =
            searchQuery === '' ||
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesGradeLevel =
            filterGradeLevelId === null ||
            emp.gradeLevelId === filterGradeLevelId;
          
          return matchesSearch && matchesGradeLevel;
        });
      },

      getEmployeeById: (id) => {
        return get().employees.find((emp) => emp.id === id);
      },

      getGradeLevelById: (id) => {
        return get().gradeLevels.find((gl) => gl.id === id);
      },
    }),
    {
      name: 'staff-hub-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
