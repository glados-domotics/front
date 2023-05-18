/* eslint-disable sort-imports */

import "./styles/tailwind.css"
import "animate.css"

import App from "./App.vue"
import { createApp } from "vue"
import router from "./router"
import store from "./store"
import icons from "@/plugins/icons.js"
import mitt from "mitt"

const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(store)
app.use(router)
app.use(icons)
app.mount("#app")
