const { entities } = require("../database");

const getBySchool = async (req, res) => {
  try {
    let id_scoala = req.params.id_scoala;
    let conditii = await entities.ConditiiPromovare.findOne({
      where: { id_scoala: id_scoala },
    });
    if (conditii) {
      res.status(200).send({ conditii: conditii });
    } else res.status(200).send({ conditii: null });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const add = async (req, res) => {
  try {
    let conditii = req.body.conditii;
    if (
      !conditii.id_scoala ||
      !conditii.corigente_max ||
      !conditii.absente_max
    ) {
      res.status(400).send({ message: "conditii invalide" });
      return;
    }
    let result = await entities.ConditiiPromovare.create(conditii);
    if (result) {
      res.status(200).send({ message: "conditie adaugata", conditii: result });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    let id_conditie = req.params.id;
    let conditii = req.body.conditii;
    let result = await entities.ConditiiPromovare.update(conditii, {
      where: { id: id_conditie },
    });
    if (result) {
      res
        .status(200)
        .send({ conditii: result, message: "conditie actualizata" });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { getBySchool, add, update };
