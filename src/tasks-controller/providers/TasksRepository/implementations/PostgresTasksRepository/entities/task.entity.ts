import TaskModel from 'tasks-controller/providers/TasksRepository/models/TaskModel';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export default class TaskSchema implements TaskModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'task_name',
    type: 'varchar',
  })
  taskName: string;

  @Column({
    name: 'task_worker',
    type: 'varchar',
  })
  taskWorker: string;

  @Column({
    name: 'time_expression',
    type: 'varchar',
  })
  timeExpression: string;

  @Column({
    name: 'active',
    type: 'varchar',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'varchar',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'varchar',
  })
  updatedAt: Date;
}
