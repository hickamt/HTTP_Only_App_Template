## JSON Web Token Overview (JWT)

This expressjs server uses a client front-end 'ReactJS_JWT_HTTPOnly_Cookies'.

Ensure that the client side is spun up to test the server using a GUI or install the VSCode extension 'Thunder Client' and test the API Endpoints:
- [Install and Use Thunderclient Extension](https://www.freecodecamp.org/news/thunder-client-for-vscode/)
- http://localhost:5500/register,
   - Register a new user in the body, 'email': 'someEmail@gmail.com', 'password': 'myPasswordIsWeak'
- http://localhost:5500/employess
   - GET request for a list of employess from local JSON object

Check the /server.js for a complete list of Endpoints.

[Source: Dave Gray YouTube Tutorial](https://www.youtube.com/watch?v=favjC6EKFgw&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=11)

## Set Up

Add the following dependencies

```js
$ npm install dotenv jsonwebtoken cookie-parser
```

First: open the .gitignore file and add .env to ensure it is not included in the deployment or to any source control repository such as Git or GitHub.

Create a .env (environment variables) file at /root level and add

- ACCESS_TOKEN_SECRET =
- REFRESH_TOKEN_SECRET =

Next, open a terminal in the current server directory and create the random crypto strings for our Access Token Secret and Refresh Token Secret

```js
$ node
/*
   The following statement will give us a random crypto bytes string
   that can be used for our ACCESS_TOKEN_SECRET, and running it again
   will give us a new string to be used for the REFRESH_TOKEN_SECRET
*/
   > require('crypto').randomBytes(64).toString('hex')

/* Example String Output
072bb8e63555dce6b97cd97a5515c8ed3805480e43652388cb3accad7f238490f11dc5b22da5f677b46b0427d723dfece7b1bf9ff775c4c6b21ee4fe7e9a05dc
*/
   > [CTRL] + C, do this twice to exit 'node'
```

## Authentication Controller File

Creating the Auth and Refersh Tokens is handled in the Authentication Controller File. See: /controllers/authController.js

## Access and Refresh Token

- Access Token is given for a short duration
- Refresh Token is available for a longer duration

Using this method helps prevent:

- XSS: Cross-Site Scripting
- CSRF: CS Request Forgery

The Access Token is given at authentication (or, registration) and sent as a JSON. The Client will store this Token in memory (NOT in local storage or as a cookie) so that they are cleared when the application is closed.

Refresh Tokens are sent as an httpOnly cookie so that it is not accessible via JavaScript and will have an explicit expiration at some point which requires a user to login again. Refresh Tokens should not have the ability to issue new refresh tokens as that would grant a user indefinite access to the server and if stolen, would give the hacker unlimited access.

## Token Flow

Access Token and Refresh Token issued after login authorization. The Access Token is used for the API request until the token expires (as verified by middleware for each API Endpoint). When the Access Token expires, a new Access Token is created using their refresh token.

## Using Middleware to Protect API Routes

Below is an example of adding a JWT middleware to a route that should be protected by including it to individual routes. It is also acceptable to add the JWT verification to at the /server file level. 

```js
const verifyJWT = require("../../middleware/verifyJWT");

// .get(usingJWTMIddleware, call to controller method)
// .post(not using verification middlware with direct call access to controller method)
router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee);
```

