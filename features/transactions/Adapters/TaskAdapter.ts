// clase que transforma a la data que necesitamos

import { ITask, TaskStatus } from '../models/ITransaction'

export class TaskAdapter {
  static toDomain(data: ITask): ITask {
    return {
      id: data.id,
      date: data.date,
      createdAt: data.createdAt,
      status: data.status === null ? TaskStatus.PENDING : data.status,
      type: data.type,
      estimatedTime: data.estimatedTime,
      delegation: data.delegation,
      comments: data.comments,
    }
  }

  static toDomainList(data: ITask[]): ITask[] {
    return data.map((task) => this.toDomain(task))
  }
}
