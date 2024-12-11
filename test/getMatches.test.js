const token = 'TU_TOKEN_DE_ACCESO_PERSONAL_AQUÍ';


const request  = require("supertest");
const app = require('../final');

describe('GET /matches/getall' , ()=>{

    test('Must return a all matches in MongoDB', async()=>{
        const res = await request(app).get('/matches/getall');
        expect(res.statusCode).toEqual(204);
        expect(res.body).toBeInstanceOf(Array);




    });

});
