import User from '../models/user.model'




const user = new User();
test('should have firstName');
expect(user.firstName).toBe(true);

console.log('user.sportName', user.sportName)
// console.log('User', user)

// describe('User has fundamental properties', () => {
// 	test('User should have property ID ', () => {

// 	expect(user).toHaveProperty('userName');
// 	})
// })