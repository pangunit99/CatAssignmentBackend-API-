import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/staff"
import {userAuth} from '../controllers/userauth'

const router = new Router({prefix:'/api/v1/staff'});

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


router.post('/staff',bodyParser(),staffregister);
router.post('/login',userAuth,bodyParser());

export{router};