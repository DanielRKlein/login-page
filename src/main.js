import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft, faBan, faBars, faChevronDown, faChevronUp, faEye, faEyeSlash, faFilter, faPen, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import store from './store'

/* add icons to the library */
library.add(faEye, faEyeSlash, faXmark, faFilter, faChevronDown, faChevronUp, faBan, faSquareCheck, faPen, faBars, faArrowLeft)


createApp(App).use(store).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')

