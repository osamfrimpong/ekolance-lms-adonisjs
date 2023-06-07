import crypto from 'crypto';
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { UserType } from 'Contracts/enums'
import ProgrammeApplication from './ProgrammeApplication'
import AssignmentSubmission from './AssignmentSubmission'
import Programme from './Programme'
import Resource from './Resource'
import Assignment from './Assignment'
import Announcement from './Announcement'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string | null

  @column()
  public nonce: string

  @column()
  public fullName: string | null

  @column()
  public walletAddress: string

  @column()
  public userType: UserType

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async generateNonce(user: User) {
    const bytes = crypto.randomBytes(25)
      user.nonce =   bytes.toString('hex')
  }
  
  //Student Relationships
  @hasMany(() => ProgrammeApplication)
  public programmeApplications: HasMany<typeof ProgrammeApplication>

  @hasMany(() => AssignmentSubmission)
  public assignmentSubmissions: HasMany<typeof AssignmentSubmission>

  @manyToMany(() => Programme, {
    pivotTable: 'programme_students',
  })
  public programmes: ManyToMany<typeof Programme>

  // Tutor Relationship
  @hasMany(() => Resource)
  public resources: HasMany<typeof Resource>

  @hasMany(() => Assignment)
  public assignments: HasMany<typeof Assignment>

  @hasMany(() => Announcement)
  public announcements: HasMany<typeof Announcement>


}
