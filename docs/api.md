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

