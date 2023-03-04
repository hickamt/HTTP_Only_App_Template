# ReactJS / ExpressJS Basic Application

This application project is a culmination of various online tutorials and blogs. Sources are cited in markdown notes within my express_server and react_client directories.

- [Express Server /root](./express/)
- [ReactJS Client /src](./src)

This is a work in progress, meaning it will have non-standard organization and coding practices. At the time of writing this I am working through a term in Intro to Web Dev, so yeah I am working a bit ahead. The series of courses wt Portland State University (PSU) will take me from basic CSS, HTML to Front-End and finally Full-Stack before graduation in 2024.

## View: VSCode Online

<a href="https://vscode.dev/github/hickamt/HTTP_Only_App_Template">
<img src="./src/assets/img/vs-btn.png" alt="vscode button" width="auto" height="60px" />
</a>

## Test Drive on StackBlitz

Still working on cross-origin issues for StackBlitz deployment

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hickamt/HTTP_Only_App_Template/)

## Spin-Up the Application

NOTE: at the time of building this application I am running Node Version v16.14.0. If you experience issues, you may want to change your node@version.

- [Change NodeJS Version](https://dev.to/smpnjn/how-to-change-nodejs-version-34b7)

CLONE THIS REPOSITORY

- [Cloning a Repository: GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

```c
$ git clone https://github.com/hickamt/HTTP_Only_App_Template.git
```

## Using Concurrently

```c
$ npm run dev
```

Client should now be viewable in your browser at:

- http://localhost:5173

Server should now be running at:

- http://localhost:5500

## Login Username and Password for Testing

You can add or change the login information withing /express_server: [server model](./express/model/users.json)

To login, copy and paste the following. For now, the email IS CASE SENSITIVE:

```
email:  GuestUser@localhost.com
pass:   fiveFourThree
```

## About

Application template for client side and server side communication using HTTP Only Cookie. This is a basic (and first attempt) to implement a client server application. This app uses a modern approach to authentication using a refresh token to add a layer of protection between the client and server communication.

When logging in, the client information is recieved by the server and produces the auth token and a refresh token using http only cookie. While the refresh token is valid, the client may stay logged in and access any page the user is validated to access.

As known methods of acquiring a users access token leave the client side vulnerable to security risk, this method attempts to reduce or eliminate that possible security vector. I currently understand that if an attempt to read the token is made by an unrecognized url, the browser will see that the token is http only which raises a flag and should return the token as an empty string.
