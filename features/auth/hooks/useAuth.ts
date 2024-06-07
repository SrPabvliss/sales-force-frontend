import * as yup from 'yup'

import { UseAccountStore } from '../context/useUserStore'
import { IAuth } from '../models/IUser'

export function useAuth() {
  const { login } = UseAccountStore()

  const initialValues: IAuth = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })

  const handleSubmit = async (data: any) => {
    login(data)
  }

  return { handleSubmit, validationSchema, initialValues }
}
