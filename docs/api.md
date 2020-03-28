### Admin signup
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

