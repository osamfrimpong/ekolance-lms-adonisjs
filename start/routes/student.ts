import Route from '@ioc:Adonis/Core/Route'

Route.get('/student/login', 'Student/StudentDashboardController.login').as('student.index')
Route.get('/student/login/do', 'Student/StudentDashboardController.doLogin').as('student.login')
Route.get('/student/register', 'Student/StudentDashboardController.register').as('student.register')
Route.post('/student/register', 'Student/StudentDashboardController.doRegister').as(
  'student.register.do'
)

Route.group(() => {
  Route.get('/dashboard', 'Student/StudentDashboardController.index').as('home')
  Route.get('/profile', 'Student/StudentDashboardController.profile').as('profile')

  Route.get('logout', 'Student/StudentDashboardController.logout').as('logout')
})
  .middleware('auth:student')
  .prefix('/student')
  .as('student')
