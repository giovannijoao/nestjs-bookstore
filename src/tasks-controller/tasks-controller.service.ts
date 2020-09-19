import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Timeout } from '@nestjs/schedule';
import AppError from '../shared/models/AppError';
import { SchedulerProvider } from './providers/SchedulerProvider';
import { TasksRepository } from './providers/TasksRepository/implementations';
import * as Tasks from './tasks';

@Injectable()
export class TasksControllerService {
  private readonly logger = new Logger(TasksControllerService.name);

  constructor(
    private tasksRepository: TasksRepository,
    private schedulerProvider: SchedulerProvider,
    private moduleRef: ModuleRef,
  ) {}

  @Timeout(0)
  async startup() {
    this.logger.log('Searching for active tasks to be loaded...');
    let activeTasks = await this.tasksRepository.findAllActive();
    if (activeTasks.length === 0) {
      this.logger.log('No tasks to be loaded');
      return;
    }
    // Filter only valid tasks
    activeTasks = activeTasks.filter(task => {
      if (Tasks[task.taskWorker]) return true;
      this.logger.error(
        `Task ${task.taskName} (${task.id}): invalid worker type (${task.taskWorker}). Ignoring it`,
      );
      return false;
    });
    activeTasks.forEach(task => {
      this.logger.log(
        `Task ${task.taskName} (${task.id}): ready. Time Expression: ${task.timeExpression}`,
      );
      this.schedulerProvider.addCronJob({
        taskName: task.taskName,
        initialize: true,
        timeExpression: task.timeExpression,
        job: async () => {
          const worker = new Tasks[task.taskWorker](this.moduleRef);
          this.logger.verbose(`Task ${task.taskName} (${task.id}): executing`);
          await worker.execute();
          this.logger.verbose(`Task ${task.taskName} (${task.id}): executed`);
        },
      });
    });
  }

  async getCronJobInformations(taskName: string) {
    const job = await this.schedulerProvider.getCronJob(taskName);
    if (job) {
      return job;
    }
    throw new AppError('Task not found', HttpStatus.BAD_REQUEST);
  }
}
