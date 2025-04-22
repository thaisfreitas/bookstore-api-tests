const request = require('supertest');
const BASE_URL = 'https://demoqa.com';


const createUser = (user) =>
  request(BASE_URL).post('/Account/v1/User').send(user);

const generateToken = (user) =>
  request(BASE_URL).post('/Account/v1/GenerateToken').send(user);

const authorizeUser = (user) =>
  request(BASE_URL)
    .post('/Account/v1/Authorized')
    .set('Content-Type', 'application/json')
    .send({
      userName: user.userName,
      password: user.password
    });

const getBooks = () =>
  request(BASE_URL).get('/BookStore/v1/Books');

const addBooks = (userId, token, collection) =>
  request(BASE_URL)
    .post('/BookStore/v1/Books')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId: userId,
      collectionOfIsbns: collection
    });

const getUserDetails = (userId, token) =>
  request(BASE_URL)
    .get(`/Account/v1/User/${userId}`)
    .set('Authorization', `Bearer ${token}`);

module.exports = {
  createUser,
  generateToken,
  authorizeUser,
  getBooks,
  addBooks,
  getUserDetails,
};
