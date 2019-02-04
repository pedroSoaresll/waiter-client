import VueRouter from 'vue-router'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home')
  },
  {
    name: 'FirstData',
    path: '/cadastre-se',
    component: () => import('./views/FirstData')
  },
  {
    name: 'ConfirmNumber',
    path: '/confirmar-telefone',
    component: () => import('./views/ConfirmNumber')
  },
  {
    name: 'FormSignup',
    path: '/cadastro',
    component: () => import('./views/SignupSteps'),
    children: [
      {
        name: 'PreData',
        path: 'pre-dados',
        component: () => import('../components/signup-form/PreData')
      },
      {
        name: 'NoHaveRequisites',
        path: 'nao-tem-os-requisitos',
        component: () => import('../components/signup-form/NoHaveRequisites')
      },
      {
        name: 'ConnectAccounts',
        path: 'conectar-contas',
        component: () => import('../components/signup-form/ConnectAccounts')
      },
      {
        name: 'ReportDocs',
        path: 'informacoes-pessoais',
        component: () => import('../components/signup-form/ReportDocs')
      },
      {
        name: 'SelectPlan',
        path: 'selecione-seu-plano',
        component: () => import('../components/signup-form/SelectPlan')
      },
      {
        name: 'FinishForm',
        path: 'cadastro-realizado',
        component: () => import('../components/signup-form/FinishForm')
      },
      {
        name: 'DoPayment',
        path: 'plano-selecionado',
        component: () => import('../components/signup-form/DoPayment')
      },
      {
        name: 'Payment',
        path: 'faca-o-pagamento-do-seu-kovi',
        component: () => import('../components/signup-form/Payment')
      },
      {
        name: 'PaymentStatus',
        path: 'status-do-pagamento',
        component: () => import('../components/signup-form/PaymentStatus')
      },
      {
        name: 'BookingDate',
        path: 'data-de-retirada-do-seu-kovi',
        component: () => import('../components/signup-form/BookingDate')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
