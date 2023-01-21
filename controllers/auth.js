const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.login = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Enter Vaild Email" });
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Enter valid Password" });
  }

  if (validationErrors.length > 0) {
    return res.redirect("/login");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: true,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User logged Out");
  });
  req.session.destroy((err) => {
    req.user = null;
    res.redirect("/");
  });
};
exports.signUp = (req, res, next) => {
  //validation
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: true,
  });
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err) => {
    req.login(user, (err) => {
      res.redirect("/profile");
    });
  });
};
