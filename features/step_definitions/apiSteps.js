const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { faker } = require('@faker-js/faker');
const api = require('../../support/apiHelper');

let userData = {};
let token = '';
let userId = '';
let selectedBooks = [];

Given('I have a new random user', function () {
  userData = {
    userName: faker.internet.username(),
    password: 'P@ssword123'
  };
});

When('I create the user via API', async function () {
  const res = await api.createUser(userData);
  expect(res.status).to.equal(201);
  userId = res.body.userID;
});

When('I generate an access token', async function () {
  const res = await api.generateToken(userData);
  expect(res.status).to.equal(200);

  token = res.body.token;
});

When('I confirm the user is authorized', async function () {
  const res = await api.authorizeUser(userData);
  expect(res.status).to.equal(200);
  expect(res.body).to.equal(true);
});

When('I retrieve the list of books', async function () {
  const res = await api.getBooks();
  expect(res.status).to.equal(200);
  selectedBooks = res.body.books.slice(0, 2).map(book => ({ isbn: book.isbn }));
});

When('I select and rent two books', async function () {
  const res = await api.addBooks(userId, token, selectedBooks);

  console.log("Resposta do addBooks:", res.body);

  expect(res.status).to.equal(201);
  expect(res.body).to.have.property('books');
  expect(res.body.books.length).to.equal(2);
});

Then('I should see the selected books in the user details', async function () {
  const res = await api.getUserDetails(userId, token);
  expect(res.status).to.equal(200);
  const userIsbns = res.body.books.map(book => book.isbn);
  selectedBooks.forEach(book => {
    expect(userIsbns).to.contain(book.isbn);
  });
});
