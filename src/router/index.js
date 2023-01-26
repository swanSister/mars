import { createWebHistory, createRouter } from 'vue-router'
import MarsMain from '../pages/MarsMain.vue'
import Swanne from '../pages/Swanne.vue'

const routes = [
  {
    path: '/',
    name: 'mars',
    component: MarsMain,
   
  },
  {
    path: '/mars',
    name: 'mars',
    component: MarsMain,
    
  },
  {
    path: '/Swanne',
    name: 'swanne',
    component: Swanne
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router