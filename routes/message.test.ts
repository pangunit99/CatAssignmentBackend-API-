import request from "supertest";
import Koa from "koa";
import json from "koa-json"
import {router} from "../routes/message"
import passport from "koa-passport"


const app : Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3003);

describe("Get / - staff get all message", () => {
  test("Get all message", async () => {
    const result = await request(app.callback()).get("/api/v1/message/");
    expect(result.statusCode).toEqual(200);
  },70000);
});

describe("Get /id - get message by id", () => {
  test("get message by message id", async () => {
    const result = await request(app.callback()).get("/api/v1/message/1");
    expect(result.statusCode).toEqual(200);
  },70000);
});

describe("Get /id - user get their send message ", () => {
  test("user get their send message", async () => {
    const result = await request(app.callback()).get("/api/v1/message/fong123");
    expect(result.statusCode).toEqual(200);
  },70000);
});

describe("POST / - send message" , () => {
  test('POST new catpost', async () =>{
    const result = await request(app.callback()).post('/api/v1/message/')
      .auth('fong123','as42213')
      .send({'username':'fong123',
              'question':'hi, i am send the message last month.'
            });
       expect(result.statusCode).toEqual(201);
  },70000);
});

describe("PUT / - update catpost" , () => {
  test('PUT and catpost', async () =>{
    const result = await request(app.callback()).put('/api/v1/message/1')
      .auth('staff001','abc123')
      .send({
             'answer':'ok you can call xxxxxxx8 to talk more detail!'
            });
       expect(result.statusCode).toEqual(201);
  },70000);
});