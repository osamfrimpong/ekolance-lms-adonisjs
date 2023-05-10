import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('programme_applications', (table) => {
      table.foreign('programme_id').references('programmes.id').onDelete('CASCADE')

      table.foreign('student_id').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('announcements', (table) => {
      table.foreign('programme_id').references('programmes.id').onDelete('CASCADE')

      table.foreign('added_by').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('assignment_submissions', (table) => {
      table.foreign('student_id').references('users.id').onDelete('CASCADE')

      table.foreign('assignment_id').references('assignments.id').onDelete('CASCADE')
    })

    this.schema.alterTable('resources', (table) => {
      table.foreign('programme_id').references('programmes.id').onDelete('CASCADE')
      table.foreign('added_by').references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable('assignments', (table) => {
      table.foreign('programme_id').references('programmes.id').onDelete('CASCADE')
      table.foreign('tutor_id').references('users.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable('programme_applications', (table) => {
      table.dropForeign(['student_id', 'programme_id'])
    })

    this.schema.alterTable('announcements', (table) => {
      table.dropForeign(['added_by', 'programme_id'])
    })

    this.schema.alterTable('assignment_submissions', (table) => {
      table.dropForeign(['student_id', 'assignment_id'])
    })

    this.schema.alterTable('resources', (table) => {
      table.dropForeign(['added_by', 'programme_id'])
    })

    this.schema.alterTable('assignments', (table) => {
      table.dropForeign(['tutor_id', 'programme_id'])
    })
  }
}
