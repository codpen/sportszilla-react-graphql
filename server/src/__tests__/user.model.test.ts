import User from '../models/user.model';

const user = new User();
test('should have firstName');
expect(user).toBeInstanceOf(User);

// console.log('User', user)

// describe('User has fundamental properties', () => {
// 	test('User should have property ID ', () => {

// 	expect(user).toHaveProperty('userName');
// 	})
// })
