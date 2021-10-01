const { database, entities } = require("../database");

const addClass = async (req, res) => {
  try {
    let clasa = req.body;
    clasa.id_an_scolar = req.params.id_an_scolar;

    const result = await entities.Clasa.create(clasa);
    if (result) {
      res
        .status(200)
        .send({ message: "class created", success: true, clasa: result });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const getByStudent = async (req, res) => {
  try {
    let id_user = req.params.id_user;
    let elev = await entities.Elev.findOne({
      where: { id_utilizator: id_user },
    });
    let clasa = await entities.Clasa.findByPk(elev.id_clasa);
    if (clasa) res.status(200).send({ clasa: clasa });
    else throw new Error("missing class");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getBySchoolYear = async (req, res) => {
  try {
    let result = await entities.Clasa.findAll({
      where: {
        id_an_scolar: req.params.id_an_scolar,
      },
    });
    if (result.length > 0) {
      res.status(200).send({ success: true, clase: result });
    } else {
      result = await entities.IstoricClase.findAll({
        where: { id_an_scolar: req.params.id_an_scolar },
      });
      if (result) res.status(200).send({ clase: result });
      else res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const updateClass = async (req, res) => {
  try {
    let clasa = req.body;

    const result = await entities.Clasa.update(clasa, {
      where: { id: req.params.id },
    });

    if (result) {
      res
        .status(200)
        .send({ message: "class updated", id_clasa: result.id, success: true });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const promote = async (req, res) => {
  try {
    let id_clasa = req.params.id_clasa;
    let id_an_scolar = req.params.id_an_scolar;
    let clasa = await entities.Clasa.findByPk(id_clasa);
    let nr = clasa.numar;
    nr++;
    let result = await entities.Clasa.update(
      { numar: nr, id_an_scolar: id_an_scolar },
      { where: { id: id_clasa } }
    );
    res.status(200).send({ clasa: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    let id_clasa = req.params.id;
    let elev = await entities.Elev.findOne({ where: { id_clasa: id_clasa } });
    if (elev) {
      res.status(400).send({ message: "clasa contine elevi" });
      return;
    }
    let repartizare = await entities.RepartizareProfesor.findOne({
      where: { id_clasa: id_clasa },
    });
    if (repartizare) {
      res.status(400).send({ message: "clasa are profesori alocati" });
      return;
    }
    let clasa = await entities.Clasa.findByPk(id_clasa);
    await clasa.destoy();
    res.status(200).send({ message: "clasa stearsa" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  addClass,
  updateClass,
  getBySchoolYear,
  getByStudent,
  promote,
  deleteClass,
};
