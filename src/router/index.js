import { createRouter, createWebHistory } from "vue-router"
import About from "@/components/about/About.vue"
import Dashboard from "@/components/dashboard/Dashboard.vue"
import Entity from "@/components/entity/Entity.vue"
import Home from "@/views/Home.vue"


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/about",
        name: "about",
        component: About
      },
      {
        path: "/entity/:id",
        name: "entity",
        component: Entity
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "dashboard" }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
