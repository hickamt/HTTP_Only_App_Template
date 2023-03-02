const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// using as a temp path write to JSON object
// should be replaced by DB
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client side, need to delete the accessToken on logout

  const cookies = req.cookies;
  // check for cookies and use optional chaining requiring JWT also
  if (!cookies?.jwt) {
    return res.sendStatus(204); // code: No content
  }
  const refreshToken = cookies.jwt;

  // Verify if the refreshToken is in the DB (currently, in our JSON object)
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  ); // returns if found, else falsy

  // So, if a cookie was found but not user then clear the cookie
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204); // code: No content, meaning successfully cleared cookie, but no content to be sent back
  }

  // Delete refreshToken in DB (currently, in our JSON object)
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  // write to file (or DB)
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  // In production, set 'secure: true' to only serve over https
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204); // code: all good but no content being sent back
};

module.exports = { handleLogout };
