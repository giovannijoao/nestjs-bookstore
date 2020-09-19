import ITasksRepository from '../models/ITasksRepository';
import TaskModel from '../models/TaskModel';

export default class FakeTasksRepository implements ITasksRepository {
  private tasks: TaskModel[] = [];

  async findAllActive(): Promise<TaskModel[]> {
    return this.tasks;
  }
}
