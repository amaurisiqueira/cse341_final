const token = 'TU_TOKEN_DE_ACCESO_PERSONAL_AQUÍ';


const request  = require("supertest");
const app = require('../final_app_test'); //.../final_app_test


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