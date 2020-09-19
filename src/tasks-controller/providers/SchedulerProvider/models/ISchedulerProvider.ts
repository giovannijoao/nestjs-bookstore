import IAddCronJobDTO from '../dtos/IAddCronJobDTO';
import ICronJob from './ICronJob';

export default interface ISchedulerProvider {
  addCronJob(params: IAddCronJobDTO): Promise<void>;
  getCronJob(taskName: string): Promise<ICronJob | null>;
}
