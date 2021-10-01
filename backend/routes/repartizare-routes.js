const { database, entities } = require("../database");

const addRepartizare = async (req, res) => {
  try {
    let repartizare = await req.body;
    if (
      !repartizare.id_profesor ||
      !repartizare.id_disciplina ||
      !repartizare.id_clasa ||
      !repartizare.id_an_scolar
    ) {
      res.status(400).send({ message: "bad request" });
      return;
    }
    let result = await entities.RepartizareProfesor.create(req.body);
    if (result) {
      res.status(200).send({ repartizare: result });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getClaseDisponibile = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let id_disciplina = req.params.id_disciplina;

    let clase = await entities.Clasa.findAll({
      where: { id_an_scolar: id_an_scolar },
    });

    let result = [];

    for (let i = 0; i < clase.length; i++) {
      let repartizare = await entities.RepartizareProfesor.findOne({
        where: { id_clasa: clase[i].id, id_disciplina: id_disciplina },
      });
      if (!repartizare) {
        result.push({
          id: clase[i].id,
          numar: clase[i].numar,
          serie: clase[i].serie,
        });
      }
    }
    res.status(200).send({ clase: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getByTeacher = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let id_profesor = req.params.id_profesor;
    let id_scoala = req.params.id_scoala;

    let disciplineDB = await entities.Disciplina.findAll({
      where: { id_scoala: id_scoala },
    });
    let discipline = [];
    for (let i = 0; i < disciplineDB.length; i++) {
      let repartizariDB = await entities.RepartizareProfesor.findAll({
        where: {
          id_profesor: id_profesor,
          id_disciplina: disciplineDB[i].id,
          id_an_scolar: id_an_scolar,
        },
      });
      let clase = [];
      for (let j = 0; j < repartizariDB.length; j++) {
        let clasaDB = await entities.Clasa.findByPk(repartizariDB[j].id_clasa);
        if (clasaDB) {
          clase.push({
            id_clasa: clasaDB.id,
            numar: clasaDB.numar,
            serie: clasaDB.serie,
            id_repartizare: repartizariDB[j].id,
          });
        }
      }
      if (clase.length > 0)
        discipline.push({
          id_disciplina: disciplineDB[i].id,
          denumire: disciplineDB[i].denumire,
          clase: clase,
        });
    }

    res.status(200).send({ discipline: discipline });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { addRepartizare, getByTeacher, getClaseDisponibile };
