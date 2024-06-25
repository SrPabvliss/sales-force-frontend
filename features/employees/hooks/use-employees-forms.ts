import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useEmployeesStore } from '../context/employees-store'
import { ICreateEmployee, IEmployee, IUpdateEmployee } from '../models/IEmployee'
import { EmployeesDatasourceImpl } from '../services/datasource'

export function useEmployeesForm(currentEmployee?: IEmployee) {
  const { createEmployee, updateEmployee } = useEmployeesStore()
  const router = useRouter()
  const pathname = usePathname()

  const getCurrentEmployeModules = async (id: number) => {
    let modules = <number[]>[]
    await EmployeesDatasourceImpl.getInstance()
      .getPermissions(id)
      .then((data) => {
        modules = data
      })

    return modules
  }

  async function getInitialValues() {
    let moduleId = <number[]>[]
    if (currentEmployee?.id) {
      try {
        moduleId = await getCurrentEmployeModules(currentEmployee.id)
      } catch (error) {
        console.error('Error al obtener los módulos del empleado', error)
      }
    }

    return {
      username: currentEmployee?.username || '',
      role: currentEmployee?.role || '',
      isActive: currentEmployee?.isActive || true,
      password: undefined,
      person: {
        dni: currentEmployee?.person.dni || '',
        name: currentEmployee?.person.name || '',
        secondName: currentEmployee?.person.secondName || '',
        lastName: currentEmployee?.person.lastName || '',
        secondLastName: currentEmployee?.person.secondLastName || '',
        gender: currentEmployee?.person.gender || '',
        email: currentEmployee?.person.email || '',
        phone: currentEmployee?.person.phone || '',
        birthdate: currentEmployee?.person.birthdate || new Date(),
        locationId: currentEmployee?.person.location.id.toString() || '',
      },
      moduleId: moduleId,
    }
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es requerido'),
    role: yup.string().required('El rol es requerido'),
    isActive: yup.boolean().required('El estado es requerido'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    person: yup.object().shape({
      dni: yup.string().required('La cédula es requerida'),
      name: yup.string().required('El nombre es requerido'),
      secondName: yup.string(),
      lastName: yup.string().required('El apellido es requerido'),
      secondLastName: yup.string(),
      gender: yup.string().required('El género es requerido'),
      email: yup.string().email('El correo no es válido').required('El correo es requerido'),
      phone: yup.string(),
      birthdate: yup.date(),
      locationId: yup.string().required('La ubicación es requerida'),
    }),
    moduleId: yup.array().of(yup.number()).required('Se deben seleccionar los módulos de acceso'),
  })

  const handleSubmit = async (data: ICreateEmployee | IUpdateEmployee) => {
    const { moduleId, ...rest } = data
    const formattedData = {
      ...rest,
      person: {
        ...data.person,
        locationId: Number(data.person?.locationId),
      },
    }

    if (!currentEmployee) {
      await createEmployee(formattedData as ICreateEmployee, moduleId as number[])
      router.push(pathname.replace('/new', ''))
      return
    }
    await updateEmployee(currentEmployee!.id, formattedData as IUpdateEmployee, moduleId as number[])
    router.push(pathname.split('/').slice(0, -2).join('/'))
  }

  return { handleSubmit, validationSchema, getInitialValues }
}
