import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/user"
import {userAuth} from '../controllers/userauth'



const router = new Router({prefix:'/api/v1/user'});


//user register
const adduser = async(ctx:RouterContext,next:any)=>{
  const userreg = ctx.request.body;
  const result = await model.adduser(userreg);
  if(result.status == 201){
    ctx.status = 201;
    ctx.body = result[0];
  }else{
    ctx.status = 500;
    ctx.body = {err:'failed register'}
  }
  await next();
}

const profile=async(ctx:RouterContext,next:any)=>{
  const username = ctx.params.id;
  console.log(username);
  const result = await model.userp(username);
  if(result.length){
    ctx.body = result[0]
  }else{
    ctx.status = 401;
    ctx.body = {err:'load failed'}
  }
  await next();
}


//user like
const addfavourite = async(ctx:RouterContext,next:any)=>{
  const catpostid = ctx.params.id;
  const userid = ctx.request.body;
  const result = await model.addfav(catpostid,userid);
  if(result.status ==201){
    ctx.status = 201;
    ctx.body = result;
  }else{
    ctx.status = 500;
    ctx.body = {err:"add favourite fail!"}
  }
  
  await next();
}

const myfav = async(ctx:RouterContext,next:any)=>{
  const uid = ctx.params.id;
  const myfavourite = await model.getfavourite(uid);
  if(myfavourite.length){
    ctx.body = catpost;
  }else{
    ctx.status = 404;
    ctx.body = {message:'you have not favourite cat'}
  }
  await next();
}


router.post('/user',bodyParser(),adduser);
router.post('/ulogin',userAuth,bodyParser());
router.get('/:id([A-z0-9]+)',bodyParser(),profile)
router.post('/:id',bodyParser(),addfavourite)
router.get('/u:id([0-9]+)',bodyParser(),myfav)
export{router};