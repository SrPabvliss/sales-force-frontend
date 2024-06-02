import * as yup from 'yup'

import { IAuth } from '../models/IUser'

interface IUseAuth extends IAuth {
  role: string
  remember: boolean
  date: Date
  dateRange: {
    from: Date
    to: Date
  }
  radio: string
}

export function useAuth() {
  const initialValues: IUseAuth = {
    email: '',
    password: '',
    role: '',
    remember: false,
    date: new Date(),
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
    radio: '',
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().required(),
    remember: yup.boolean(),
    date: yup.date().required(),
    dateRange: yup.object().shape({
      from: yup.date().required(),
      to: yup.date().required(),
    }),
    radio: yup.string().required(),
  })

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return { handleSubmit, validationSchema, initialValues }
}
