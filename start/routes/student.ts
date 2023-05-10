import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'StudentDashboardController.index').as('home')
  Route.get('/profile', 'StudentDashboardController.profile').as('profile')
})
  .prefix('/student')
  .as('student')
