import * as yup from 'yup'

import { IAuth } from '../models/IUser'

interface IUseAuth extends IAuth {
  role: string
}

export function useAuth() {
  const initialValues: IUseAuth = {
    email: '',
    password: '',
    role: '1',
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().required(),
  })

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return { handleSubmit, validationSchema, initialValues }
}
