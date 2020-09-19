import IAddCronJobDTO from '../dtos/IAddCronJobDTO';

export default interface ISchedulerProvider {
  addCronJob(params: IAddCronJobDTO): Promise<void>;
}
