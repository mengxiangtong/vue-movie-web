import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(Router)//挂载属性

//要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
//定义 路径到 组件的 映射。
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	//一个个对象
    movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
    {
      path : '/*',
      redirect : '/movie'
    }
  ]
})
