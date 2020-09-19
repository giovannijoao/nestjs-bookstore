import IAddCronJobDTO from '../dtos/IAddCronJobDTO';
import ICronJob from '../models/ICronJob';
import ISchedulerProvider from '../models/ISchedulerProvider';

export default class FakeSchedulerProvider implements ISchedulerProvider {
  jobs: ICronJob[] = [];

  async addCronJob(params: IAddCronJobDTO): Promise<void> {
    const job: ICronJob = {
      taskName: params.taskName,
      timeExpression: params.timeExpression,
      lastExecuted: null,
    };
    this.jobs.push(job);
    if (params.initialize) {
      job.lastExecuted = new Date();
      params.job();
    }
  }

  async getCronJob(taskName: string): Promise<ICronJob> {
    const job = this.jobs.find(x => x.taskName === taskName);
    if (!job) return null;
    return {
      taskName: job.taskName,
      timeExpression: job.timeExpression,
      lastExecuted: job.lastExecuted,
    };
  }
}
