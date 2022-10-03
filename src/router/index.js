import { createRouter, createWebHistory } from "vue-router"
import About from "@/components/about/About.vue"
import air_conditioner from "@/components/Entities/air_conditioner.vue"
import bedroom_light1 from "@/components/Entities/bedroom_light_1.vue"
import bedroom_switch from "@/components/Entities/bedroom_switch_1.vue"
import Dashboard from "@/components/dashboard/Dashboard.vue"
import Home from "@/views/Home.vue"
import Kitchen_Light_1 from "@/components/Entities/Kitchen_Light_1.vue"
import Living_Room from "@/components/Entities/Living_room_light_1.vue"
import Living_Room2 from "@/components/Entities/Living_room_light_2.vue"
import television from "@/components/Entities/television.vue"
import Thermometer from "@/components/Entities/Thermometer.vue"



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
      }
    ]
  },
  {
    path: "/thermometer",
    name: "thermometer",
    component: Thermometer
  },
  {
    path: "/kitchen_light1",
    name: "kitchen_light1",
    component: Kitchen_Light_1
  },
  {
    path: "/livingroomlight1",
    name: "livingroomlight1",
    component: Living_Room
  },
  {
    path: "/livingroomlight2",
    name: "livingroomlight",
    component: Living_Room2
  },
  {
    path: "/television",
    name: "television",
    component: television
  },
  {
    path: "/bedroom_switch",
    name: "bedroom_switch",
    component: bedroom_switch
  },
  {
    path: "/bedroom_light",
    name: "bedroom_light1",
    component: bedroom_light1
  },
  {
    path: "/air_conditioner",
    name: "air_conditioner",
    component: air_conditioner
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
