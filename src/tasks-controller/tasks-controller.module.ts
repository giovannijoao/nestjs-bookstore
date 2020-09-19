import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksControllerService } from './tasks-controller.service';
import { TasksControllerController } from './tasks-controller.controller';
import { TasksRepository } from './providers/TasksRepository/implementations';
import TaskSchema from './providers/TasksRepository/implementations/PostgresTasksRepository/entities/task.entity';
import { SchedulerProvider } from './providers/SchedulerProvider';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchema])],
  providers: [SchedulerProvider, TasksRepository, TasksControllerService],
  controllers: [TasksControllerController],
})
export class TasksControllerModule {}
