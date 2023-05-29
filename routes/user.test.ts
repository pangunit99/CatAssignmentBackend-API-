import request from "supertest";
import Koa from "koa";
import json from "koa-json"
import {router} from "../routes/user"
import passport from "koa-passport"


const app : Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3005);

describe("POST / - user login" , () => {
  test('POST user login', async () =>{
    const result = await request(app.callback()).post('/api/v1/user/ulogin')
      .auth('fong123','as42213')
       expect(result.statusCode).toEqual(201);
  },70000);
});

describe("get / - get profile" , () => {
  test('get profile', async () =>{
    const result = await request(app.callback()).get('/api/v1/user/fong123')
       expect(result.statusCode).toEqual(200);
  },70000);
});

describe("POST / - add favourite" , () => {
  test('add favourite', async () =>{
    const result = await request(app.callback()).post('/api/v1/user/12')
      .auth('fong123','as42213')
      .send({"userid":'2'})
       expect(result.statusCode).toEqual(201);
  },70000);
});

