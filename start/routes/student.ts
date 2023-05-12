import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dashboard', 'Student/StudentDashboardController.index').as('home')
  Route.get('/profile', 'Student/StudentDashboardController.profile').as('profile')
})
  .prefix('/student')
  .as('student')
