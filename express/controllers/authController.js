const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const ACCESS_TOKEN_EXPIRATION = "60m";

// Hashing (bcrypt) && JSON Web Token
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// File System
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email & Password are required " });
  }

  // First Check: Does email given exist
  const foundUser = usersDB.users.find((person) => person.email === email); // returns if found, else falsy
  if (!foundUser) {
    return res.sendStatus(401); // Unauthorized, user does not exist
  }

  // Evaluate Password and Create Access Token
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // creating Access Token with:
    /* request client email from req.body
       .env access token secret
       expiration of access token option
    */
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION } // in production 5min to 30 min
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save Refresh Token with current user in the DataBase
    const otherUsers = usersDB.users.filter(
      (person) => person.email !== foundUser.email
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    // Send the Access & Refresh Token to Client/User
    // to be stored by client in State/Memory only
    // Sending client an http only cookie with an expiration of 24 hours in (ms)
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // sending the accessToken and email after login authentication
    res.json({ accessToken, refreshToken, email });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };
