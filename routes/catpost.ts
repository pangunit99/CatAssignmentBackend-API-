import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import * as model from "../models/catpost"

const router = new Router({prefix:'/api/v1/catpost'});

//get all post about cat
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
//use id get catpost
const getId = async(ctx:RouterContext, next:any)=>{
  const id = ctx.params.id;
  const catpost = await model.getID(id);
  if(catpost.length){
    ctx.body = catpost[0]
  }else{
    ctx.status = 404;
  }
}

//use type to get catpost
const getByBreed = async(ctx:RouterContext, next:any)=>{
  const breed = ctx.params.breed;
  const catpost = await model.getBreed(breed);
  if(catpost.length){
    ctx.body = catpost;
  }else{
    ctx.status = 404;
  }
}


//use api
router.get('/',getAll);
router.get('/:id([0-9]{1,})',getId);
router.get('/:breed',getByBreed);
export{router};