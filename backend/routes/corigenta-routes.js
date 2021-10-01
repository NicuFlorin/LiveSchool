const { database, entities } = require("../database");

const add = async (req, res) => {
  try {
    let corigenta = req.body.corigenta;
    if (
      !corigenta.id_elev ||
      !corigenta.id_disciplina ||
      !corigenta.id_an_scolar ||
      !corigenta.clasa
    ) {
      res.status(400).send({ message: "corigenta invalida" });
      return;
    }
    let result = await entities.Corigenta.create(corigenta);
    if (result) {
      res
        .status(200)
        .send({ corigenta: result, message: "corigenta adaugata" });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { add };
