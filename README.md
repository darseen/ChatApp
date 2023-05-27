# ChatApp

> A Realtime Chat Application

Built with [React.js](https://react.dev/) for the frontend, [Redux](https://redux.js.org/) for state management, [Node.js](https://nodejs.org/) for the backend runtime environment, [Express.js](https://expressjs.com/) for creating API endpoints and [MongoDB](https://www.mongodb.com/) for the database. Styled with [Tailwindcss](https://tailwindcss.com/).

## Home Page
![](/screenshots/img1.png)

## Global Chat 
![](/screenshots/img2.png)

## Private Chat
![](/screenshots/img3.png)

## Features

<ul>
 <li> Global Chat </li>
 <li> Private Chats </li>
 <li> Login/Register </li>
 <li> Chat History <i>Persistant Messages(Stored In The Database)</i></li>
 <li> Online/Offline Status </li>
 <li> JWT Athentication/Authorization </li>
</ul>

## Usage

### Install Dependencies

```
cd server && npm install && cd ../client && npm install
```

### Run

```
# Run Client
cd client; vite --host 

# Run Server
node index.js
```

## React Build
```
# Create production build
cd client && vite build
```
