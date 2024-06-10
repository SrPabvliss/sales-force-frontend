import React from 'react'

import { Button } from '@/components/ui/button'

interface DataTableFooterProps {
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  pageCount: number
}

const DataTableFooter: React.FC<DataTableFooterProps> = ({
  rowsPerPage,
  setRowsPerPage,
  pageIndex,
  setPageIndex,
  pageCount,
}) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <span>Filas por página:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value))
            setPageIndex(0)
          }}
          className="rounded border bg-primary-foreground bg-purple-100 p-1"
        >
          <option value={5} className="bg-purple-100">
            5
          </option>
          <option value={10} className="bg-purple-100">
            10
          </option>
          <option value={20} className="bg-purple-100">
            20
          </option>
          <option value={50} className="bg-purple-100">
            50
          </option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, pageCount - 1))}
          disabled={pageIndex >= pageCount - 1}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}

export default DataTableFooter
