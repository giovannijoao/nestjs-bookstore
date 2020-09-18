import TaskModel from './TaskModel';

export default interface ITasksRepository {
  findAllActive(): Promise<TaskModel[]>;
}
