import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ICreateTask, ITask, IUpdateTask } from '../models/ITask'
import { TasksDataSourceImpl } from '../services/datasource'

interface StoreState {
  tasks: ITask[]
  setTasks: (tasks: ITask[]) => void
  getAllTasks: () => Promise<void>
  getTaskById: (id: number) => Promise<void>
  getAllTasksByEmployee: (id: number) => ITask[]
  getAllTasksByConsumer: (id: number) => ITask[]
  createTask: (task: ICreateTask) => Promise<void>
  updateTask: (id: number, task: IUpdateTask) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  addCommnet: (taskId: number, comment: string) => Promise<void>
}

const DEFAULT_TASKS: ITask[] = []

const STORE_NAME = 'tasks'

export const useTasksStore = create<StoreState>(
  persist(
    (set, get) => ({
      tasks: DEFAULT_TASKS,
      setTasks: (tasks: ITask[]) => {
        set({ tasks })
      },
      getAllTasks: async () => {
        const tasks = await TasksDataSourceImpl.getInstance().getAll()
        console.log(tasks)
        set({ tasks })
      },
      getAllTasksByEmployee: (id: number) => {
        const { tasks } = get()
        return tasks.filter((task) => task.delegation.employee.id === id)
      },
      getAllTasksByConsumer: (id: number) => {
        const { tasks } = get()
        return tasks.filter((task) => task.delegation.consumer.id === id)
      },
      getTaskById: async (id: number) => {
        await TasksDataSourceImpl.getInstance().getById(id)
      },
      createTask: async (task: ICreateTask) => {
        await TasksDataSourceImpl.getInstance().create(task)
      },
      updateTask: async (id: number, task: IUpdateTask) => {
        await TasksDataSourceImpl.getInstance().update(id, task)
        get().getAllTasks()
      },
      deleteTask: async (id: number) => {
        await TasksDataSourceImpl.getInstance().delete(id)
        get().getAllTasks()
      },
      addCommnet: async (taskId: number, comment: string) => {
        await TasksDataSourceImpl.getInstance().addComment(taskId, comment)
        get().getTaskById(taskId)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
