import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import IAddCronJobDTO from '../../dtos/IAddCronJobDTO';
import ICronJob from '../../models/ICronJob';
import ISchedulerProvider from '../../models/ISchedulerProvider';

interface IJobs {
  [name: string]: ICronJob;
}
@Injectable()
export default class CustomSchedulerRegistry implements ISchedulerProvider {
  private jobs: IJobs = {};

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
    const informations: ICronJob = {
      taskName,
      timeExpression,
      lastExecuted: null,
    };
    if (initialize) {
      informations.lastExecuted = new Date();
      this.schedulerRegistry.getCronJob(taskName).start();
    }
    this.jobs[taskName] = informations;
  }

  async getCronJob(taskName: string): Promise<ICronJob> {
    const job = this.schedulerRegistry.getCronJob(taskName);
    if (!job) return null;
    const informations = this.jobs[taskName];
    informations.lastExecuted = job.lastDate();
    return informations;
  }
}
