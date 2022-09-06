const fsPromises = require('fs').promises;
const path = require('path');

const usersDB = {
  users: require('../model/users.json'),
  setUsers(users) {
    this.users = users;
  },
};

const handleLogout = async (req, res) => {
  //on client, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204); //ok, no content to send back
  }
  const refreshToken = cookies.jwt;

  console.log('refresToken: ', cookies.jwt);

  const foundUser = usersDB.users.find(
    (currentUser) => currentUser.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(403); //forbidden
  }

  try {
    //delete refreshTOken in db
    const otherUsers = usersDB.users.filter(
      (user) => user.refreshToken !== foundUser.refreshToken
    );
    const currentUser = usersDB.users.find(
      (user) => user.refreshToken === foundUser.refreshToken
    );

    currentUser.refreshToken = '';

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', { httpOnly: true });
  } catch (err) {
    res.status(500).json({ message: err.message }); //add 'secureL true' to true in production (only uses https)
    res.sendStatus(204);
  }
};

module.exports = {
  handleLogout,
};
