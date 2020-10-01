import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableCheck,
  TableForeignKey,
} from 'typeorm';

export class PurchaseTable1600372736695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchases',
        columns: [
          {
            name: 'purchase_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'book_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'purchased_at',
            type: 'timestamp',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'purchases',
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        name: 'PURCHASE_BOOK_FK',
      }),
    );
    await queryRunner.createForeignKey(
      'purchases',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'users',
        name: 'PURCHASE_USER_FK',
      }),
    );
    await queryRunner.createCheckConstraint(
      'purchases',
      new TableCheck({
        columnNames: ['quantity'],
        expression: 'quantity > 0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
  }
}
