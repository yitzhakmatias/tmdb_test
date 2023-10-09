import { Model, DataTypes } from 'sequelize';
import { RatingAttributes } from '@rating/interfaces/rating.interface';
import sequelize from '@root/setupDb';
class Rating extends Model<RatingAttributes> {}
Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'ratings',
    timestamps: false
  }
);
export default Rating;
