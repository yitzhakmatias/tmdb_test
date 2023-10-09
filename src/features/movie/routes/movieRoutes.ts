import express, { Router } from 'express';
import { Movies } from '@movie/controllers/movies';
class MovieRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routers(): Router {
    this.router.post('/reviews', Movies.prototype.create);
    this.router.get('/movies/:tmdbId/reviews', Movies.prototype.getReviewsByTmbdId);

    return this.router;
  }
}
export const movieRoutes: MovieRoutes = new MovieRoutes();
