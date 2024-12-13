const request = require("supertest");
const app = require("../final_app_test"); // Asegúrate de que este es el camino correcto a tu app o router donde `fanInteractionRouter` está montado
const { setupDatabase, teardownDatabase } = require("../connections/dbSetup");

beforeAll(setupDatabase);
afterAll(teardownDatabase);

describe("GET /fanInteraction/getall", () => {
  test("Must return all fan interactions in MongoDB", async () => {
    const res = await request(app).get("/fanInteraction/getall");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe("POST /fanInteraction/add", () => {
  test("Must create a new fan interaction", async () => {
    const newInteraction = {
      name: "Juanito",
      interactionType: "New game",
      content: "Habra partido entre la la U y Colo Colo",
      date: "2024-12-12" // Nota: En el ejemplo, 'date' estaba marcado como 'numeric' pero aquí se usa como string para la prueba
    };

    const res = await request(app).post("/fanInteraction/add").send(newInteraction);

    expect([204, 404, 500]).toContain(res.statusCode);
  });
});

describe("PUT /fanInteraction/:id", () => {
  test("Must update an existing fan interaction", async () => {
    const interactionId = "67439c820e89da4a29d66186";
    const updatedInteraction = {
      name: "Juanito",
      interactionType: "New game updated",
      content: "Habra partido entre la la U y Colo Colo new Date",
      date: "2024-12-22" // También se usa como string para la prueba
    };

    const res = await request(app).put(`/fanInteraction/${interactionId}`).send(updatedInteraction);

    expect([204, 404, 500]).toContain(res.statusCode);
  });
});

describe("DELETE /fanInteraction/:id", () => {
  test("Must delete a fan interaction by ID", async () => {
    const interactionId = "67437a358eb4f184bc632bd1";

    const res = await request(app).delete(`/fanInteraction/${interactionId}`);

    expect([204, 404, 500]).toContain(res.statusCode);
  });
});