# ReactJS / ExpressJS Basic Application

This application project is a culmination of various online tutorials and blogs. Sources are cited in markdown notes within my express_server and react_client directories.

- [Express Server /root](./express/)
- [ReactJS Client /src](./src)

This is a work in progress, meaning it will have non-standard organization and coding practices. At the time of writing this I am working through a term in Intro to Web Dev, so yeah I am working a bit ahead. The series of courses wt Portland State University (PSU) will take me from basic CSS, HTML to Front-End and finally Full-Stack before graduation in 2024.

## Test Drive on StackBlitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hickamt/Client_and_Server_Template)

## Spin-Up the Application

NOTE: at the time of building this application I am running Node Version v16.14.0. If you experience issues, you may want to change your node@version.

- [Change NodeJS Version](https://dev.to/smpnjn/how-to-change-nodejs-version-34b7)

CLONE THIS REPOSITORY

- [Cloning a Repository: GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

```c
$ git clone https://github.com/hickamt/Client_and_Server_Template.git
```

## Using Concurrently

```c
$ npm run app
```

Client should now be viewable in your browser at:

- http://localhost:5173

Server should now be running at:

- http://localhost:5500

## Login Username and Password for Testing

You can add or change the login information withing /express_server: [server model](./express_server/model/users.json)

To login, copy and paste the following. For now, the email IS CASE SENSITIVE:

```
email:  GuestUser@localhost.com
pass:   fiveFourThree
```

## Application Directory Navigation Links

REACT CLIENT:

- [Client Directory](./react_client/)
  - [README: My Notes While Creating the Client Side](./react_client/README.md)
  - [Package.JSON](./react_client/package.json)

EXPRESS SERVER:

- [Server Directory](./express_server/)
  - [README: My Notes While Creating the Server Side](./express_server/README.md)
  - [Package.JSON](./express_server/package.json)

## About

Application template for client side and server side communication using HTTP Only Cookie. This is a basic (and first attempt) to implement a client server application. This app uses a modern approach to authentication using a refresh token to add a layer of protection between the client and server communication.

When logging in, the client information is recieved by the server and produces the auth token and a refresh token using http only cookie. While the refresh token is valid, the client may stay logged in and access any page the user is validated to access.

As known methods of acquiring a users access token leave the client side vulnerable to security risk, this method attempts to reduce or eliminate that possible security vector. I currently understand that if an attempt to read the token is made by an unrecognized url, the browser will see that the token is http only which raises a floag and should return the token as an empty string.