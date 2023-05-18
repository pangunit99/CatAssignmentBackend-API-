import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/user"
import {basicAuth} from '../controllers/auth'
const router = new Router({prefix:'/api/v1/user'});
import {userAuth} from '../controllers/userauth'


//create new staff
const staffregister = async(ctx:RouterContext,next:any)=>{
  const reg = ctx.params.reg;
  const body = ctx.request.body;
  const result = await model.addstaff(body);
  if(result.status == 201){
    ctx.status = 201;
    ctx.body = body;
  }else{
    ctx.status = 500;
    ctx.body = {err:'failed register'}
  }
  await next();
}

//user register
const adduser = async(ctx:RouterContext,next:any)=>{
  const userreg = ctx.request.body;
  const result = await model.adduser(userreg);
  if(result.status == 201){
    ctx.status = 201;
    ctx.body = result;
  }else{
    ctx.status = 500;
    ctx.body = {err:'failed register'}
  }
  await next();
}

const ulogin=async(ctx:RouterContext,next:any)=>{
  const slogin = ctx.request.body;
  const result = await model.ulogin(slogin);
  if(result.status == 201){
    ctx.status = 201;
    ctx.body = result;
  }else{
    ctx.status = 500;
    ctx.body = {err:'failed login'}
  }
  await next;
}


//user like
/*const addlike = async(ctx:RouterContext,next:any)=>{
  const catpostid = ctx.params.id;
  const userid = ctx.cookie
  
  await next();
}*/




router.post('/staff',bodyParser(),staffregister);
router.post('/user',bodyParser(),adduser);
router.get('/login',basicAuth,bodyParser())
router.get('/ulogin',userAuth,bodyParser())
export{router};