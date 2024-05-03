import { createRouter, createWebHistory, type RouterOptions } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TaskPage from '@/views/TaskPage.vue'
import CreateTaskPage from '@/views/CreateTaskPage.vue'

const routes: RouterOptions['routes'] = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/task/:id', name: 'task', component: TaskPage },
  { path: '/create', name: 'create', component: CreateTaskPage },
  { path: '/:pathMatch(.*)*', name: 'notFound', redirect: { name: 'home', params: {} } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {top: 0}
  }
})

export default router
