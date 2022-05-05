const request = require("supertest");
const { Category } = require("../../models/category");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;

describe("/api/categories", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Category.remove({});
  });
  describe("GET /", () => {
    it("should return all categories", async () => {
      await Category.collection.insertMany([
        { name: "dasturlash asoslari" },
        { name: "tarmoqlar" },
        { name: "dizayn" },
      ]);

      let response = await request(server).get("/api/categories");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body.some((cat) => cat.name == "dizayn")).toBeTruthy();
    });
    it("should return 404 if no category with the passed id exist", async () => {
      const categoryId = mongoose.Types.ObjectId();
      const response = await request(server).get(
        "/api/categories/" + categoryId
      );
      expect(response.status).toBe(404);
    });
  });
  describe("get /:id", () => {
    it("should return a category if valid id is given", async () => {
      const category = new Category({ name: "sun'iy idrok" });
      await category.save();

      const response = await request(server).get(
        "/api/categories/" + category._id
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "sun'iy idrok");
    });
    it("should return 404 if invalid id is given", async () => {
      const response = await request(server).get("/api/categories/123");
      expect(response.status).toBe(404);
    });
    it("should return 404 if no category with the passed id exists", async () => {
      categoryId = mongoose.Types.ObjectId();
      const response = await request(server).get("/api/categories/"+categoryId);
      expect(response.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    beforeEach(() => {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZkNTUxYTZlZjY5NDQyNGM3MWYwNTMiLCJpYXQiOjE2NTEzMzI1NDZ9.fR9pRKTS-xNDLp-vKYe-Ru9QlvkBv8ydaRCz1_5wzA4";
        name = "dasturlash";
      });
  
    // testlar uchun ishlatiladigan funktsiyani bu yerda oldindan
    // aniqlab olamiz va uni har bir test ichida alohida chaqiramiz
    const execute = async () => {
      return await request(server)
      .post("/api/categories")
      .set("x-authToken", token)
      .send({ name })
    };
    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await execute();
      expect(res.status).toBe(401);
    });

    it("should return 400 if category name is less than 3 characters", async () => {
      name = "12";
      const res = await execute();
    //   console.log(res)
      expect(res.status).toBe(400);
    });

    it("should return 400 if category name is more than 50 characters", async () => {
      name = new Array(52).join("c");
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should save the category if it is valid", async () => {
      await execute();
      const category = await Category.find({ name: "dasturlash" });
      expect(category).not.toBeNull();
    });

    it("should return the category if it is valid", async () => {
      const res = await execute();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "dasturlash");
    });
  });
});
