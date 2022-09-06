const express = require('express');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const usersDB = {
  users: require('../model/users.json'),
  setUsers(users) {
    this.users = users;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: 'username and password required' });
  }

  const foundUser = usersDB.users.find(
    (currentUser) => currentUser.username === user
  );

  if (!foundUser) {
    return res.sendStatus(401);
  }

  try {
    const match = await bcrypt.compare(pwd, foundUser.pwd);

    console.log('match? ', match);

    if (match) {
      //create jwt
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      //saving refreshToken with current user
      const otherUsers = usersDB.users.filter(
        (user) => user.username !== foundUser.username
      );
      const currentUser = { ...foundUser, refreshToken };
      usersDB.setUsers([...otherUsers, currentUser]);

      await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
      );

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
      // res.status(200).json({ success: `Welcome ${user}!` });
    } else {
      res.sendStatus(401);
    }

    // console.log(pwd, foundUser.pwd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleLogin,
};
