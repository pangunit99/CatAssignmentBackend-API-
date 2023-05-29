import request from "supertest";
import Koa from "koa";
import json from "koa-json"
import {router} from "../routes/favourite"
import passport from "koa-passport"


const app : Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3002);

describe("Get /id - get users favourite by userid", () => {
  test("get users favourite by userid", async () => {
    const result = await request(app.callback()).get("/api/v1/favourite/1");
    expect(result.statusCode).toEqual(200);
  });
});
