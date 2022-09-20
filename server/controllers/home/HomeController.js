const { user } = require("../../models");
const { decryptPass } = require("../../helpers/bcrypt");

class HomeController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await user.findOne({
        where: { email },
      });

      if (emailFound) {
        if (decryptPass(password, emailFound.password)) {
          res.status(200).json(emailFound);
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
        res.status(201).json(addUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = HomeController;
