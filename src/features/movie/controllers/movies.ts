import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { movieService } from '@root/services/db/movie.service';
import Movie from '@movie/models/movie.schema';
import Rating from '@rating/models/rating.schema';
import Logger from 'bunyan';
import { config } from '@root/config';
const log: Logger = config.createLogger('Movies');
export class Movies {
  public async create(req: Request, res: Response): Promise<void> {
    const { userName, rating, tmdbId } = req.body;
    movieService.saveMovie(rating, tmdbId, userName).then(() => {
      res.status(HTTP_STATUS.CREATED).json({ message: 'Movie has been created !!' });
    });
  }

  public async getReviewsByTmbdId(req: Request, res: Response): Promise<any> {
    try {
      const { tmdbId } = req.params;

      // Find the movie by tmdbId including associated ratings
      const movie = await Movie.findOne({
        where: { tmdbId },
        include: [{ model: Rating }]
      });

      if (!movie) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Movie not found' });
      }

      res.json(movie);
    } catch (error: any) {
      log.error(error);

      // Handle specific Sequelize validation error (e.g., unique constraint violation)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Duplicate entry' });
      }

      // Handle other errors
      res.status(HTTP_STATUS.BAD_GATEWAY).json({ message: 'Internal Server Error' });
    }
  }
}
