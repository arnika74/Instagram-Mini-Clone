
# Insta Clone

This project is a basic Instagram-like application built as a task submission.
It includes user authentication, post creation, follow/unfollow functionality,
likes, comments, and a personalized feed.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- Next.js (App Router)
- React
- Axios
- Basic CSS

---

## Features

### Authentication
- User Signup
- User Login
- Password hashing
- JWT-based protected routes

### User & Follow System
- Follow a user
- Unfollow a user
- Followers and following count
- View own profile and other user profiles

### Posts
- Create post with image URL and caption
- View posts in feed
- View posts on profile page
- View single post details

### Likes & Comments
- Like and unlike posts
- Add comments to posts
- View comments with user details

### Feed
- Feed shows posts from followed users
- Dynamic UI updates without page refresh

---

## Folder Structure

```

insta_clone/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── feed/
│   │   ├── profile/
│   │   └── post/[id]/
│   ├── components/
│   │   └── Post.js
│   ├── utils/
│   │   └── api.js
│   └── package.json
│
└── README.md

````

---

## API Endpoints

### Auth
- POST `/api/users/register`
- POST `/api/users/login`

### Users
- GET `/api/users/me`
- GET `/api/users/:id`
- PUT `/api/users/follow/:id`
- PUT `/api/users/unfollow/:id`

### Posts
- POST `/api/posts`
- GET `/api/posts/feed`
- GET `/api/posts/:id`
- PUT `/api/posts/like/:id`
- PUT `/api/posts/unlike/:id`
- POST `/api/posts/comment/:id`

---

## How to Run

### Backend
```bash
cd backend
npm install
npm start
````

Runs on:

```
http://localhost:5000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Authentication Flow

* User logs in or signs up
* JWT token is returned
* Token is stored in localStorage
* Axios interceptor sends token in Authorization header
* Protected routes validate token using middleware

---

## Postman Testing

All APIs were tested using Postman.
Protected routes require the following header:

```
Authorization: Bearer <token>
```

---

## Notes

* Images are handled using image URLs
* MongoDB relationships use ObjectId references
* State management is done using React hooks
* UI updates dynamically without page reload

---

## Purpose

This project demonstrates backend logic, database relationships,
authentication, CRUD operations, and frontend-backend integration.

---

## Author

Arnika

```

