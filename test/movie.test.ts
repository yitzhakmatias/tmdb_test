import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { application } from '@root/app';
import Movie from '@movie/models/movie.schema';
import Rating from '@rating/models/rating.schema';
//import sequelize from '@root/setupDb';
chai.use(chaiHttp);
const expect = chai.expect;
const app = application.initialize();
describe('API Tests', () => {
  before(async () => {
    // Set up any necessary database fixtures before running tests
    // Example: Insert sample movies and ratings

    await Movie.bulkCreate([
      {
        tmdbId: '12345',
        title: 'Sample Movie 1',
        releaseDate: new Date(),
        poster: 'poster1.jpg',
        overview: 'Overview for Sample Movie 1'
      },
      {
        tmdbId: '67890',
        title: 'Sample Movie 2',
        releaseDate: new Date(),
        poster: 'poster2.jpg',
        overview: 'Overview for Sample Movie 2'
      }
    ]);
    const movies: Movie[] = await Movie.findAll();
    const id1 = movies[0].get('id');
    const id2 = movies[1].get('id');
    await Rating.bulkCreate([
      {
        userName: 'user1',
        rating: 5,
        movieId: typeof id1 === 'string' ? parseInt(id1) : 0 // Assuming this corresponds to the first movie
      },
      {
        userName: 'user2',
        rating: 4,
        movieId: typeof id1 === 'string' ? parseInt(id1) : 0
      },
      {
        userName: 'user3',
        rating: 3,
        movieId: typeof id2 === 'string' ? parseInt(id2) : 0 // Assuming this corresponds to the second movie
      }
    ]);
    //await sequelize.sync({ force: true });
  });

  after(async () => {
    // Clean up any database fixtures after running tests
    // Example: Delete the inserted sample data
    await Movie.destroy({ where: { tmdbId: ['12345', '67890'] } });
    await Rating.destroy({ where: { userName: ['user1', 'user2', 'user3'] } });
  });

  describe('GET /movies/:tmdbId/reviews', () => {
    it('should return movie information along with reviews', async () => {
      const response = await chai.request(app).get('/movies/:tmdbId/reviews'); // Replace :tmdbId with an actual value

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('tmdbId');
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('releaseDate');
      expect(response.body).to.have.property('poster');
      expect(response.body).to.have.property('overview');
      expect(response.body).to.have.property('Ratings');
    });

    it('should return 404 for a non-existent movie', async () => {
      const response = await chai.request(app).get('/movies/nonexistent/reviews');

      expect(response).to.have.status(404);
      expect(response.body).to.have.property('message', 'Movie not found');
    });
  });

  describe('GET /users/:userName/reviews', () => {
    it('should return reviews submitted by a specific user', async () => {
      const response = await chai.request(app).get('/users/:userName/reviews'); // Replace :userName with an actual value

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      // Add more assertions as needed to validate the response structure
    });

    it('should return 404 for a user with no reviews', async () => {
      const response = await chai.request(app).get('/users/nonexistent/reviews');

      expect(response).to.have.status(404);
      expect(response.body).to.have.property('message', 'No reviews found for this user');
    });
  });
});
