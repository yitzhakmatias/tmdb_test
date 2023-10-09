import { Model, DataTypes } from 'sequelize';
import { MovieAttributes } from '@movie/interfaces/movie.interface';
import Rating from '@rating/models/rating.schema';

import sequelize from '@root/setupDb';
class Movie extends Model<MovieAttributes> {}
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tmdbId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'movies',
    timestamps: false
  }
);

Movie.hasMany(Rating, {
  foreignKey: 'movieId',
  sourceKey: 'id'
});
Rating.belongsTo(Movie, {
  foreignKey: 'movieId',
  targetKey: 'id'
});
export default Movie;
