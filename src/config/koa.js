const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = require('../app/index')
const routes =  require('../routes/index')
const Router = require('koa-router')


const koa = new Koa();

const App = {router: new Router(), ...app}
const router = App.router

routes(App)




koa.use(bodyparser())
koa.use(router.routes()).use(router.allowedMethods());



module.exports = koa