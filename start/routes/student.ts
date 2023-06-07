import Route from '@ioc:Adonis/Core/Route'

Route.get('/student', 'Student/StudentDashboardController.login').as('student.index')
Route.get('/student/register/:address?', 'Student/StudentDashboardController.register').as(
  'student.register'
)
Route.post('/student/register', 'Student/StudentDashboardController.doRegister').as(
  'student.register.do'
)

Route.get('/student/logout', 'Student/StudentDashboardController.logout').as('student.logout')

Route.group(() => {
  Route.get('/dashboard', 'Student/StudentDashboardController.index').as('home')
  Route.get('/profile', 'Student/StudentDashboardController.profile').as('profile')
})
  .middleware('auth')
  .prefix('/student')
  .as('student')
