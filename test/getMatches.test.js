const token = "TU_TOKEN_DE_ACCESO_PERSONAL_AQUÍ";

const request = require("supertest");
const app = require("../final_app_test"); //.../final_app_test

const { setupDatabase, teardownDatabase } = require("../connections/dbSetup");

describe("GET /matches/getall", () => {
  beforeAll(setupDatabase);
  afterAll(teardownDatabase);

  test("Must return a all matches in MongoDB", async () => {
    const res = await request(app).get("/matches/getall");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

//
describe("POST /matches/add", () => {
  beforeAll(setupDatabase);
  afterAll(teardownDatabase);

  test("Must create a new match", async () => {
    const newMatch = {
      _id: "67439c820e89da4a29d66186",
      stadium: "Salsalito",
      team1: "U Chile",
      team2: "catolica",
      team1goals: 0,
      team2goals: 0,
      referee: "Pelado Acosta",
      date: "2024-11-02",
    };

    const res = await request(app).post("/matches/add").send(newMatch);

    expect(res.statusCode).toEqual(204);
    // Agrega más expectativas según sea necesario
  });
});

describe("PUT /matches/:id", () => {
  beforeAll(setupDatabase);
  afterAll(teardownDatabase);

  test("Must update an existing match", async () => {
    const matchId = "67439c820e89da4a29d66186";
    const updatedMatch = {
      stadium: "Updated Stadium",
      team1: "Updated Team 1",
      team2: "Updated Team 2",
      team1goals: 1,
      team2goals: 1,
      referee: "Updated Referee",
      date: "2024-12-03",
    };

    const res = await request(app)
      .put(`/matches/${matchId}`)
      .send(updatedMatch);

    expect(res.statusCode).toEqual(204);
    // Agrega más expectativas según sea necesario
  });
});

describe("DELETE /matches/:id", () => {
  beforeAll(setupDatabase);
  afterAll(teardownDatabase);

  test("Must delete a match by ID", async () => {
    const matchId = "67439c820e89da4a29d66186";

    const res = await request(app).delete(`/matches/${matchId}`);

    expect(res.statusCode).toEqual(204);
    // Agrega más expectativas según sea necesario
  });
});
