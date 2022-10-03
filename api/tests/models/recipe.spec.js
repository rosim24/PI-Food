const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if summary is null', (done) => {
        Recipe.create({name: 'Chicken fingers'})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      })
      it('should throw an error if the Health Score is greater than 100', (done) => {
        Recipe.create({name:'Chicken Finger', summary: 'The best chicken fingers ever', healthScore: "120"})
          .then(() => done(new Error('The Health Score should not be greater than 100')))
          .catch(() => done());
      })
      it('should work when its a valid name and summary', (done) => {
        Recipe.create({ name: 'Milanesa a la napolitana', summary: 'The best chicken fingers ever' })
          .then(()=>done());
      });
    });
  });
});
