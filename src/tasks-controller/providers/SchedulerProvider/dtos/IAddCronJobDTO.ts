export default interface IAddCronJobDTO {
  taskName: string;

  timeExpression: string;

  job(): Promise<void>;

  /** If true it starts the job after creation */
  initialize: boolean;
}
