import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserType } from 'Contracts/enums'

export default class StudentDashboardController {
  public async index({ view }: HttpContextContract) {
    return view.render('student/dashboard')
  }

  public async profile(ctx: HttpContextContract) {
    return ctx.view.render('student/register')
  }

  public async login({ view, session }: HttpContextContract) {
    const walletAddress: string = session.get('walletAddress', 'undefined')
    return view.render('student/index', { address: walletAddress })
  }

  public async doLogin({ response, auth, session }: HttpContextContract) {
    const walletAddress: string = session.get('walletAddress', 'undefined')
    const student = await User.findBy('walletAddress', walletAddress)
    if (student) {
      //login
      if (await auth.use('student').attempt(student.email!, student.walletAddress)) {
        return { success: true, message: 'Student Successfully Logged In' }
      } else {
        return { success: false, message: `${walletAddress} could not be authenticated` }
      }
    } else {
      //throw exception
      return { success: false, message: `${walletAddress} not found in database` }
    }
  }

  public async register({ view, session }: HttpContextContract) {
    //retrieve wallet from session
    const walletAddress: string = session.get('walletAddress', 'undefined')

    //check if wallet exists in database
    const student =
      walletAddress !== 'undefined' ? await User.findBy('walletAddress', walletAddress) : false
    let studentExists: boolean = false
    let foundStudent
    if (student) {
      studentExists = true
      foundStudent = student
    } else {
      //throw exception
      studentExists = false
    }
    return view.render('student/register', {
      address: walletAddress,
      studentExists: studentExists,
      foundStudent: foundStudent,
    })
  }

  public async doRegister({ request, auth, response, session }: HttpContextContract) {
    const { walletAddress, fullName, email } = request.all()

    const searchPayload = { walletAddress: walletAddress }
    const savePayload = {
      fullName: fullName,
      email: email,
      userType: UserType.STUDENT,
      password: walletAddress,
    }

    const student = await User.firstOrCreate(searchPayload, savePayload)

    // return student;

    //log student in
    try {
      await auth.use('student').attempt(student.email!, student.walletAddress)
      return response.redirect().toRoute('student.home')
    } catch (error) {
      session.flash({ loginError: 'These credentials do not work.' })
      return response.redirect().toRoute('student.index')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('student').logout()
    return response.redirect().toRoute('student.index')
  }
}
