// 'verifyJWT' should be added to the routes that we want to
// passcode protect from unauthorized access by a client

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Validate if an 'authorization' header has been sent from client
  if (!authHeader) return res.sendStatus(401); // unauthorized

  const token = authHeader.split(" ")[1];
  /*
  Issue: Client call to http://localhost:5500/employees code(403 Forbidden)
  Attempts: Added header to Axios {Authorization: `Bearer ${token}`, withCredentials: true }
  Continued getting code(403)
  Realized that the auth token required the user:email to re-create the token for jwt.verify() comparison.
  Adding the email to the header request (payload) solved the issue.
  */
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("403 Error", err);
      return res.sendStatus(403); // forbidden
    }
    req.user = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
