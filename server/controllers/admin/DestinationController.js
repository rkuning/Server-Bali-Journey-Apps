const { destination, category, temp_image } = require("../../models");
class DestinationController {
  static async getDestination(req, res) {
    try {
      let result = await destination
        .findAll
        //     {
        //     include: [category, temp_image],
        //   }
        ();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getDestinationId(req, res) {
    try {
      const { id } = req.params;
      const resWisata = await destination.findOne({
        // include: [category],
        where: { id },
      });
      //   let resImage = await temp_image.findAll({ where: { wisataId: id } });
      //   let tempImg = [];
      //   resImage.forEach((img) => {
      //     const { id, wistataId, image } = img;
      //     if (image !== "assets/default.jpeg") {
      //       return tempImg.push(img);
      //     }
      //   });
      resWisata
        ? res.status(200).json({ resWisata })
        : res.status(404).json(`Not found!`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addDestination(req, res) {
    try {
      const {
        name,
        categoryId,
        rating,
        description,
        address,
        open_day,
        open_time,
        map_link,
      } = req.body;
      let addWisata = await destination.create({
        name,
        categoryId,
        rating,
        description,
        address,
        open_day,
        open_time,
        map_link,
      });
      //   await image.create({
      //     wisataId: addWisata.id,
      //     image: "assets/default.jpeg",
      //   });
      res.status(201).json(addWisata);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteDestination(req, res) {
    try {
      const { id } = req.params;
      const result = await destination.destroy({ where: { id } });
      if (result !== 0) {
        res
          .status(200)
          .json({ message: `Destination with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Destination can't be deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateDestination(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        categoryId,
        rating,
        description,
        address,
        open_day,
        open_time,
        map_link,
      } = req.body;
      const result = await destination.update(
        {
          name,
          categoryId,
          rating,
          description,
          address,
          open_day,
          open_time,
          map_link,
        },
        { where: { id } }
      );
      if (result[0] !== 0) {
        res
          .status(200)
          .json({ message: `Destination with id ${id} has been updated` });
      } else {
        res.status(404).json({ message: `Destination can't be updated` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = DestinationController;
