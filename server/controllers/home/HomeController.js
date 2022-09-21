const { user, temp_image } = require("../../models");
const { decryptPass } = require("../../helpers/bcrypt");
const { tokenGenerator } = require("../../helpers/jsonwebtoken");

class HomeController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await user.findOne({
        where: { email },
      });

      if (emailFound) {
        if (decryptPass(password, emailFound.password)) {
          let accessToken = tokenGenerator(emailFound);
          switch (emailFound.status) {
            case "active":
              res.status(200).json({ accessToken });
              break;
            case "inactive":
              res.status(307).json({ msg: "Cannot reach this account!" });
              break;
            case "blocked":
              res.status(308).json({ msg: "Your account is temporary blocked, contact CS!" });
              break;
          }
        } else {
          res.status(403).json({
            massage: "Invalid password!",
          });
        }
      } else {
        res.status(404).json({
          message: "Email not found!",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const valUser = await user.findOne({ where: { email } });
      if (valUser) {
        res.status(200).json({ msg: `Email sudah terdaftar!` });
      } else {
        const addUser = await user.create({ name, email, password });
        await temp_image.create({ userId: addUser.id, img: "images/default-profil.jpg" });
        res.status(201).json(addUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = HomeController;
