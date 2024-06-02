export interface IUser {
  id: number
  firstLastName: string
  firstName: string
  role: string
  accessModules: number[]
}

export interface IAuth {
  email: string
  password: string
}
