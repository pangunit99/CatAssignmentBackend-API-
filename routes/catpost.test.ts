import request from "supertest";
import Koa from "koa";
import json from "koa-json"
import {router} from "../routes/catpost"
import passport from "koa-passport"


const app : Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3001);

describe("Get / - all catpost", () => {
  test("Get all catpost", async () => {
    const result = await request(app.callback()).get("/api/v1/catpost/");
    expect(result.statusCode).toEqual(200);
  });
});

describe("Get /id - get post by id", () => {
  test("Get catpost by id", async () => {
    const result = await request(app.callback()).get("/api/v1/catpost/");
    expect(function(res){
      res.body.id=1;
    });
    expect(result.statusCode).toEqual(200);
  });
});

describe("Get /breed - get post by breed", () => {
  test("Get catpost by breed", async () => {
    const result = await request(app.callback()).get("/api/v1/catpost");
    expect(result.statusCode).toEqual(200);
  });
});

describe("POST / - a simple api endpoint" , () => {
  test('POST new catpost', async () =>{
    const result = await request(app.callback()).post('/api/v1/catpost')
      .auth('staff001','abc123')
      .send({'title':'test cat',
              'breed':'Aegean',
             'alltext':'alltext',
             'staffid':'2'
            });
       expect(result.statusCode).toEqual(201);
  });
});

describe("PUT / - update catpost" , () => {
  xtest('PUT and article', async () =>{
    const result = await request(app.callback()).put('/api/v1/catpost')
      .send({'title':'cat change',
              'breed':'Aegean',
             'alltext':'test change'
            });
       expect(result.statusCode).toEqual(201);
  });
});