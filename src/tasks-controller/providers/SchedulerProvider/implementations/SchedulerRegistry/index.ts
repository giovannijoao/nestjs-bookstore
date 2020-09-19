import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import IAddCronJobDTO from '../../dtos/IAddCronJobDTO';
import ISchedulerProvider from '../../models/ISchedulerProvider';

@Injectable()
export default class CustomSchedulerRegistry implements ISchedulerProvider {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async addCronJob({
    taskName,
    timeExpression,
    initialize,
    job,
  }: IAddCronJobDTO): Promise<void> {
    this.schedulerRegistry.addCronJob(
      taskName,
      new CronJob(timeExpression, job),
    );
    if (initialize) {
      this.schedulerRegistry.getCronJob(taskName).start();
    }
  }
}
