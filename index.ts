import Koa from "koa";
import Router, {RouterContext} from "koa-router"
import logger from "koa-logger"
import json from "koa-json"
import {router as catpost} from "./routes/catpost"
import {router as user} from "./routes/special"
import serve from 'koa-static-folder';
import cors from '@koa/cors'

import passport from "koa-passport"
const app : Koa = new Koa();



app.use(cors())
app.use(serve('./docs'))
app.use(logger());
app.use(json());
app.use(passport.initialize())
//app.use(router.routes());
app.use(articles.routes())

app.use(user.routes())
app.listen(10888);