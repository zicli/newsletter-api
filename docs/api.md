### Admin Signup
request
```javascript
  signup(
    username: "username",
    email: "test@email.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    adminKey: "ADMIN_KEY"
    ) {
    id
    username
    email
    firstName
    lastName
  }
```
response
```json
{
  "data": {
    "signup": {
      "id": 1,
      "username": "username",
      "email": "test@email.com",
      "firstName": "John",
      "lastName": "Doe",
    }
  }
}
```

### Query Current User
request
```javascript
{
  currentUser {
    id
    username
    email
  }
}

```
response
```json
{
    "data": {
        "currentUser": {
            "id": 4,
            "username": "lin",
            "email": "lin@test.com"
        }
    }
}
```

### Admin Login
request
```javascript
mutation {
  login(email: "dan@test.com", password: "password") {
    id
    email
    firstName
    lastName
  }
}
```
response
```json
{
    "data": {
        "login": {
            "id": 1,
            "email": "dan@test.com",
            "firstName": "Daniel",
            "lastName": "Fisher"
        }
    }
}
```

### Add a new Post
request
```javascript
mutation {
  addPost(
      title: "Api Architecture",
      headerImage: "www.headerImage.com/image.jpg",
      excerpt: "<p>Designing Api Architecture</p>\n",
      author: "Ben Simmone",
      content: "<h1>Api Architecture content</h1>\n",
      createdAt: "2020-04-07",
      updatedAt: "2020-04-07"
      ) {
    id
    title
    headerImage
    excerpt
    slug
    author
    content
    createdAt
    updatedAt
  }
}
```
response
```json
{
    "data": {
        "addPost": {
            "id": 2,
            "title": "Api Architecture",
            "headerImage": "www.headerImage.com/image.jpg",
            "excerpt": "<p>Designing Api Architecture</p>\n",
            "slug": "api-architecture",
            "author": "Ben Simmone",
            "content": "<h1>Api Architecture content</h1>\n",
            "createdAt": "2020-04-07",
            "updatedAt": "2020-04-07"
        }
    }
}
```

### Delete a post
request
```javascript
mutation {
    deletePost(id: 1)
}
```
response
```json
{
    "data": {
        "deletePost": "post with id 1 deleted successfully"
    }
}
```

### Edit a post
request
```javascript
mutation {
  editPost(
      id: 2,
      title: "Api Architecture",
      headerImage: "www.headerImage.com/image.jpg",
      excerpt: "<p>Designing Api Architecture</p>\n",
      author: "Bola Winslow"
      ) {
    id
    title
    headerImage
    excerpt
    slug
    author
    content
    createdAt
    updatedAt
  }
}
```
response
```json
{
    "data": {
        "addPost": {
            "id": 2,
            "title": "Api Architecture",
            "headerImage": "www.headerImage.com/image.jpg",
            "excerpt": "<p>Designing Api Architecture</p>\n",
            "slug": "api-architecture",
            "author": "Bola Winslow",
            "content": "<h1>Api Architecture content</h1>\n",
            "createdAt": "2020-04-07",
            "updatedAt": "2020-04-07"
        }
    }
}
```

### Query All POST
request
```javascript
 {
  getAllNewsletter{
	id
    title
    headerImage
    excerpt
    slug
    author
    content
    createdAt
    updatedAt
  }
}

```
response
```json
{
    "data": {
        "getAllNewsletter": [
            {
                "id": 6,
                "title": "NewsLetter Documentary",
                "headerImage": "www.headerImage.com/image.jpg",
                "excerpt": "<p>Designing Api Architecture</p>\n",
                "slug": "newsletter-documentary",
                "author": "Tochi",
                "content": "<h1>NewsLetter Documentary</h1>\n",
                "createdAt": "2020-04-07",
                "updatedAt": "2020-04-07"
            },
            {
                "id": 8,
                "title": "Testing Documentary",
                "headerImage": "www.headerImage.com/image.jpg",
                "excerpt": "<p>Designing Api Architecture</p>\n",
                "slug": "testing-documentary",
                "author": "Tochi",
                "content": "<h1>NewsLetter Documentary</h1>\n",
                "createdAt": "2020-04-08",
                "updatedAt": "2020-04-08"
            }
        ]
    }
}
```
