/* eslint-disable sort-imports */
import "./styles/tailwind.css"
import "animate.css"

import App from "./App.vue"
import { createApp } from "vue"
import router from "./router"
import store from "./store"
import icons from "@/plugins/icons.js"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faUserSecret, faVolumeHigh , faPenToSquare} from "@fortawesome/free-solid-svg-icons"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

library.add(faUserSecret, faVolumeHigh, faPenToSquare)

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(store)
app.use(router)
app.use(icons)
app.mount("#app")
