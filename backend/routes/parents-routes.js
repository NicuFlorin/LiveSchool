const { entities } = require("../database");

const addParent = async (req, res) => {
  try {
    let parent = req.body;
    if (!parent.id_copil || !parent.id_utilizator) {
      res.status(400).send({ message: "invalid parent", success: false });
      return;
    }

    let result = await entities.Parinte.create(parent);
    if (result) {
      res
        .status(200)
        .send({ elev: result, message: "parent added", success: true });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const updateParent = async (req, res) => {
  try {
    let student = req.body;
    let id_user = req.headers["id_user"];

    let user = await entities.Utilizator.findOne({ where: { id: id_user } });
    if (user && user.tip_utilizator == "Administrator") {
      let result = await entities.Parent.update(parent, {
        where: { id: req.params.id },
      });
      if (result) {
        res
          .status(200)
          .send({ elev: result, message: "parent updated", success: true });
      } else {
        res.status(400).send({ message: "error occured", success: false });
      }
    } else {
      res.status(400).send({ message: "unauthorized", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const deleteParent = async (req, res) => {
  try {
    let student = await entities.Parent.findOne({
      where: { id: req.params.id },
    });
    if (parent) {
      await parent.destroy();
      res.status(200).send({ message: "parent deleted", success: false });
    } else {
      res.status(400).send({ message: "nu exista", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getCopii = async (req, res) => {
  try {
    let id_user = req.params.id_user;
    let parinte = await entities.Parinte.findAll({
      where: { id_utilizator: id_user },
    });
    let result = [];
    for (let i = 0; i < parinte.length; i++) {
      let elev = await entities.Elev.findByPk(parinte[i].id_copil);
      let user = await entities.Utilizator.findByPk(elev.id_utilizator);
      result.push({
        nume: user.nume,
        prenume: user.prenume,
        id_utilizator: user.id,
      });
    }
    res.status(200).send({ copii: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { addParent, updateParent, deleteParent, getCopii };
