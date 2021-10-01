const { entities } = require("../database");

const addSemestre = async (req, res) => {
  try {
    let semestru = req.body;
    semestru.id_an_scolar = req.params.id_an_scolar;
    if (!semestru.data_inceput || !semestru.data_sfarsit) {
      res.status(400).send({ message: "semestru invalid", success: false });
      return;
    }
    let id_user = req.headers["id_user"];
    let user = await entities.Utilizator.findOne({ where: { id: id_user } });
    if (user && user.tip_utilizator == "Administrator") {
      if (semestru.data_inceput > semestru.data_sfarsit) {
        res.status(400).send({ message: "Semestru invalid", success: false });
        return;
      }
      let result = await entities.Semestru.create(semestru);
      if (result) {
        res.status(200).send({
          message: "semestru adaugat",
          semestru: result,
          success: true,
        });
      } else {
        res.status(400).send({ message: "error occured", success: false });
      }
    } else {
      res.status(400).send({ message: "neautorizat", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const update = async (req, res) => {
  try {
    let semestru = req.body;

    if (semestru.data_inceput > semestru.data_sfarsit) {
      res.status(400).send({ message: "Semestru invalid", success: false });
      return;
    }
    let result = await entities.Semestru.update(semestru, {
      where: { id: req.params.id_semestru },
    });
    if (result) {
      res.status(200).send({
        message: "semestru adaugat",
        semestru: result,
        success: true,
      });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getBySchoolYear = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let result = await entities.Semestru.findAll({
      where: {
        id_an_scolar: id_an_scolar,
      },
    });
    if (result) {
      res.status(200).send({ semestre: result });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports = { addSemestre, getBySchoolYear, update };
