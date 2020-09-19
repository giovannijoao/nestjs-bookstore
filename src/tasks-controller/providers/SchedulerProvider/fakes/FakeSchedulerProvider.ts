import IAddCronJobDTO from '../dtos/IAddCronJobDTO';
import ISchedulerProvider from '../models/ISchedulerProvider';

interface IFakeJob {
  taskName: string;
  timeExpression: string;
}

export default class FakeSchedulerProvider implements ISchedulerProvider {
  private jobs: IFakeJob[] = [];

  async addCronJob(params: IAddCronJobDTO): Promise<void> {
    const job: IFakeJob = {
      taskName: params.taskName,
      timeExpression: params.timeExpression,
    };
    this.jobs.push(job);
    if (params.initialize) {
      params.job();
    }
  }
}
