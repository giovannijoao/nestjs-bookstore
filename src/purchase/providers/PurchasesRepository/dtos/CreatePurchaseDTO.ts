import UserModel from '../../../../users/providers/UsersRepository/models/User';
import Book from '../../../../books/providers/BooksRepository/models/Book';

export default class CreatePurchaseDTO {
  items: Array<{
    book: Book;
    quantity: number;
  }>;

  user: UserModel;
}
