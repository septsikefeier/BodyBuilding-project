import { Vue, Common, i18n} from 'js/base'
import  router from './router/loginRouter.js'
import store from '../../vuex/store'
import app from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../assets/scss/base/_necessary.scss'

require("./scss/login.scss")
Vue.prototype.$Common = Common

Vue.use(ElementUI)
 new Vue({
  el: '#login',
  store,
  router,
  template: '<app></app>',
  components: {
    'app': app
  }
})

router.push("/login/loginView")
