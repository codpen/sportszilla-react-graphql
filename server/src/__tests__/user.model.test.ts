import User from '../models/user.model';

const BCRYPT_HASH_BEGINNING = '$2a$';
const TEST_PASSWORD = 'hello there';

User.create({ passW: TEST_PASSWORD }).then( function( user ){
  if( !user ) throw new Error( 'User is null' )
  if( !user.passW ) throw new Error( 'Password was not saved' )
  if( user.passW === TEST_PASSWORD )
    throw new Error( 'Password is plaintext' )
  if( user.passW.indexOf( BCRYPT_HASH_BEGINNING ) === -1 )
    throw new Error( 'Password was not encrypted' )
})

// console.log('User', user)

// describe('User has fundamental properties', () => {
// 	test('User should have property ID ', () => {

// 	expect(user).toHaveProperty('userName');
// 	})
// })
