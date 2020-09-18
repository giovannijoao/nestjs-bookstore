import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPriceToBook1600430275102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'books',
      new TableColumn({
        name: 'price',
        type: 'float',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('books', 'price');
  }
}
