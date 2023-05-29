import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/message"
import {userAuth} from '../controllers/userauth'

const router = new Router({prefix:'/api/v1/message'});

//insert new message
const sendmessage = async(ctx:RouterContext,next:any)=>{
  const body = ctx.request.body;
  const result = await model.createmessage(body);
  if(result.status == 201){
    ctx.status = 201;
    ctx.body = body;
  }else{
    ctx.status = 500;
    ctx.body = {err:'cannot send!'}
  }
  await next();
}

const answer = async(ctx:RouterContext,next:any)=>{
  const id = ctx.params.mid;
  const body = ctx.request.body;
  const result = await model.repeat(body,id);
  if(result.status == 201){
    ctx.status = 201;
    ctx.body = body;
  }else{
    ctx.status = 500;
    ctx.body = {err:'cannot send!'}
  }
  await next();
}

const getmyquestion = async(ctx:RouterContext,next:any)=>{
  const id = ctx.params.username;
  const result = await model.getmsg(id);
  ctx.body = result;
  await next();
}

const getallmsg = async(ctx:RouterContext,next:any)=>{
  const result = await model.getallmsg();
  ctx.body = result;
  await next();
}
const getmsgid = async(ctx:RouterContext,next:any)=>{
  const id = ctx.params.id;
  const result = await model.getmsgid(id);
  ctx.body = result;
  await next();
}

router.get('/',getallmsg)
router.get('/:id([0-9]+)',bodyParser(),getmsgid)
router.get('/:username([a-z0-9]+)',bodyParser(),getmyquestion)
router.post('/',userAuth,bodyParser(),sendmessage);
router.put('/:mid([0-9]+)',userAuth,bodyParser(),answer);

export{router};