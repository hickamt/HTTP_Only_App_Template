// The usersDB object is similar to ReactJS useState, setState
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// File System
const fsPromises = require("fs").promises;
const path = require("path");

// BCRYPT Number of Hash Rounds
const SALT = 10;
const bcrypt = require("bcrypt");

// Handler Definitions
const handleNewUser = async (req, res) => {
  const { email, password } = req.body; // Deconstruct body key:values

  // Ensure that both the user:email && password:string are given in the request body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email & Password are required " });
  }

  // Verify that the given 'email' does not already exist in the database
  const duplicate = usersDB.users.find((person) => person.email === email);
  if (duplicate) {
    res.statusMessage = `The email: ${email} has already been registered`;
    return res.sendStatus(409); // 409 - conflict
  }

  // Finally, user can be registered
  try {
    // Hash the given password and store it in the database 
    const hashedPassword = await bcrypt.hash(password, SALT);

    // Set the user object with email given and hashed password
    const newUser = { email: email, password: hashedPassword };

    // Adding the newUser to our existing json object file
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    // Ensure that our new user is listed/stored properly
    console.log(usersDB.users);
    
    // Echo back a successful registry for client/user
    res.status(201).json({ success: `New user ${email} created`, email:email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
