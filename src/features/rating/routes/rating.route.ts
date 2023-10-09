import express, { Router } from 'express';

import { Ratings } from '@rating/controllers/ratings';
class RatingRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routers(): Router {
    this.router.get('/users/:userName/reviews', Ratings.prototype.getReviewsByUserName);

    return this.router;
  }
}
export const ratingRoutes: RatingRoutes = new RatingRoutes();
