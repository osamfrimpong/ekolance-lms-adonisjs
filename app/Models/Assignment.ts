import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Programme from './Programme'
import User from './User'
import AssignmentSubmission from './AssignmentSubmission'

export default class Assignment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tutorId: number

  @column()
  public programmeId: number

  @column()
  public link: string

  @column.dateTime({ autoCreate: false })
  public deadline: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public tutor: BelongsTo<typeof User>

  @belongsTo(() => Programme)
  public programme: BelongsTo<typeof Programme>

  @hasMany(() => AssignmentSubmission)
  public assignmentSubmissions: HasMany<typeof AssignmentSubmission>
}
