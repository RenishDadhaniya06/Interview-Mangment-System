const express = require("express");
const User = require("../model/user.js");
const auth = require("../middleware/auth.js");
const axios = require("axios");
const router = express.Router();

router.post("/users", async (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(async (user) => {
      if (user.length >= 1) {
        res.status(400).send({
          Message: "Already A User Please SignIn",
        });
      } else {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
      }
    });
  // const user = new User(req.body)
  // try {
  //     await user.save()
  //     const token = await user.generateAuthToken()
  //     res.status(201).send({ user, token })
  // } catch (e) {
  //     res.status(400).send(e)
  // }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ Message: error.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    console.log(req.user)
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Done😃");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    req.user.remove();
    res.send("Deleted!");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
