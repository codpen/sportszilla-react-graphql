import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import UserResolver from './resolvers/UserResolver';
import EventResolver from './resolvers/EventResolver';
import sportResolver from './resolvers/sportResolver';

dotenv.config();

const { PORT, DB_NAME, DB_PSWD, DB_PORT } = process.env;

async function startServer() {
  const DB_URL = `postgres://${DB_NAME}:${DB_PSWD}@packy.db.elephantsql.com:${DB_PORT}/${DB_NAME}`;
  const sequelize = new Sequelize(DB_URL);
  try {
    await sequelize.authenticate();
    sequelize.addModels([path.join(__dirname, '/models/**/*.model.ts')]);
    sequelize.sync({ force: true });
    console.info('Connected to Postgres.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const schema = await buildSchema({
    resolvers: [UserResolver, EventResolver, sportResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({ schema });

  apolloServer.listen(PORT).then(() => console.info(`Server has started on port: ${PORT}!`));
}
/**
 * testing startServer
 * create db_url try to create instance of class Sequelize withcreated db_url.
 * create instance of sequelize with db_url
 * authenticate
 * addModels
 * create Schema
 * run (server) instance of ApolloServer with schema
 * server listen on port
 * if no teable create a table
 * run findone in database
 */
startServer();
