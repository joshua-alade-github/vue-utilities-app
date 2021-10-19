import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../views/Todo.vue'
import Calculator from '../views/Calculator.vue'

const routes = [
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
