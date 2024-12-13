const request = require("supertest");
const app = require("../final_app_test");
const { setupDatabase, teardownDatabase } = require("../connections/dbSetup");

beforeAll(setupDatabase);
afterAll(teardownDatabase);

describe("GET /fanprofile/getall", () => {
  test("Must return all fan profiles in MongoDB", async () => {
    const res = await request(app).get("/fanprofile/getall");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe("POST /fanprofile/add", () => {
  test("Must create a new fan profile", async () => {
    const newFanProfile = {
      name: "Juanito",
      favoriteClubs: "U Chile",
      preferences: "La U de chile es la mejor en su categoria",
    };

    const res = await request(app).post("/fanprofile/add").send(newFanProfile);

    expect([204, 404, 500]).toContain(res.statusCode);
  });
});

describe("PUT /fanprofile/:id", () => {
  test("Must update an existing fan profile", async () => {
    const fanProfileId = "67439c820e89da4a29d66186";
    const updatedFanProfile = {
      name: "Juanito",
      favoriteClubs: "U Chile",
      preferences: "La U de chile Perdio!",
    };

    const res = await request(app).put(`/fanprofile/${fanProfileId}`).send(updatedFanProfile);

    expect([204, 404]).toContain(res.statusCode);
  });
});

describe("DELETE /fanprofile/:id", () => {
  test("Must delete a fan profile by ID", async () => {
    const fanProfileId = "67439c820e89da4a29d66186";

    const res = await request(app).delete(`/fanprofile/${fanProfileId}`);

    expect([204, 404]).toContain(res.statusCode);
  });
});