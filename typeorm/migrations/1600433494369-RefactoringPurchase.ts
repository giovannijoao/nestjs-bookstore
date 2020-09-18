import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableCheck,
  TableForeignKey,
} from 'typeorm';

export class RefactoringPurchase1600433494369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
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
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'total_price',
            type: 'float',
          },
          {
            name: 'purchased_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
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
    await queryRunner.createCheckConstraints('purchases', [
      new TableCheck({
        columnNames: ['quantity'],
        expression: 'quantity > 0',
      }),
    ]);
    await queryRunner.createTable(
      new Table({
        name: 'purchases_items',
        columns: [
          {
            name: 'item_id',
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
            name: 'purchase_id',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'unity_price',
            type: 'float',
          },
          {
            name: 'total_price',
            type: 'float',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('purchases_items', [
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        name: 'PURCHASE_ITEMS_BOOK_FK',
      }),
      new TableForeignKey({
        columnNames: ['purchase_id'],
        referencedColumnNames: ['purchase_id'],
        referencedTableName: 'purchases',
        name: 'PURCHASE_ID_FK',
      }),
    ]);
    await queryRunner.createCheckConstraints('purchases_items', [
      new TableCheck({
        columnNames: ['quantity'],
        expression: 'quantity > 0',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases_items');
    await queryRunner.dropTable('purchases');
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
}
