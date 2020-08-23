import SequelizeMock from 'sequelize-mock';
import sequelize from 'sequelize';
import User from '../models/user.model';

/**
 * TODO-
 * -initialize fake db connection
 * -get from the user tbale the first name expect to be a mocked obj.
 * -change user firstname- expect to be *result*
 * -check if password is being hashed
 * check if you are able to implement a new user with same email.
 */
sequelize.$overrideImport('../models/user.model', './users/mock.js');

const dbMock = new SequelizeMock();

var UserMock = dbMock.define(
  'user',
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'test@example.com',
  },
  {
    instanceMethods: {
      getFullName: function () {
        return this.get('firstName') + ' ' + this.get('lastName');
      },
    },
  }
);

// const BCRYPT_HASH_BEGINNING = '$2a$';
// const TEST_PASSWORD = 'hello there';

// User.create({ passW: TEST_PASSWORD }).then( function( user ){
//   if( !user ) throw new Error( 'User is null' )
//   if( !user.passW ) throw new Error( 'Password was not saved' )
//   if( user.passW === TEST_PASSWORD )
//     throw new Error( 'Password is plaintext' )
//   if( user.passW.indexOf( BCRYPT_HASH_BEGINNING ) === -1 )
//     throw new Error( 'Password was not encrypted' )
// })

// console.log('User', user)

// describe('User has fundamental properties', () => {
// 	test('User should have property ID ', () => {

// 	expect(user).toHaveProperty('userName');
// 	})
// })
