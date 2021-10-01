const { entities } = require("../database");
const { Op } = require("sequelize");

const addAnScolar = async (req, res) => {
  try {
    let anScolar = req.body;
    anScolar.id_scoala = req.params.id_scoala;
    if (!anScolar.data_inceput || !anScolar.data_sfarsit) {
      res.status(400).send({ message: "an scolar invalid", success: false });
      return;
    }
    let id_user = req.headers["id_user"];
    let user = await entities.Utilizator.findOne({ where: { id: id_user } });
    if (
      user &&
      user.id_scoala == anScolar.id_scoala &&
      user.tip_utilizator == "Administrator"
    ) {
      if (anScolar.data_inceput > anScolar.data_sfarsit) {
        res.status(400).send({ message: "an scolar invalid", success: false });
        return;
      }
      let result = await entities.AnScolar.create(anScolar);
      if (result) {
        res.status(200).send({
          message: "an scolar adaugat",
          id_an_scolar: result.id,
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
    let anScolar = req.body;

    if (anScolar.data_inceput > anScolar.data_sfarsit) {
      res.status(400).send({ message: "an scolar invalid", success: false });
      return;
    }
    let result = await entities.AnScolar.update(anScolar, {
      where: { id: req.params.id_an_scolar },
    });
    if (result) {
      res.status(200).send({
        message: "an scolar adaugat",
        id_an_scolar: result.id,
        success: true,
      });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getBySchool = async (req, res) => {
  try {
    let aniScolari = await entities.AnScolar.findAll({
      where: {
        id_scoala: req.params.id_scoala,
      },
    });
    if (aniScolari && aniScolari.length >= 0) {
      res.status(200).send({ aniScolari: aniScolari });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getAllWithSemester = async (req, res) => {
  try {
    let aniScolari = await entities.AnScolar.findAll({
      where: {
        id_scoala: req.params.id_scoala,
      },
    });

    if (aniScolari) {
      let result = [];
      for (let i = 0; i < aniScolari.length; i++) {
        let semestre = await entities.Semestru.findAll({
          where: { id_an_scolar: aniScolari[i].id },
        });

        let semestreRes = [];
        for (let j = 0; j < semestre.length; j++) {
          semestreRes.push({
            id: semestre[j].id,
            data_inceput: semestre[j].data_inceput,
            data_sfarsit: semestre[j].data_sfarsit,
            id_an_scolar: semestre[j].id_an_scolar,
          });
        }

        result.push({
          id: aniScolari[i].id,
          data_inceput: aniScolari[i].data_inceput,
          data_sfarsit: aniScolari[i].data_sfarsit,
          semestre: semestreRes,
        });
      }
      res.status(200).send({ aniScolari: result });
    } else res.status(400).send({ message: "error" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getAnScolarUrmator = async (req, res) => {
  try {
    let anScolarCurent = await entities.AnScolar.findByPk(
      req.params.id_an_scolar
    );
    let aniScolari = await entities.AnScolar.findAll({
      where: {
        id_scoala: req.params.id_scoala,
        data_inceput: { [Op.gt]: anScolarCurent.data_inceput },
      },
      order: [["data_inceput", "ASC"]],
    });
    if (aniScolari.length > 0) {
      res.status(200).send({ anScolar: aniScolari[0] });
    } else {
      res.status(400).send({ message: "nu exista" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  addAnScolar,
  getBySchool,
  getAnScolarUrmator,
  getAllWithSemester,
  update,
};
