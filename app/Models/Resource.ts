import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Programme from './Programme'
import { ResourceType } from 'Contracts/enums'

export default class Resource extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public linkToFlier: string

  @column()
  public programmeId: number

  @column()
  public addedBy: number

  @column()
  public resourceType: ResourceType

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

  @belongsTo(() => Programme)
  public programme: BelongsTo<typeof Programme>
}
