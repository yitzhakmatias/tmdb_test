import Logger from 'bunyan';
import { config } from '@root/config';
import Movie from '@movie/models/movie.schema';
import Rating from '@rating/models/rating.schema';
import fetch from 'node-fetch';

const log: Logger = config.createLogger('server');

class MovieService {
  private async SaveMovieData(
    rating: number,
    tmdbId: string,
    userName: string,
    original_title: string,
    poster_path: string,
    release_date: Date,
    overview: string
  ): Promise<any> {
    try {
      Movie.create({
        tmdbId,
        title: original_title,
        poster: poster_path,
        releaseDate: release_date,
        overview: overview
      }).then((movie) => {
        const id = movie.getDataValue('id');
        if (id) {
          this.SaveReviewData(rating, userName, id);
        }
      });
    } catch (err) {
      log.error(err);
    }
  }

  private async SaveReviewData(rating: number, userName: string, movieId: number) {
    try {
      await Rating.create({
        rating,
        userName: userName,
        movieId: movieId
      });
    } catch (err) {
      log.error(err);
    }
  }

  public async saveMovie(rating: number, tmdbId: string, userName: string): Promise<void> {
    Movie.findOne({
      where: {
        tmdbId
      }
    }).then((movie) => {
      if (!movie) {
        this.getMoviesFromTMDB(tmdbId)
          .then((res) => res.json())
          .then((response) => {
            const { original_title, poster_path, release_date, overview } = response;
            this.SaveMovieData(rating, tmdbId, userName, original_title, poster_path, release_date, overview);
          })
          .catch((err) => log.error(err));
      } else {
        const id = movie.getDataValue('id');
        if (id) {
          this.SaveReviewData(rating, userName, id);
        }
      }
    });
  }

  public async getMoviesFromTMDB(imdbId: string): Promise<any> {
    const url = `https://api.themoviedb.org/3/movie/${imdbId}?api_key=01e0dd049439b64e413990a46062cb64`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: config.MOVIEDB_BEARER
      }
    };
    return fetch(url, options);
  }
}

export const movieService: MovieService = new MovieService();
