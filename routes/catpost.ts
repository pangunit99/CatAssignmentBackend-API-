import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/catpost"

const router = new Router({prefix:'/api/v1/catpost'});


const getAll = async(ctx:RouterContext,next:any)=>{
  //ctx.body = articles;
  const catpost = await model.getAll();
  if(catpost.length){
    ctx.body = catpost;
  }else{
    ctx.status = 404;
  }
  await next();
}


//use api
router.get('/',getAll);

export{router};