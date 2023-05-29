import request from "supertest";
import Koa from "koa";
import json from "koa-json"
import {router} from "../routes/staff"
import passport from "koa-passport"


const app : Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3004);

describe("POST / - login" , () => {
  test('POST login', async () =>{
    const result = await request(app.callback()).post('/api/v1/staff/login')
      .auth('staff001','abc123')
       expect(result.statusCode).toEqual(201);
  },70000);
});

describe("get / - get profile" , () => {
  test('get profile', async () =>{
    const result = await request(app.callback()).get('/api/v1/staff/staff001')
       expect(result.statusCode).toEqual(201);
  },70000);
});

