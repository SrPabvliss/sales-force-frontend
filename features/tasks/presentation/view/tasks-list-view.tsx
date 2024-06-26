import { Button } from '@/components/ui/button'

import { useTasksView } from '../../hooks/use-tasks-view'
import { TasksTable } from '../components/DataTable/tasks-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const TasksListView = () => {
  const { tasks, handleDelete, handleAdd, handleEdit, handleStatusChange } = useTasksView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Tareas</h1>
            <Button onClick={() => handleAdd()}>Nueva tarea</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <TasksTable
              data={tasks}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}
