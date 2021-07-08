const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const databaseService = require('../src/databaseService')
const STORE = require('../dummy-store')

describe('Spaces Endpoints', () => {
    let db;

    before("make knex instance", () => {
        db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
        });
        app.set("db", db);
    });

    after("disconnect from test database", () => db.destroy());

    it('should return a message from GET /api/', () => {
        return supertest(app)
            .get('/api/')
            .expect(200, 'Database Endpoint Homepage')
    });

    it('GET /api/spaces - given that there is at least one space', () => {
        return supertest(app)
            .get('/api/spaces')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const result = res.body;
                expect(result[0]).to.include.all.keys(
                    'id','name','address','city','type','upcount','downcount'
                );
            });
    });

    it('POST /api/spaces', () => {
        const newSpace = {
            "name": "test location",
            "address":"123 place lane",
            "city":"Toronto",
            "type": "Restaurant"
        }

        return supertest(app)
            .post('/api/spaces')
            .send(newSpace)
            .expect(201,newSpace)
    })

    it('PATCH /api/spaces/:id - given the id exists', () => {
        const updatedInfo = {
            "id": 1,
            "upcount":2,
            "downcount":2
        }

        return supertest(app)
            .patch(`/api/spaces/${updatedInfo.id}`)
            .send(updatedInfo)
            .expect(201,updatedInfo)

    })
});
