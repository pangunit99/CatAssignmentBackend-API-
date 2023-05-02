import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/user"

const router = new Router({prefix:'/api/v1/user'});

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
    ctx.body = userreg;
  }else{
    ctx.status = 500;
    ctx.body = {err:'failed register'}
  }
  await next();
}


//user like
/*const addlike = async(ctx:RouterContext,next:any)=>{
  const catpostid = ctx.params.id;
  const userid = ctx.cookie
  
  await next();
}*/



router.post('/staff',bodyParser(),staffregister);
router.post('/user',bodyParser(),adduser);

export{router};