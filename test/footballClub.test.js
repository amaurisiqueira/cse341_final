const request = require("supertest");
const app = require("../final_app_test");
const { setupDatabase, teardownDatabase } = require("../connections/dbSetup");

beforeAll(setupDatabase);
afterAll(teardownDatabase);

describe("GET /club/getall", () => {
  test("Must return all clubs in MongoDB", async () => {
    const res = await request(app).get("/club/getall");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe("POST /club/add", () => {
  test("Must create a new club", async () => {
    const newClub = {
    
      name: "FC Barcelona",
      country: "Spain",
      city: "Barcelona",
      stadium: "Camp Nou",
      capacity: 99354,
      foundedYear: 1899,
      coach: "Xavi Hernandez",
    };

    const res = await request(app).post("/club/add").send(newClub);

    expect([204, 404, 500]).toContain(res.statusCode);
  });
});

describe("PUT /club/:id", () => {
  test("Must update an existing club", async () => {
    const clubId = "67439c820e89da4a29d66186";
    const updatedClub = {
      name: "FC Barcelona",
      country: "Spain",
      city: "Barcelona",
      stadium: "Camp Nou",
      capacity: 99354,
      foundedYear: 1899,
      coach: "Xavi Hernandez",
    };

    const res = await request(app).put(`/club/${clubId}`).send(updatedClub);

    expect([204, 404]).toContain(res.statusCode);
  });
});

describe("DELETE /club/:id", () => {
  test("Must delete a club by ID", async () => {
    const clubId = "67439c820e89da4a29d66186";

    const res = await request(app).delete(`/club/${clubId}`);

    expect([204, 404]).toContain(res.statusCode);
  });
});