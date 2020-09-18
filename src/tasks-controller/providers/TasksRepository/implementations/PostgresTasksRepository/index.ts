import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ITasksRepository from '../../models/ITasksRepository';
import TaskModel from '../../models/TaskModel';
import TaskSchema from './entities/task.entity';

export default class PostgresTsksRepository implements ITasksRepository {
  constructor(
    @InjectRepository(TaskSchema) private ormRepository: Repository<TaskSchema>,
  ) {}

  async findAllActive(): Promise<TaskModel[]> {
    return this.ormRepository.find();
  }
}
