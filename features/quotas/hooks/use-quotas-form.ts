import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useQuotasStore } from '../context/quotas-store'
import { ICreateQuota, IQuota, IUpdateQuota } from '../models/IQuota'

export function useLocationsForm({ currentQuota }: { currentQuota?: IQuota }) {
  const { createQuota: createQuota, updateQuota: updateQuota } = useQuotasStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {}

  const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    isActive: yup.boolean().required('El estado es requerido'),
    type: yup.string().required('El tipo es requerido'),
    parentId: yup.string(),
  })

  const handleSubmit = async (data: ICreateQuota | IUpdateQuota) => {
    const fomattedData = {
      ...data,
      //parentId: hasParent === true ? Number(data.parentId) : undefined,
    }

    if (currentQuota) {
      await updateQuota(currentQuota.id, fomattedData as IUpdateQuota)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createQuota(fomattedData as ICreateQuota)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
