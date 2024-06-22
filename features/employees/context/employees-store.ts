import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IEmployee, ICreateEmployee, IUpdateEmployee } from '../models/IEmployee'
import { EmployeesDatasourceImpl } from '../services/datasource'

interface StoreState {
  employees: IEmployee[]
  setEmployees: (employees: IEmployee[]) => void
  getAllEmployees: () => Promise<void>
  deleteEmployee: (id: number) => Promise<void>
  createEmployee: (employee: ICreateEmployee, moduleId: number[]) => Promise<void>
  updateEmployee: (id: number, employee: IUpdateEmployee, moduleId: number[]) => Promise<void>
  getPermissions: (id: number) => Promise<number[]>
  assignPermissions: (id: number, moduleId: number[]) => Promise<boolean>
}

const DEFAULT_EMPLOYEES: IEmployee[] = []

const STORE_NAME = 'employees'

export const useEmployeesStore = create<StoreState>(
  persist(
    (set, get) => ({
      employees: DEFAULT_EMPLOYEES,
      setEmployees: (employees: IEmployee[]) => {
        set({ employees })
      },
      getAllEmployees: async () => {
        const employees = await EmployeesDatasourceImpl.getInstance().getAll()
        set({ employees })
      },
      deleteEmployee: async (id: number) => {
        const isDeleted = await EmployeesDatasourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllEmployees()
        }
      },
      createEmployee: async (employee: ICreateEmployee, moduleId: number[]) => {
        await EmployeesDatasourceImpl.getInstance()
          .create(employee)
          .then(async (response) => {
            const { id } = response
            await EmployeesDatasourceImpl.getInstance().assignPermissions(id, moduleId)
          })
      },
      updateEmployee: async (id: number, employee: IUpdateEmployee, moduleId: number[]) => {
        await EmployeesDatasourceImpl.getInstance().update(id, employee)
        await EmployeesDatasourceImpl.getInstance().assignPermissions(id, moduleId)
      },
      getPermissions: async (id: number) => {
        return await EmployeesDatasourceImpl.getInstance().getPermissions(id)
      },
      assignPermissions: async (id: number, moduleId: number[]) => {
        return await EmployeesDatasourceImpl.getInstance().assignPermissions(id, moduleId)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
