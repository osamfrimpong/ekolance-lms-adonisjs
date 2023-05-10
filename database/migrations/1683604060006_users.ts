import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserType } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).nullable().unique()
      table.string('password', 180).nullable()
      table.string('remember_me_token').nullable()

      table.string('wallet_address').unique().notNullable()

      table.string('full_name').unique().nullable()

      table.string('nonce').unique().notNullable()

      table
        .enum('user_type', Object.values(UserType), {
          useNative: true,
          enumName: 'type_of_user',
          existingType: false,
        })
        .defaultTo(UserType.STUDENT)
        .notNullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    // this.schema.raw('DROP TYPE IF EXISTS "type_of_user"')
    this.schema.dropTable(this.tableName)
  }
}
