import express, { Express } from 'express';
import { config } from '@root/config';
import { TmdbServer } from '@root/setupServer';
import sequelize from '@root/setupDb';
import '@movie/models/movie.schema';
import '@rating/models/rating.schema';
class Application {
  public async initialize(): Promise<void> {
    this.loadingConfig();
    await sequelize.sync({ force: true });
    const app: Express = express();
    app.use(express.json());
    const server: TmdbServer = new TmdbServer(app);
    server.start();
  }
  private loadingConfig(): void {
    config.validateConfig();
  }
}

export const application: Application = new Application();
application.initialize();
