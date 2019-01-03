import Vue from 'vue'
import {
  Card,
  Row,
  Col,
  Button,
  Select,
  Option,
  Input,
  Message
} from 'element-ui'
import Popup from './Popup.vue'
import request from './util/request'

Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)

Vue.prototype.$message = Message

Vue.prototype.$request = request

new Vue({
  el: '#app',
  render: h => h(Popup)
})