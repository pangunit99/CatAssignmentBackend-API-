import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/user"

const router = new Router({prefix:'/api/v1/favourite'});


const myfav = async(ctx:RouterContext,next:any)=>{
  const uid = ctx.params.user;
  const myfavourite = await model.getfavourite(uid);
  if(myfavourite.length){
    ctx.body = myfavourite;
  }else{
    ctx.status = 404;
    ctx.body = {message:'you have not favourite cat'}
  }
  await next();
}


router.get('/:user([0-9]+)',bodyParser(),myfav)
export{router};