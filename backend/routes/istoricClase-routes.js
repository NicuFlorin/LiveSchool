const { entities } = require("../database");

const add = async (req, res) => {
  try {
    let istoric = req.body.istoric;
    if (
      !istoric.id ||
      !istoric.id_an_scolar ||
      !istoric.numar ||
      !istoric.serie
    ) {
      res.status(400).send({ message: "istoric clasa invalid" });
      return;
    }
    let result = await entities.IstoricClase.create(istoric);
    if (result) {
      res.status(200).send({ istoricClasa: result });
    } else res.status(400).send({ message: "error occured" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { add };
