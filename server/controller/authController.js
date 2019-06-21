const bcrypt = require("bcrypt");
module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exists(username).then(userFound => {
      if (!userFound[0]) {
        res.status(401).send("User doesn't exist.");
      } else {
        console.log(password, userFound[0].password, "ZACH ZACH ZACH");
        bcrypt
          .compare(password, userFound[0].password)
          .then(matchedPassword => {
            if (matchedPassword) {
              const { username, email, user_id, profile_pic } = userFound[0];
              req.session.user = { username, email, user_id, profile_pic };
              res.status(200).send(req.session.user);
            } else {
              res.status(401).send("Incorrect username or password");
            }
          });
      }
    });
  },

  register: (req, res, next) => {
    const { username, password, email } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exists(username).then(foundUser => {
      if (foundUser.length) {
        res.status(200).send("Username in use, please enter a new username.");
      } else {
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.register([username, hashedPassword, email]).then(createdUser => {
              req.session.user = createdUser[0];
              res.statusMessage = "Success";
              res.status(200).send(req.session.user);
            });
          });
        });
      }
    });
  },

  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },

  changePic: (req, res, next) => {
    const { id } = req.params;
    const { profile_pic } = req.body;
    const db = req.app.get("db");
    db.changeUserPic([profile_pic, id])
      .then(updatedUser => {
        res.status(200).send(updatedUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Change picture failed");
      });
  },

  changeName: (req, res, next) => {
    const { id } = req.params;
    const { username } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exists(username).then(foundUser => {
      if (foundUser.length) {
        res.status(200).send("Username in use, please enter a new username.");
      } else {
        db.changeUserName([username, id])
          .then(updatedUser => {
            res.status(200).send(updatedUser);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Change name failed");
          });
      }
    });
  },

  changeUserData: (req, res, next) => {
    const { id } = req.params;
    const { username, profile_pic } = req.body;
    console.log(id, username, profile_pic);
    const db = req.app.get("db");
    db.selectUserByID(id).then(foundUser => {
      console.log("Found user", foundUser);
      if (foundUser.length) {
        let newName = username || foundUser[0].username;
        console.log(foundUser.username, "USERNAME");
        let newPic = profile_pic || foundUser[0].profile_pic;
        db.changeUserInfo([newName, newPic, id])
          .then(updatedUser => {
            console.log("UPdated user", updatedUser);
            res.status(200).send(updatedUser);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("change name failed");
          });
      }
    });
  },

  logout: (req, res, next) => {
    console.log("logout hit");
    req.session.destroy();
    res.status(200).send("logged out");
  }
};
