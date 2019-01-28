// const Home = () => import('./views/Home')
// const FirstData = () => import('./views/FirstData')
// const ConfirmNumber = () => import('./views/ConfirmNumber')
// const PreData = () => import('../components/signup-form/PreData')
const ConnectAccounts = () => import('../components/signup-form/ConnectAccounts')

const routes = [
  {
    name: 'Home',
    path: '/',
    component: ConnectAccounts
  }
]

export default routes