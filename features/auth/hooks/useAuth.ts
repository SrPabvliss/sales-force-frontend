import * as yup from 'yup'

import { IAuth } from '../models/IUser'

interface IUseAuth extends IAuth {
  role: string
  remember: boolean
}

export function useAuth() {
  const initialValues: IUseAuth = {
    email: '',
    password: '',
    role: '',
    remember: false,
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().required(),
    remember: yup.boolean(),
  })

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return { handleSubmit, validationSchema, initialValues }
}
