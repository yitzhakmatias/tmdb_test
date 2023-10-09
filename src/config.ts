import dotenv from 'dotenv';
import * as process from 'process';
import bunyan from 'bunyan';
//import cloudinary from 'cloudinary'
dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_COOKIE_ONE: string | undefined;
  public SECRET_COOKIE_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public DB_HOST: string | undefined;
  public DB_PORT: number;
  public DB_NAME: string;
  public DB_USER: string;
  public DB_PASSWORD: string;
  public API_KEY: string;
  public MOVIEDB_BEARER: string;

  private readonly DEFAULT_DATA_BASE_URL = '';

  constructor() {
    this.DATABASE_URL = process.env.DATA_BASE_URL || this.DEFAULT_DATA_BASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_COOKIE_ONE = process.env.SECRET_COOKIE_ONE || '';
    this.SECRET_COOKIE_TWO = process.env.SECRET_COOKIE_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.DB_HOST = process.env.DB_HOST || 'localhost';
    this.DB_PORT = Number(process.env.DB_PORT) || 5432;
    this.DB_NAME = process.env.DB_NAME || 'tmdb';
    this.DB_USER = process.env.DB_USER || 'admin';
    this.DB_PASSWORD = process.env.DB_PASSWORD || 'password';
    this.API_KEY = process.env.API_KEY || '01e0dd049439b64e413990a46062cb64';
    this.MOVIEDB_BEARER =
      process.env.MOVIEDB_BEARER ||
      'MOVIEDB_BEARERBearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWUwZGQwNDk0MzliNjRlNDEzOTkwYTQ2MDYyY2I2NCIsInN1YiI6IjY1MTM2OTFmY2FkYjZiMDJiZGViM2JhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pZ2rdeAaLD7SXaUUDFtCL7Tgd943bf8UBIXcekwvwdk';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      //console.log(value)
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
