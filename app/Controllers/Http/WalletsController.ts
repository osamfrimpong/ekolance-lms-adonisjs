import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WalletsController {
  public async storeAddress({ session, request, response }: HttpContextContract) {
    const walletAddress: string = request.param('address')
    session.put('walletAddress', walletAddress)
    return response.json({ success: true, walletAddress: walletAddress })
  }
}
