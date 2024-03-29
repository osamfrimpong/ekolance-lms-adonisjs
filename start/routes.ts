/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import './routes/admin'
import './routes/student'
import './routes/tutor'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'LandingPagesController.index').as('home')

Route.get('/walletAddress/store/:address', 'WalletsController.storeAddress').as('wallet.store')

Route.get('/connect', ({ view }) => {
  return view.render('welcome')
})
