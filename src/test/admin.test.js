import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '..';
import env from '../config/env';


const { ADMIN_KEY } = env;

chai.use(chaiHttp);

describe('Admin Signup', () => {
  it('should successfully signup a new user', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation { 
          signup(username: "dan", email: "dan@test.com", password: "password", firstName: "Daniel", lastName: "Fisher", adminKey: "${ADMIN_KEY}") {
            id
            username
            email
            firstName
            lastName
          }
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.signup.username).to.be.a('string');
    expect(response.body.data.signup.firstName).to.be.a('string');
    expect(response.body.data.signup.lastName).to.be.a('string');
  });
  it('should fail if user is already signed up', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation { 
        signup(username: "dan", email: "dan@test.com", password: "password", firstName: "Daniel", lastName: "Fisher", adminKey: "${ADMIN_KEY}") {
          id
          username
          email
          firstName
          lastName
        }
      }`
      });
    expect(response.body.errors).to.be.a('array');
  });
});

describe('Admin Login', () => {
  it('should successfully login an exisiting user', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation { 
          login(email: "dan@test.com", password: "password") {
            id
            username
            email
            firstName
            lastName
          }
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.login.firstName).to.be.a('string');
    expect(response.body.data.login.lastName).to.be.a('string');
  });
  it('should fail if user password is incorrect', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation { 
          login(email: "dan@test.com", password: "passwfford") {
            id
            username
            email
            firstName
            lastName
          }
        }`
      });
    expect(response.body.errors).to.be.a('array');
  });
});
