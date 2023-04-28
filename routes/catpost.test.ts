import request from "supertest";
import Koa from "koa";
import json from "koa-json"
import {router} from "../routes/catpost"
import passport from "koa-passport"

const app : Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

app.listen(3000);

describe("Get / - a simple api endpoint", () => {
  test("Get all catpost", async () => {
    const result = await request(app.callback()).get("/api/v1/catpost");
    expect(result.statusCode).toEqual(200);
  });
});

describe("Get /id - a simple api endpoint", () => {
  test("Get catpost by id", async () => {
    const result = await request(app.callback()).get("/api/v1/catpost");
    expect(result.statusCode).toEqual(200);
  });
});

describe("Get /breed - a simple api endpoint", () => {
  test("Get catpost by breed", async () => {
    const result = await request(app.callback()).get("/api/v1/catpost?breed=Aegean");
    expect(result.statusCode).toEqual(200);
  });
});
