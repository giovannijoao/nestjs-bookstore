import CreatePurchaseDTO from '../dtos/CreatePurchaseDTO';
import IPurchase from './IPurchase';

export default interface IPurchaseRepository {
  create(data: CreatePurchaseDTO): Promise<IPurchase[]>;
}
