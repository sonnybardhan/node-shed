const express = require('express');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const usersDB = {
  users: require('../model/users.json'),
  setUsers(users) {
    this.users = users;
  },
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401); //unauthorized
  }
  const refreshToken = cookies.jwt;

  console.log('refreshToken: ', cookies.jwt);

  const foundUser = usersDB.users.find(
    (currentUser) => currentUser.refreshToken === refreshToken
  );

  if (!foundUser) {
    return res.sendStatus(403); //forbidden
  }

  try {
    //evaluate JWT

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.username !== foundUser.username)
          return res.sendStatus(403);

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '90s' }
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleRefreshToken,
};
