import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import {basicAuth} from '../controllers/auth'
import * as model from "../models/catpost"
import {validateArticle} from '../controllers/validation';
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
  await next();
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
  await next();
}

//add catpost
const createpost = async (ctx:RouterContext,next:any)=>{
  const body = ctx.request.body;
  const result = await model.add(body);
  if(result.status ==201){
    ctx.status = 201;
    ctx.body = body;
  }else{
    ctx.status = 500;
    ctx.body = {err:"create new post failed!"}
  }
  await next();
}


//update catpost
const updatecat = async(ctx:RouterContext,next:any)=>{
  const id = ctx.params.id;
  const body = ctx.request.body;
  const result = await model.update(id,body);
  if(result.status==201){
    ctx.status = 201;
    ctx.body = body;
  }else{
    ctx.status = 200;
    ctx.body = {err:"updata catpost failed!"}
  }
  await next();
}

//update catpost
const deletecat = async(ctx:RouterContext,next:any)=>{
  const id = ctx.params.id;
  //const body = ctx.request.body;
  const result = await model.del(id);
  if(result.status==201){
    ctx.status = 201;
    //ctx.body = body;
    ctx.body = 'delete successful';
  }else{
    ctx.status = 200;
    ctx.body = {err:"delete catpost failed!"}
  }
  await next();
}

const staffregister = async(ctx:RouterContext,next:any)=>{
  
}

//use api
router.get('/',getAll);
router.get('/:id([0-9]{1,})',getId);
router.get('/:breed',getByBreed);
router.post('/',validateArticle,basicAuth,bodyParser(),createpost);
router.put('/:id([0-9]+)',validateArticle,basicAuth,bodyParser(),updatecat);
router.del('/:id([0-9]+)',basicAuth,bodyParser(),deletecat);
router.post('/register',bodyParser(),staffregister)
export{router};