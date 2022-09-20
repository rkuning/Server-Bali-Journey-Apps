const { category } = require("../../models");

class CategoryController {
  static async getCategory(req, res) {
    try {
      let result = await category.findAll();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getCategoryId(req, res) {
    try {
      const { id } = req.params;
      const result = await category.findOne({ where: { id } });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addCategory(req, res) {
    try {
      const { nama } = req.body;
      let addCategory = await category.create({ nama });
      res.status(201).json(addCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const result = await category.destroy({ where: { id } });
      if (result !== 0) {
        res
          .status(200)
          .json({ message: `Category with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Category can't be deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { nama } = req.body;
      const result = await category.update({ nama }, { where: { id } });
      if (result[0] !== 0) {
        res
          .status(200)
          .json({ message: `Category with id ${id} has been updated` });
      } else {
        res.status(404).json({ message: `Category can't be updated` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CategoryController;
