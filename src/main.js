import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
