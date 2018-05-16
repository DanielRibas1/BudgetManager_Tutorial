import Home from '../components/pages/Home.vue'
import Authentication from '../components/pages/Authentication/Authentication'
import Header from '../components/Header'
import List from '../components/List/List'
import Create from '@/components/pages/Create'

export default [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    components: {
      default: Home,
      header: Header,
      list: List,
      create: Create
    }
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  }
]
