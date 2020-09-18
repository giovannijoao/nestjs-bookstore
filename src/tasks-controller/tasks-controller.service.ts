import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
import IGetInformations from './interfaces/IGetInformations';
import { TasksRepository } from './providers/TasksRepository/implementations';
import * as Tasks from './tasks';

@Injectable()
export class TasksControllerService {
  private readonly logger = new Logger(TasksControllerService.name);

  constructor(
    private tasksRepository: TasksRepository,
    private schedulerRegistry: SchedulerRegistry,
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
      this.logger.log(`Task ${task.taskName} (${task.id}): ready`);
      this.schedulerRegistry.addCronJob(
        task.taskName,
        new CronJob(task.timeExpression, async () => {
          const worker = new Tasks[task.taskWorker](this.moduleRef);
          this.logger.verbose(`Task ${task.taskName} (${task.id}): executing`);
          await worker.execute();
          this.logger.verbose(`Task ${task.taskName} (${task.id}): executed`);
        }),
      );
      const cronJob = this.schedulerRegistry.getCronJob(task.taskName);
      cronJob.start();
    });
  }

  async getInformations(
    cronName = 'sayIAmWorkingCron',
  ): Promise<IGetInformations> {
    const job = this.schedulerRegistry.getCronJob(cronName);
    let nextDates = job.nextDates(5);
    if (!Array.isArray(nextDates)) nextDates = [nextDates];
    return {
      cronName,
      running: job.running,
      lastDate: job.lastDate().toISOString(),
      nextDates: nextDates.map(x => x.toISOString()),
    };
  }
}
