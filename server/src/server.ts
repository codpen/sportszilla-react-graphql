import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import { BookResolver } from './resolvers/BookResolver';
import User from './models/user.model';

dotenv.config();
const {
  PORT, DB_NAME, DB_PSWD, DB_PORT,
} = process.env;

async function startServer() {
  const DB_URL = `postgres://${DB_NAME}:${DB_PSWD}@packy.db.elephantsql.com:${DB_PORT}/${DB_NAME}`;
  const sequelize = new Sequelize(DB_URL);
  try {
    await sequelize.authenticate();
    sequelize.addModels([path.join(__dirname, '/models/**/*.model.ts')]);
    console.info('Connected to Postgres.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const schema = await buildSchema({
    resolvers: [BookResolver],
  });
  const server = new ApolloServer({ schema });
  server.listen(PORT)
    .then(() => {
      // CREATE TABLE IF NOT EXISTS
      User.sync({ force: false }).then(() => {
        User.create({ firstName: 'X', lastName: 'Y', birthday: new Date() });
      });
      User
        .findOne()
        .then((user) => console.log(user));

      console.info(`Server has started on port: ${PORT}!`);
    });
}

startServer();
