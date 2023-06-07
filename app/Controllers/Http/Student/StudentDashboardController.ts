import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserType } from 'Contracts/enums'

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

  public async register({ view, request }: HttpContextContract) {
    const address: string = request.param('address')
    return view.render('student.register',{address: address})
  }

  public async doRegister({ request, auth, response, session }: HttpContextContract){

    const {walletAddress, fullName, email} = request.all()

    const searchPayload = { walletAddress: walletAddress}
    const savePayload = {fullName: fullName, email: email, userType: UserType.STUDENT, password: walletAddress}

   const student = await User.firstOrCreate(searchPayload,savePayload)

    // return student;

    //log student in
    try {
      await auth.attempt(email, walletAddress);
      return response.redirect().toRoute('student.home')
  } catch (error) {
      session.flash({loginError: 'These credentials do not work.'})
      return response.redirect().toRoute('student.index');
  }

  }

  public async logout({auth, response}: HttpContextContract){

      await auth.logout()
      return response.redirect().toRoute('student.index')

  }
}
