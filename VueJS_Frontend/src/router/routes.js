import Home from '../components/pages/Home.vue'
import Authentication from '../components/pages/Authentication/Authentication'
import Header from '../components/Header'
import BudgetList from '../components/Budget/BudgetList'

export default [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    header: Header,
    BudgetList: BudgetList,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  }
]
