import { IAuth } from '../models/IUser'
import * as yup from 'yup'

export function useAuth() {
  const initialValues: IAuth = {
    email: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return { handleSubmit, validationSchema, initialValues }
}
