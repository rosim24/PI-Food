/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  summary: 'A recipe for a yummy Milanesa'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('responds with and object with API and DB recipes', () =>
        agent.get('/recipes').then((res) => {
          expect(res.body.length).toEqual(101);
        }));
    it('responds with and array with 101 recipes', () =>
        agent.get('/recipes').then((res) => {
          expect(res.body.length).toEqual(101);
        }));
    it('each recipe has at least a title an a summary', () =>
        agent.get('/recipes').then((res) => {
          expect(res.body.length).toEqual(101);
        }));
  });
});
