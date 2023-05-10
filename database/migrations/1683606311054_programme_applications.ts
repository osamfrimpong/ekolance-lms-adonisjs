import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ProgrammeApplicationStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'programme_applications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('programme_id').unsigned().notNullable()
      // table.foreign('programme_id').references('programmes.id').onDelete('CASCADE')

      table.integer('student_id').unsigned().notNullable()
      // table.foreign('student_id').references('users.id').onDelete('CASCADE')

      table
        .enum('application_status', Object.values(ProgrammeApplicationStatus), {
          useNative: true,
          enumName: 'student_programme_application_status',
          existingType: false,
        })
        .defaultTo(ProgrammeApplicationStatus.PENDING)
        .notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "student_programme_application_status"')
    this.schema.dropTable(this.tableName)
  }
}
