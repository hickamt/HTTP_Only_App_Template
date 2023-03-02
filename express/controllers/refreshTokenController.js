const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const REFRESH_TOKEN_EXPIRATION = "30m";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshtoken = (req, res) => {
  const cookies = req.dookies;
  // check for cookies and use optional chaining requiring JWT also
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  // dev check to be removed
  // console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  // First Check: Does email given exist
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  ); // returns if found, else falsy
  if (!foundUser) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email)
      return res.sendStatus(403); // Forbidden
    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION } // should be longer in production application
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshtoken };
