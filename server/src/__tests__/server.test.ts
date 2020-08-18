// import {startServer} from '../server'
import server from '../server';
// import { testEnvironment } from '../../jest.config';
import startServer from '../server';

const dotenv = require('dotenv');

// console.log(startServer);
describe('read .env file', () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  console.log(result.parsed);
  dotenv.config({ path: '../env' });
  test('GREET should be defined', () => expect(process.env.GREET).toBeDefined());

  test('should have a PORT', () => {
    expect(process.env.PORT).toBeDefined();
  });
  test('should have a DB_NAME', () => {
    expect(process.env.DB_NAME).toBeDefined();
  });
  test('should have a DB_PSWD', () => {
    expect(process.env.DB_PSWD).toBeDefined();
  });
  test('should have a DB_PORT', () => {
    expect(process.env.DB_PORT).toBeDefined();
  });
  test('Greet should return a string', () => expect(process.env.GREET).toBe('Hello Dev'));
});

describe('test function startServer', () => {
  const DB_URL = 'test';
    test('if function startServer has DB_URL', async () => {
    expect(startServer()).toHaveProperty(DB_URL)
    });
})