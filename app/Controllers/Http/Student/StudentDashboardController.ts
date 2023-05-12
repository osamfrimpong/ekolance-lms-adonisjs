import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class StudentDashboardController {
  public async index({ view }: HttpContextContract) {
    return view.render('student.dashboard')
  }

  public async profile(ctx: HttpContextContract) {
    return ctx.view.render('student/register')


  }

  public async login({ view }: HttpContextContract) {
    return view.render('student.index')
  }

  public async register({ view }: HttpContextContract) {
    return view.render('student.register')
  }
}
