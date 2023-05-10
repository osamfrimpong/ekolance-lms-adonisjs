import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TutorDashboardController.index').as('home')
  Route.get('/profile', 'TutorDashboardController.profile').as('profile')
  Route.resource('assignments', 'AssignmentsController')
})
  .prefix('/tutor')
  .as('tutor')
