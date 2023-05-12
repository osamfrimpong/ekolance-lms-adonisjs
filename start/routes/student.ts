import Route from '@ioc:Adonis/Core/Route'

Route.get('/student', 'Student/StudentDashboardController.login').as('student.index')
Route.get('/student/register', 'Student/StudentDashboardController.register').as('student.register')
Route.group(() => {
  Route.get('/dashboard', 'Student/StudentDashboardController.index').as('home')
  Route.get('/profile', 'Student/StudentDashboardController.profile').as('profile')
})
  .prefix('/student')
  .as('student')
