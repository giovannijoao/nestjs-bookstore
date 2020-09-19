export default interface ICronJob {
  taskName: string;
  timeExpression: string;
  lastExecuted: Date;
}
