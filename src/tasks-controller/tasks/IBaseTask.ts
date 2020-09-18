export default interface IBaseTask {
  execute(): Promise<void>;
}
