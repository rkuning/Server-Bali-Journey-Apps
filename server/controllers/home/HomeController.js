const { user } = require("../../models");

class HomeController {
  static async login(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async register(req, res) {
    try {
      const { nama, email, password } = req.body;
      const valUser = await user.findOne({ where: { email } });
      if (valUser) {
        res.status(200).json({ msg: `Email sudah terdaftar!` });
      } else {
        const addUser = await user.create({ nama, email, password });
        res.status(201).json(addUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = HomeController;
