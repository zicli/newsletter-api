# Newsletter Api

This is an architecture of a lightweight newsletter backend server used by the zicli site. This architecture is opensource, so its operation will be independent with admins, newsletter, comments(if neccessary), or likes.
The specifications in this document are subject to change as it is an opensouce project.

## Goal
This app aims at creating a simple and dynamic newsletter that can be rivaled with best newsletter apis around the world.
- It must be simple
- It must be dynamic
- It must be independent
- It must be abstract.

## Features
- Admin can Sign Up.
- Admin can Sign in.
- Admin can add a newsletter.
- Admin can delete a newsletter.
- Admin can edit a newsletter.
- Users/Admin can view all newsletter.
- Users/Admin can view a single newsletter.

## Stack
Server : Express
Api : GraphQl
Database: postgres
Test: mocha chai

### Data Specifications
These specifications are open and subject to change.

```javascript
// admin
{
  "id": INTEGER,
  "firstName": STRING,
  "lastName": STRING,
  "username": STRING,
  "email": STRING,
  "password": STRING,
  "createdAt": DATE,
  "updatedAt": DATE
}

// newsletter
{
  "id": INTEGER,
  "header": STRING,
  "header_pic": STRING,
  "sub_heading": STRING,
  "description": STRING,
  "content": TEXT,
  "featured_pics": [STRING],
  "author": STRING,
  "createdAt": DATE,
  "updatedAt": DATE
}

```
