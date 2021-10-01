const { entities } = require("../database");

const addCourse = async (req, res) => {
  try {
    let disciplina = req.body;

    let result = await entities.Disciplina.create(disciplina);

    if (result) {
      res
        .status(200)
        .send({ message: "course added", success: true, disciplina: result });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getByClass = async (req, res) => {
  try {
    let id_clasa = req.params.id_clasa;
    let repartizari = await entities.RepartizareProfesor.findAll({
      where: { id_clasa: id_clasa },
    });
    let result = [];
    for (let i = 0; i < repartizari.length; i++) {
      let disciplina = await entities.Disciplina.findByPk(
        repartizari[i].id_disciplina
      );
      result.push({
        id: disciplina.id,
        denumire: disciplina.denumire,
        id_repartizare: repartizari[i].id,
      });
    }
    res.status(200).send({ discipline: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getBySchool = async (req, res) => {
  try {
    let id_scoala = req.params.id_scoala;
    let result = await entities.Disciplina.findAll({
      where: { id_scoala: id_scoala },
    });
    if (result) {
      res.status(200).send({ discipline: result });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    let disciplina = req.body.disciplina;
    let result = await entities.Disciplina.update(disciplina, {
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).send({ disciplina: result });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    let id_disciplina = req.params.id;

    let repartizare = await entities.RepartizareProfesor.findOne({
      where: { id_disciplina: id_disciplina },
    });
    if (repartizare) {
      res.status(400).send({ message: "disciplina nu poate fi stearsa" });
      return;
    }
    let disciplina = await entities.Disciplina.findByPk(id_disciplina);
    await disciplina.destroy();
    res.status(200).send({ message: "disciplina a fost stearsa" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { addCourse, getBySchool, getByClass, update, deleteCourse };
