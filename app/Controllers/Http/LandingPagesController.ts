import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Programme from 'App/Models/Programme'
import User from 'App/Models/User'

export default class LandingPagesController {
  public async index({ view }: HttpContextContract) {
    const [programmes, tutors, students] = await Promise.all([
      Programme.all(),
      User.query().where('user_type', 'tutor'),
      User.query().where('user_type', 'student'),
    ])

    return view.render('home/index', {
      programmes: programmes,
      tutors: tutors,
      students: students,
    })
  }
}
