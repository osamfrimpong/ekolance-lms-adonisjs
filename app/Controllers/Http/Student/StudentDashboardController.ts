import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StudentDashboardController {
  public async index({ view }: HttpContextContract) {
    return view.render('student.dashboard')
  }

  public async profile(ctx: HttpContextContract) {
    return ctx.view.render('student/register')
  }
}
