import React, { useEffect } from 'react'

import { BrandsDatasourceImpl } from '../../services/Datasource'
import { DataTableDemo } from '../components/BrandTable'

export const BrandsListView = () => {
  useEffect(() => {
    const getBrands = async () => {
      const brands = await BrandsDatasourceImpl.getInstance().getAll()
      console.log(brands)
    }
    getBrands()
  }, [])
  return (
    <>
      <div className="p-32 px-64">
        <nav className="text-gray-500">
          <ol className="list-reset flex">
            <li>
              <a href="#" className="text-blue-500">
                Dashboard
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>Marcas</li>
          </ol>
        </nav>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Marcas</h1>
          <button className="btn btn-primary">Nueva Marca</button>
        </div>
        <div className="mt-4">
          <DataTableDemo />
        </div>
      </div>
    </>
  )
}
