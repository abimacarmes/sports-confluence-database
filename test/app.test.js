const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');

describe('Games & Players Endpoints', () => {
    let db;

    before("make knex instance", () => {
        db = knex({
        client: "pg",
        connection: 'postgresql://postgres@localhost/sports-confluence-database-test',
        });
        app.set("db", db);
    });

    after("disconnect from test database", () => db.destroy());

    it('should return a message from GET /api/', () => {
        return supertest(app)
            .get('/api/')
            .expect(200, 'Sports Confluence App - Database Endpoint Homepage')
    });

    it('GET /api/games - given that there is at least one game', () => {
        return supertest(app)
            .get('/api/games')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const result = res.body;
                expect(result[0]).to.include.all.keys(
                    'game_id','name','sport','location_name','address','players','date'
                );
            });
    });

    it('GET /api/players - given that there is at least one player', () => {
        return supertest(app)
            .get('/api/players')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const result = res.body;
                expect(result[0]).to.include.all.keys(
                    'player_id','name','level','comment','game_id'
                );
            });
    });

    it('POST /api/games', () => {
        const newGame = {
            "name":"crush em football",
            "sport": "Football",
            "location_name":"Park Park",
            "address":"123 place lane, Vancouver",
            "players": 12,
            "date":"08/08/2021"
        }

        return supertest(app)
            .post('/api/games')
            .send(newGame)
            .expect(201,newGame)
    });

    it('POST /api/players', () => {
        const newPlayer = {
            "name":"test",
            "level":"Beginner",
            "comment":"Test comment",
            "game_id":1
        }

        return supertest(app)
            .post('/api/players')
            .send(newPlayer)
            .expect(201, newPlayer)
    })
});
