import Route from '@ioc:Adonis/Core/Route'

Route.get('/tutor', 'Tutor/TutorDashboardController.login').as('tutor.index')

Route.group(() => {
  Route.get('/dashboard', 'TutorDashboardController.index').as('home')
  Route.get('/profile', 'TutorDashboardController.profile').as('profile')
  Route.resource('assignments', 'AssignmentsController')
})
  .prefix('/tutor')
  .as('tutor')
