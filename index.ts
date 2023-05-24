import Koa from "koa";
import Router, {RouterContext} from "koa-router"
import logger from "koa-logger"
import json from "koa-json"
import {router as catpost} from "./routes/catpost"
import {router as userauth} from "./routes/user"
import {router as basicauth} from "./routes/staff"
import {router as favour} from "./routes/favourite"
import serve from 'koa-static-folder';
import cors from '@koa/cors'

import passport from "koa-passport"
const app : Koa = new Koa();



app.use(cors());
app.use(serve('./docs'));
app.use(logger());
app.use(json());
app.use(passport.initialize());
app.use(catpost.routes());
app.use(basicauth.routes());
app.use(userauth.routes());
app.use(favour.routes());

app.listen(10888);