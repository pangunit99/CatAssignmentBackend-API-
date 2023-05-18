import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import {RouterContext} from "koa-router";
import * as users from '../models/user'

const verifyPassword = (user:any,password:string)=>{
  return user.password === password;
}

passport.use(new BasicStrategy(async (username,password,done)=>{
  let result :any [] = [];
  try {
    result = await users.findUser(username)
  }catch(error){
    console.error(`Error during authentication for user ${username}: ${error}`);
    done(null,false);
  }
  if(result.length){
    const user = result[0];
    if(verifyPassword(user,password)){
      done(null,{user:user});
    }else{
      console.log(`password incorrect for ${username}`);
      done(null,false)
    }
  }else{
    console.log(`No user found with username ${username}`);
    done(null, false);
  }
}))

export const userAuth = async (ctx:RouterContext,next:any)=>{
  await passport.authenticate("basic", {session:false})(ctx,next);
  if(ctx.status == 401){
    ctx.status=401;
    ctx.body = {
      message:'you are not authorized'
    };
  }else{
    ctx.status=201;
    ctx.body = {
      message:'you are passed'
    };
    await next
  }
}
