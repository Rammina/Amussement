# Amussement

<hr/>

## Overview

Online chat application, and Discord clone, created using React, Sass, Node.js, Express, MongoDB, and Socket.IO.
Its design is heavily inspired by [Discord](https://discord.com/).

<b>LIVE LINK:</b> https://amussement.netlify.app/auth/login

<hr/>

### Features
<br/>
User Authentication
<ul>
    <li>Register</li>
    <li>Login</li>
</ul>
User Customization
<ul>
    <li>Change username and email</li>
    <li>Change password</li>
    <li>Upload avatar</li>
    <li>Disable account</li>
    <li>Delete account</li>
</ul>
Messaging
<ul>
    <li>Send, edit, and delete messages</li>
    <li>Public room chat</li>
    <li>Direct messaging</li>
</ul>
Rooms
<ul>
    <li>Create room</li>
    <li>Join room</li>
    <li>Set password for joining</li>
    <li>Upload room icon</li>
    <li>Edit room name, icon, and password</li>
    <li>Delete and leave room</li>
</ul>

<hr>

### Technologies Used

<br>

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Redux" src="https://img.shields.io/badge/redux-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="SASS" src="https://img.shields.io/badge/SASS-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>

<ul>
    <li>Socket.IO</li>
    <li>Cloudinary (image hosting)</li>
</ul>

<hr>

## Installation

Clone this project locally and then follow the instructions below:

### Backend

To start the backend server, go to the server folder:

```bash
cd server
```

Install dependencies by running:

```bash
npm install
```

Then, start the project's server in development mode on port 5000 by running:

```bash
npm run dev
```

### Frontend

To start the client-side application, go to the client folder:

```bash
cd client
```

Install dependencies by running:

```bash
npm install
```

Start the client application in development mode on port 5000 by running:

```bash
npm start
```

To run the build process:

```bash
npm run build
```

<hr>

## Dependencies

Server

<ul>
    <li>async: ^2.6.2</li>
    <li>bcryptjs: ^2.4.3</li>
    <li>body-parser: ^1.19.0</li>
    <li>cloudinary: ^1.22.0</li>
    <li>compression: ^1.7.3</li>
    <li>config: ^3.3.1</li>
    <li>connect-flash: ^0.1.1</li>
    <li>cookie-parser: ~1.4.3</li>
    <li>cors: ^2.8.5</li>
    <li>debug: ~2.6.9</li>
    <li>dotenv: ^8.2.0</li>
    <li>express: ^4.17.1</li>
    <li>express-session: ^1.17.1</li>
    <li>express-validator: ^5.3.1</li>
    <li>helmet: ^3.15.1</li>
    <li>http-errors: ~1.6.2</li>
    <li>jsonwebtoken: ^8.5.1</li>
    <li>mongoose: ^5.9.27</li>
    <li>mongoose-friends: ^0.2.5</li>
    <li>morgan: ^1.10.0</li>
    <li>multer: ^1.4.2</li>
    <li>passport: ^0.4.1</li>
    <li>passport-http: ^0.3.0</li>
    <li>passport-jwt: ^4.0.0</li>
    <li>passport-local: ^1.0.0</li>
    <li>socket.io: ^2.4.1</li>
</ul>
Server Dev Dependencies:
<ul>
    <li>nodemon: 1.18.10</li>
</ul>
Client:
<ul>
    <li>@emotion/css: ^11.1.3</li>
    <li>ajv: ^8.0.5</li>
    <li>axios: ^0.21.1</li>
    <li>date-fns: ^2.17.0</li>
    <li>query-string: ^6.8.2</li>
    <li>react: ^16.9.0</li>
    <li>react-dom: ^16.9.0</li>
    <li>react-emoji: ^0.5.0</li>
    <li>react-redux: ^7.1.1</li>
    <li>react-router-dom: ^5.2.0</li>
    <li>react-scripts: ^3.4.1</li>
    <li>react-scroll: ^1.8.1</li>
    <li>redux: ^4.0.4</li>
    <li>redux-form: ^8.2.6</li>
    <li>redux-thunk: ^2.3.0</li>
    <li>sass: ^1.26.5</li>
    <li>socket.io-client: ^2.2.0</li>
    <li>uuidv4: ^6.2.6</li>
</ul>
<br>

<hr>

## Pictures


<img src="https://res.cloudinary.com/rammina/image/upload/v1619525380/loginpage.png" width="650"/>

<img src="https://res.cloudinary.com/rammina/image/upload/v1619525391/chatdemo.png" width="650"/>

<img src="https://res.cloudinary.com/rammina/image/upload/v1619525371/usersettings.png" width="650"/>

## License

[MIT](https://choosealicense.com/licenses/mit/)
