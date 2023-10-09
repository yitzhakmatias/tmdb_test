import { Request, Response } from 'express';
import Movie from '@movie/models/movie.schema';
import Rating from '@rating/models/rating.schema';
import HTTP_STATUS from 'http-status-codes';
import Logger from 'bunyan';
import { config } from '@root/config';
const log: Logger = config.createLogger('RatingController');
export class Ratings {
  public async getReviewsByUserName(req: Request, res: Response): Promise<any> {
    try {
      const { userName } = req.params;

      // Find all ratings by userName
      const ratings = await Rating.findAll({
        where: { userName },
        include: [{ model: Movie }]
      });

      if (!ratings.length) {
        return res.status(404).json({ message: 'No reviews found for this user' });
      }

      res.json(ratings);
    } catch (error) {
      log.error(error);
      res.status(HTTP_STATUS.BAD_GATEWAY).json({ message: 'Internal Server Error' });
    }
  }
}
