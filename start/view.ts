/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

View.global('staticFile', function (text) {
  return `${Env.get('APP_URL')}/static/${text}`
})
