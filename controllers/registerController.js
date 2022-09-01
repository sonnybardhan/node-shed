const usersDB = {
  users: require('../model/users.json'),
  setUsers(users) {
    this.users = users;
  },
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({
      message: 'Username and password are required',
    });
  }

  //check for duplicates
  const duplicate = usersDB.users.find(
    (currentUser) => currentUser.username === user
  );

  if (duplicate) {
    return res.sendStatus(409); //conflict
  }

  try {
    //hashing password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //store the password
    const newUser = { username: user, pwd: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);
    res.status(201).json({ success: `new user created: ${user}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleNewUser,
};
