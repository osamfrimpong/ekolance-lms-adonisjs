import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async index({}: HttpContextContract) {}

  public async profile({}: HttpContextContract) {}
}
