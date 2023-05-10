import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Programme from './Programme'
import { ProgrammeApplicationStatus } from 'Contracts/enums'

export default class ProgrammeApplication extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public programmeId: number

  @column()
  public studentId: number

  @column()
  public applicationStatus: ProgrammeApplicationStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public student: BelongsTo<typeof User>

  @belongsTo(() => Programme)
  public programme: BelongsTo<typeof Programme>
}
