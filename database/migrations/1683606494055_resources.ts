import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'resources'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable().unique()

      table.string('description').notNullable()

      table.string('link').notNullable()

      table.integer('programme_id').unsigned()

      table.enum('resource_type', ['VIDEO', 'DOCUMENT', 'REPOSITORY', 'WEBSITE'], {
        useNative: true,
        enumName: 'programme_resource_type',
        existingType: false,
      })

      table.integer('added_by').unsigned().notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    // this.schema.raw('DROP TYPE IF EXISTS "programme_resource_type"')
    this.schema.dropTable(this.tableName)
  }
}
