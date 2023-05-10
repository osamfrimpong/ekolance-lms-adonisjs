import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Resource from './Resource'
import Announcement from './Announcement'
import Assignment from './Assignment'
import ProgrammeApplication from './ProgrammeApplication'

export default class Programme extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public linkToFlier: string

  @column()
  public poolAddress: string

  @column.dateTime({ autoCreate: false })
  public deadline: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'programme_students',
  })
  public students: ManyToMany<typeof User>

  @hasMany(() => Resource)
  public resources: HasMany<typeof Resource>

  @hasMany(() => Announcement)
  public announcements: HasMany<typeof Announcement>

  @hasMany(() => Assignment)
  public assignments: HasMany<typeof Assignment>

  @hasMany(() => ProgrammeApplication)
  public programmeApplications: HasMany<typeof ProgrammeApplication>
}
