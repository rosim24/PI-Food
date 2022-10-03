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
      agent.get('/recipes').then((res) => {
        expect(res.statusCode).equal(200)
      })
    );
    it('responds with and object with API and DB recipes', () =>
        agent.get('/recipes').then((res) => {
          expect(res.body.length).equal(101);
        }));
  });
  describe('GET /recipes/:id', () =>{
    it('should return a status code of 404 if de id is not valid', () => {
        agent.get('/recipes/wrongid').then((res)=>{
          expect(res.statusCode).equal(404)
        })
    });
    it('should return an object if the id is valid', () => {
      agent.get('/recipes/716426').then((res) => {
        expect(res.body).to.be.an('object')
      })
    });
  });
  describe('GET /recipes?name', () =>{
      it('should return an array with the results', () => {
        agent.get('/recipes?name=rice').then((res) => {
          expect(res.body).to.be.an('array')
        })
      });
  });
  describe('POST /recipes', () => {  
    it('Must return a status code 200 when receiving at least a name and a summary', () => {
        agent.post('/recipes').send(
        {
          name: 'Chicken Tenders', 
          summary: 'The yummiest chicken fingers you will ever try ', 
          steps:['chop','season','fry'],
          diets: ['paleolithic']
        }).then((res) => {
          expect(res.statusCode).equal(200);
      })
    })  

    it('Must return a Status code 400 when receiving values in the wrong format', () => {
        agent.post('/recipes').send(
        {
          name: 'Chicken Tenders', 
          summary: 'The yummiest chicken fingers you will ever try ', 
          diets: 'paleolithic'
        }).then((res) => {
          expect(res.statusCode).equal(400);
      }) 
    })

    it('Should return a Status code 400 when missing name or summary', () => {
        agent.post('/recipes').send({name: 'Chicken Tenders'}).then((res) => {
          expect(res.statusCode).equal(400);
        });
      })
  });
});