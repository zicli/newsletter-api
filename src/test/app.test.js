import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '..';
import env from '../config/env';


const { ADMIN_KEY } = env;

chai.use(chaiHttp);

let token;
let postId;
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
            token
          }
        }`
      });
    token = response.body.data.login.token;
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

describe('Add Post', () => {
  it('should successfully add a post', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .set('Cookie', `token=${token}`)
      .send({
        query: `mutation {
          addPost(
              title: "How to be great",
              headerImage: "www.headerImage.com/image.jpg",
              excerpt: "<p>Being great is no easy feat, let me show you how to achievei this</p>\\n",
              author: "Ben Simmone",
              content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
              ) {
            id
            title
            headerImage
            excerpt
            slug
            author
            content
          }
        }`
      });
    postId = response.body.data.addPost.id;
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.addPost.title).to.be.a('string');
    expect(response.body.data.addPost.content).to.be.a('string');
  });
  it('should fail to add post if admin token is absent', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          addPost(
              title: "How to be great",
              headerImage: "www.headerImage.com/image.jpg",
              excerpt: "<p>Being great is no easy feat, let me show you how to achievei this</p>\\n",
              author: "Ben Simmone",
              content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
              ) {
            id
            title
            headerImage
            excerpt
            slug
            author
            content
          }
        }`
      });
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
  it('should fail to add post if input parameter is missing', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          addPost(
              headerImage: "www.headerImage.com/image.jpg",
              excerpt: "<p>Being great is no easy feat, let me show you how to achievei this</p>\\n",
              author: "Ben Simmone",
              content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
              ) {
            id
            title
            headerImage
            excerpt
            slug
            author
            content
          }
        }`
      });
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
});

describe('Edit Post', () => {
  it('should successfuly edit a post', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .set('Cookie', `token=${token}`)
      .send({
        query: `mutation {
          editPost(
              id: ${postId}
              title: "How to be greater",
              headerImage: "www.headerImage.com/image.jpg",
              excerpt: "<p>Being great is no easy feat, let me show you how to achievve this</p>\\n",
              author: "Ben Simmone",
              content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
              ) {
            id
            title
            headerImage
            excerpt
            slug
            author
            content
          }
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.editPost.title).to.be.a('string');
    expect(response.body.data.editPost.content).to.be.a('string');
  });
  it('should fail to edit a post if token is absent', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
        editPost(
            id: ${postId}
            title: "How to be greater",
            headerImage: "www.headerImage.com/image.jpg",
            excerpt: "<p>Being great is no easy feat, let me show you how to achievve this</p>\\n",
            author: "Ben Simmone",
            content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
            ) {
          id
          title
          headerImage
          excerpt
          slug
          author
          content
        }
      }`
      });
    expect(response).to.have.status(403);
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
  it('should fail to edit a post if post parameters are in wrong format', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .set('Cookie', `token=${token}`)
      .send({
        query: `mutation {
      editPost(
          id: yyy
          title: "How to be greater",
          headerImage: "www.headerImage.com/image.jpg",
          excerpt: "<p>Being great is no easy feat, let me show you how to achievve this</p>\\n",
          author: "Ben Simmone",
          content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
          ) {
        id
        title
        headerImage
        excerpt
        slug
        author
        content
      }
    }`
      });
    expect(response).to.have.status(400);
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
  it('should fail to edit a post if post does not exist', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .set('Cookie', `token=${token}`)
      .send({
        query: `mutation {
      editPost(
          id: 100
          title: "How to be greater",
          headerImage: "www.headerImage.com/image.jpg",
          excerpt: "<p>Being great is no easy feat, let me show you how to achievve this</p>\\n",
          author: "Ben Simmone",
          content: "<h1>Newsletter Api</h1>\\n<p>This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.\\nThe specifications in this document are subject to change as it is an opensouce project.</p>\\n<h2>Goal</h2>\\n<p>This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.</p>\\n<ul>\\n<li>It must be simple</li>\\n<li>It must be dynamic</li>\\n<li>It must be independent</li>\\n<li>It must be abstract.</li>\\n</ul>\\n"
          ) {
        id
        title
        headerImage
        excerpt
        slug
        author
        content
      }
    }`
      });
    expect(response).to.have.status(404);
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
});

describe('Delete Post', () => {
  it('should fail to delete a post if admin token is absent', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          deletePost(id: ${postId})
        }`
      });
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
  it('should fail to delete a post if parameter is in wrong format', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          deletePost(id: "drfr")
        }`
      });
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
  });
  it('should successfully delete a post', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .set('Cookie', `token=${token}`)
      .send({
        query: `mutation {
          deletePost(id: ${postId})
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.deletePost).to.be.a('string');
  });
});

describe('Users Can View All Posts', () => {
  it('Users can display all post in the database without token', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `query {
          getAllNewsletter{
          id
            title
            headerImage
            excerpt
            slug
            author
            content
          }
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
  });
  it('Admin can display all post in the database with token', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .set('Cookie', `token=${token}`)
      .send({
        query: `query {
          getAllNewsletter{
          id
            title
            headerImage
            excerpt
            slug
            author
            content
          }
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
  });
});
