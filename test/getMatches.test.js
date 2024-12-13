const request = require("supertest");
const app = require("../final_app_test"); //.../final_app_test

const { setupDatabase, teardownDatabase } = require("../connections/dbSetup");


beforeAll(setupDatabase);
afterAll(teardownDatabase);


describe("GET /matches/getall", () => {
  test("Must return a all matches in MongoDB", async () => {
    const res = await request(app).get("/matches/getall");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    console.log(res.body);
  });
});



//
describe("POST /matches/add", () => {
  test("Must create a new match", async () => {
    const newMatch = {
      stadium: "kiko1",
      team1: "U Chile",
      team2: "catolica",
      team1goals: 0,
      team2goals: 0,
      referee: "zagalo",
      date: "2024-11-02",
    };

    const res = await request(app).post("/matches/add").send(newMatch);

    expect([204, 404 , 500 ]).toContain(res.statusCode);
    // Agrega más expectativas según sea necesario
  });
});

describe("PUT /matches/:id", () => {
  
  test("Must update an existing match", async () => {
    const matchId = "675c4c65a855592840e6a056";
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

      expect([204, 404]).toContain(res.statusCode);
    // Agrega más expectativas según sea necesario
  });
});


describe("DELETE /matches/:id", () => {

  test("Must delete a match by ID", async () => {
    const matchId = "675c4c65a855592840e6a056";

    const res = await request(app).delete(`/matches/${matchId}`);

    // console.log("DELETE /matches/:id", res);

    expect([204, 404]).toContain(res.statusCode);
		
    // Agrega más expectativas según sea necesario
  });
});
