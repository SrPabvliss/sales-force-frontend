import { IApiEmployee } from '../models/IApiEmployee'
import { IEmployee } from '../models/IEmployee'

export class EmployeeAdapter {
  static toDomain(data: IApiEmployee): IEmployee {
    return {
      id: data.id,
      username: data.username,
      role: data.role,
      isActive: data.isActive,
      person: data.person,
    }
  }

  static toDomainList(data: IApiEmployee[]): IEmployee[] {
    return data.map((employee) => EmployeeAdapter.toDomain(employee))
  }
}
