import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'DashboardController.index').as('home')
  Route.get('/profile', 'DashboardController.profile').as('profile')
})
  .prefix('/admin')
  .as('admin')
