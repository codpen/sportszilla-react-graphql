const dotenv = require('dotenv');

describe('read .env file', () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  dotenv.config({ path: '../env' });
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
});
