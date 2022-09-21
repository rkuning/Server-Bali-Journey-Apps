const { user } = require("../../models");

class UserController {
  static async getUser(req, res) {
    try {
      let users = await user.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUserId(req, res) {
    try {
      const id = +req.params.id;
      let getUser = await user.findByPk(id);
      getUser
        ? res.status(200).json(getUser)
        : res.status(404).json({ message: `Not found` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const valEmail = await user.findOne({ where: { email } });
      if (valEmail) {
        res.status(200).json({ msg: `Email sudah terdaftar!` });
      } else {
        const addUser = await user.create({ name, email, password });
        res.status(201).json(addUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      const delUser = await user.destroy({ where: { id } });
      delUser === 1
        ? res.status(200).json(`User with id ${id} Deleted!`)
        : res.status(404).json("User Not found!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      const { level, status } = req.body;
      const updUser = await user.update({ level, status }, { where: { id } });
      updUser[0] === 1
        ? res.status(200).json(`User with id ${id} Updated!`)
        : res.status(404).json(`User with id ${id} Not found!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;