const { entities } = require("../database");

const addStudent = async (req, res) => {
  try {
    let student = req.body;
    if (!student.id_clasa || !student.id_utilizator) {
      res.status(400).send({ message: "invalid student", success: false });
      return;
    }
    let id_user = req.headers["id_user"];
    let user = await entities.Utilizator.findOne({ where: { id: id_user } });
    if (user && user.tip_utilizator == "Administrator") {
      let result = await entities.Elev.create(student);
      if (result) {
        res
          .status(200)
          .send({ elev: result, message: "student added", success: true });
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

const getBySchoolYear = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let clase = await entities.Clasa.findAll({
      where: { id_an_scolar: id_an_scolar },
    });

    if (clase.length == 0) {
      clase = await entities.IstoricClase.findAll({
        where: { id_an_scolar: id_an_scolar },
      });
    }
    let result = [];
    for (let i = 0; i < clase.length; i++) {
      let elevi = await entities.Elev.findAll({
        where: { id_clasa: clase[i].id },
      });
      for (let j = 0; j < elevi.length; j++) {
        let user = await entities.Utilizator.findByPk(elevi[j].id_utilizator);
        result.push({
          id: user.id,
          nume: user.nume,
          prenume: user.prenume,
          telefon: user.telefon,
          data_nasterii: user.data_nasterii,
          email: user.email,
          adresa: user.adresa,
          id_elev: elevi[j].id,
          id_clasa: elevi[j].id_clasa,
          numar_clasa: clase[i].numar,
          serie_clasa: clase[i].serie,
        });
      }
    }
    res.status(200).send({ elevi: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getByClass = async (req, res) => {
  try {
    let id_clasa = req.params.id_clasa;
    let eleviDB = await entities.Elev.findAll({
      where: { id_clasa: id_clasa },
    });
    let result = [];
    for (let i = 0; i < eleviDB.length; i++) {
      let user = await entities.Utilizator.findByPk(eleviDB[i].id_utilizator);
      result.push({
        nume: user.nume,
        prenume: user.prenume,
        id_elev: eleviDB[i].id,
      });
    }
    res.status(200).send({ elevi: result });
  } catch (err) {
    res.status(400).send({ messgae: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    let student = req.body.student;

    let result = await entities.Elev.update(student, {
      where: { id: req.params.id_student },
    });
    if (result) {
      res
        .status(200)
        .send({ student: result, message: "student updated", success: true });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let student = await entities.Elev.findOne({ where: { id: req.params.id } });
    if (student) {
      let note = await entities.Nota.findAll({
        where: { id_elev: req.params.id },
      });
      for (let i = 0; i < note.length; i++) {
        await note[i].destroy();
      }
      let participari = await entities.Participare.findAll({
        where: {
          id_elev: req.params.id_elev,
        },
      });
      for (let i = 0; i < participari.length; i++) {
        await participari[i].destroy();
      }
      let parinti = await entities.Parinte.findAll({
        where: { id_copil: req.params.id_elev },
      });
      for (let i = 0; i < parinti.length; i++) {
        await parinti[i].destroy();
      }
      let corigenti = await entities.Corigenta.findAll({
        where: { id_elev: req.params.id_elev },
      });
      for (let i = 0; i < corigenti.length; i++) {
        await corigenti[i].destroy();
      }
      let repetenti = await entities.Repetent.findAll({
        where: { id_elev: req.params.id_elev },
      });
      for (let i = 0; i < repetenti.length; i++) {
        await repetenti[i].destroy();
      }
      await student.destroy();
      res.status(200).send({ message: "student deleted", success: false });
    } else {
      res.status(400).send({ message: "nu exista", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getByRepartizare = async (req, res) => {
  try {
    let id_repartizare = req.params.id_repartizare;
    let repartizare = await entities.RepartizareProfesor.findByPk(
      id_repartizare
    );
    let elevi = await entities.Elev.findAll({
      where: { id_clasa: repartizare.id_clasa },
    });
    let result = [];
    for (let i = 0; i < elevi.length; i++) {
      let user = await entities.Utilizator.findByPk(elevi[i].id_utilizator);
      result.push({
        id_elev: elevi[i].id,
        nume: user.nume,
        prenume: user.prenume,
        id_utilizator: elevi[i].id_utilizator,
      });
    }
    res.status(200).send({ elevi: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getWithParents = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let clase = await entities.Clasa.findAll({
      where: { id_an_scolar: id_an_scolar },
    });
    let result = [];
    for (let i = 0; i < clase.length; i++) {
      let eleviDB = await entities.Elev.findAll({
        where: { id_clasa: clase[i].id },
      });

      for (let j = 0; j < eleviDB.length; j++) {
        let user = await entities.Utilizator.findByPk(eleviDB[j].id_utilizator);
        let parents = await entities.Parinte.findAll({
          where: { id_copil: eleviDB[j].id },
        });
        let parinti = [];
        for (let k = 0; k < parents.length; k++) {
          let parent = await entities.Utilizator.findByPk(
            parents[k].id_utilizator
          );
          parinti.push({
            id: parents[k].id,
            id_utilizator: parent.id,
            id_copil: parents[k].id_copil,
            nume: parent.nume,
            prenume: parent.prenume,
          });
        }
        result.push({
          id: eleviDB[j].id,
          nume: user.nume,
          prenume: user.prenume,
          parinti: parinti,
        });
      }
    }
    res.status(200).send({ elevi: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getByParent = async (req, res) => {
  try {
    let id_user = req.params.id_user;
    id_an_scolar = req.params.id_an_scolar;
    let parinte = await entities.Parinte.findAll({
      where: { id_utilizator: id_user },
    });
    let result = [];

    for (let i = 0; i < parinte.length; i++) {
      let copil = await entities.Elev.findByPk(parinte[i].id_copil);
      let user = await entities.Utilizator.findByPk(copil.id_utilizator);

      let repartizari = await entities.RepartizareProfesor.findAll({
        where: {
          id_clasa: copil.id_clasa,
          id_an_scolar: id_an_scolar,
        },
      });
      let discipline = [];
      for (let j = 0; j < repartizari.length; j++) {
        let disciplina = await entities.Disciplina.findByPk(
          repartizari[j].id_disciplina
        );
        let assignments = await entities.Evaluare.findAll({
          where: { id_repartizare: repartizari[j].id },
        });

        let note = [];
        for (let k = 0; k < assignments.length; k++) {
          let grade = await entities.Nota.findOne({
            where: { id_evaluare: assignments[k].id },
          });

          note.push({
            nota: grade ? grade.nota : "",
            nume: assignments[k].nume,
            tip_evaluare: assignments[k].tip_evaluare,
            pondere: assignments[k].pondere,
            termen_predare: assignments[k].termen_predare,
            id_evaluare: assignments[k].id,
          });
        }
        discipline.push({
          denumire: disciplina.denumire,
          id_repartizare: repartizari[j].id,
          note: note,
        });
      }
      result.push({
        id: copil.id,
        id_utilizator: copil.id_utilizator,
        nume: user.nume,
        prenume: user.prenume,
        discipline: discipline,
      });
    }
    res.status(200).send({ copii: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getWithAttendance = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let date = req.params.date;
    let id_clasa = req.params.id_clasa;

    let students = await entities.Elev.findAll({
      where: { id_clasa: id_clasa },
    });

    let result = [];
    for (let i = 0; i < students.length; i++) {
      let user = await entities.Utilizator.findByPk(students[i].id_utilizator);

      let attendanceDB = await entities.Participare.findAll({
        where: { id_elev: students[i].id, data_participare: date },
      });
      let attendance = [];
      for (let j = 0; j < attendanceDB.length; j++) {
        attendance.push({
          id: attendanceDB[j].id,
          tip_participare: attendanceDB[j].tip_participare,
          comentariu: attendanceDB[j].comentariu,
        });
      }

      let semestre = await entities.Semestru.findAll({
        where: { id_an_scolar: id_an_scolar },
      });

      let nrTotalNemotivate = 0;

      for (let j = 0; j < semestre.length; j++) {
        let total = await entities.Participare.findAll({
          where: {
            id_semestru: semestre[j].id,
            id_elev: students[i].id,
            tip_participare: "Absent Nemotivat",
          },
        });
        nrTotalNemotivate += total.length;
      }

      result.push({
        id_utilizator: user.id,
        nume: user.nume,
        prenume: user.prenume,
        id_elev: students[i].id,
        attendance: attendance,
        nrTotalNemotivate: nrTotalNemotivate,
      });
    }
    res.status(200).send({ elevi: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getBySchoolYear,
  getByClass,
  getByRepartizare,
  getWithParents,
  getByParent,
  getWithAttendance,
};
