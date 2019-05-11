const express = require('express');
const bcryptjs = require('bcryptjs');
const userModel = require('../users/model');
const admin = require('firebase-admin');

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const userInfo = req.body;

    // hash password
    const hashPassword = bcryptjs.hashSync(userInfo.password, 10);

    // save to db
    const newUser = new userModel({
      ...userInfo,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      id: newUser._id,
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message || 'Internal server error');
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existUser = await userModel.findOne({username: username}).exec();
    if (existUser) {
      if (bcryptjs.compareSync(password, existUser.password)) {
        // save user to session storage
        req.session.authUser = {
          id: existUser._id,
          username: existUser.username,
          fullName: existUser.fullName,
        };
        req.session.save();

        res.status(200).json({
          success: true,
          message: 'Login success',
          userId: existUser._id,
          username: existUser.username,
        });
      } else {
        res.status(200).json({
          success: false,
          message: 'Password isnt correct'
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Username not found'
      });
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message || 'Internal server error');
  }
});

authRouter.post('/facebookOauth', async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const result = await admin.auth().verifyIdToken(idToken);
    console.log(result);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message || 'Internal server error');
  }
});

module.exports = authRouter;