// import {startServer} from '../server'
const dotenv = require('dotenv');
// import server from './server'

// console.log(startServer);
describe('read .env file', () => {
const result = dotenv.config();

if (result.error) {
  throw result.error
}
console.log(result.parsed);
dotenv.config({ path: '../env' });
test('GREET should be defined', () => 
expect(process.env.GREET).toBeDefined());
// PORT=8000
// DB_NAME=zoigrzyc
// DB_PSWD=FuYdgIwbIKKx82NF4-9uk_aHze5zCaTq
// DB_PORT=5432

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
test('Greet should return a string', () =>
    expect(process.env.GREET).toBe("Hello Dev"));
});