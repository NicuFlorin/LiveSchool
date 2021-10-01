const { entities } = require("../database");

const add = async (req, res) => {
  try {
    let repetent = req.body.repetent;
    if (!repetent.id_elev || !repetent.id_scoala || !repetent.clasa) {
      res.status(400).send({ message: "repetent invalid" });
      return;
    }
    let result = await entities.Repetent.create(repetent);
    if (result) {
      res.status(200).send({ repetent: result });
    } else {
      res.status(200).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteRepetent = async (req, res) => {
  try {
    let id_elev = req.params.id_elev;
    let repetent = await entities.Repetent.findOne({
      where: { id_elev: id_elev },
    });
    await repetent.destroy();
    res.status(200).send({ message: "repetent sters" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getBySchool = async (req, res) => {
  try {
    let id_scoala = req.params.id_scoala;
    let repetenti = await entities.Repetent.findAll({
      where: { id_scoala: id_scoala },
    });
    if (repetenti) {
      res.status(200).send({ repetenti: repetenti });
    } else res.status(400).send({ message: "error occured" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { add, deleteRepetent, getBySchool };
