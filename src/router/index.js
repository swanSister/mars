import { createWebHashHistory, createRouter } from 'vue-router'
import MarsMain from '../pages/MarsMain.vue'
import Swanne from '../pages/Swanne.vue'

const routes = [

  {
    path: '/mars',
    name: 'mars',
    component: MarsMain,
    
  },
  {
    path: '/swanne',
    name: 'swanne',
    component: Swanne
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router