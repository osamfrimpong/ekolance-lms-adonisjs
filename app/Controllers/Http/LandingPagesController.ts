import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Programme from 'App/Models/Programme'
import Student from 'App/Models/Student'
import Tutor from 'App/Models/Tutor'

export default class LandingPagesController {
  public async index({ view }: HttpContextContract) {
    const [programmes, tutors, students] = await Promise.all([
      Programme.all(),
      Tutor.all(),
      Student.all(),
    ])

    return view.render('home/index', {
      programmes: programmes,
      tutors: tutors,
      students: students,
    })
  }
}
