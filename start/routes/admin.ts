import Route from '@ioc:Adonis/Core/Route'

Route.get('/admin', 'DashboardController.login').as('admin.index')
Route.group(() => {
  Route.get('/dashboard', 'DashboardController.index').as('home')
  Route.get('/profile', 'DashboardController.profile').as('profile')
})
  .middleware('auth:web')
  .prefix('/admin')
  .as('admin')
