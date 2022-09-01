const express = require('express');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
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
      res.status(200).json({ success: `Welcome ${user}!` });
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
