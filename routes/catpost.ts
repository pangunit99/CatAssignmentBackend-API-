import Router , {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"
import {userAuth} from '../controllers/userauth'
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
    ctx.status = 200;
  }else{
    ctx.status = 404;
  }
  await next();
}

//use type to get catpost
const getByBreed = async(ctx:RouterContext, next:any)=>{
  const breed = ctx.params.breed;
  console.log(breed);
  const catpost = await model.getBreed(breed);
  console.log(catpost);
  if(catpost.length){
    ctx.body = catpost;
  }else{
    ctx.status = 404;
    console.log(catpost.length);
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




//use api
router.get('/',getAll);
router.get('/:id([0-9]+)',getId);
router.get('/b:breed([A-z]+)',getByBreed);
router.post('/',validateArticle,userAuth,bodyParser(),createpost);
router.put('/:id([0-9]+)',validateArticle,userAuth,bodyParser(),updatecat);
router.del('/:id([0-9]+)',userAuth,bodyParser(),deletecat);


export{router};