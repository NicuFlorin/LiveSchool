const { entities } = require("../database");
const { sendEmail } = require("./send-mail");

sendMail = async (grade) => {
  let elev = await entities.Elev.findByPk(grade.id_elev);
  let user = await entities.Utilizator.findByPk(elev.id_utilizator);
  let parinti = await entities.Parinte.findAll({
    where: { id_copil: grade.id_elev },
  });
  let email = user.email;
  let nota = grade.nota;
  let evaluare = await entities.Evaluare.findByPk(grade.id_evaluare);
  let repartizare = await entities.RepartizareProfesor.findByPk(
    evaluare.id_repartizare
  );
  let disciplina = await entities.Disciplina.findByPk(
    repartizare.id_disciplina
  );

  let message = `<p>${user.prenume}, ai primit nota ${nota} la ${disciplina.denumire} </p>
  <h4>Detalii nota:</h4>
  <ul>
  <li>Evaluare: ${evaluare.nume}</li>
  <li>Data: ${grade.data_nota}</li>
  <li>Nota: ${nota}</li>
  <li>Pondere: ${evaluare.pondere}</li>
  <li>Feedback: ${grade.feedback}</li>
  </ul>`;

  let subject = "Ai primit o nota";

  sendEmail(email, subject, message);

  for (let i = 0; i < parinti.length; i++) {
    let parinte = await entities.Utilizator.findByPk(parinti[i].id_utilizator);
    email = parinte.email;
    subject = `${user.prenume} a primit o nota`;
    message = `<p>Copilul dumneavoastra, ${
      user.prenume
    }, ai primit nota ${nota} la ${disciplina.denumire} </p>
    <h4>Detalii nota:</h4>
    <ul>
    <li>Evaluare: ${evaluare.nume}</li>
    <li>Nota: ${nota}</li>
    <li>Pondere: ${evaluare.pondere}</li>
    <li>Feedback: ${grade.feedback ? grade.feedback : "lipsa"}</li>
    </ul>`;
    sendEmail(email, subject, message);
  }
};

const addGrade = async (req, res) => {
  try {
    const grade = req.body.grade;
    if (!grade.id_evaluare || !grade.nota || !grade.id_elev) {
      res.status(400).send({ message: "invalid grade", success: false });
      return;
    }

    const result = await entities.Nota.create(grade);
    if (result) {
      sendMail(grade);
      res
        .status(200)
        .send({ nota: result, message: "grade added", success: true });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const updateGrade = async (req, res) => {
  try {
    let grade = req.body.grade;
    let id_elev = req.params.id_elev;
    let id_evaluare = req.params.id_evaluare;

    const result = await entities.Nota.update(grade, {
      where: { id_evaluare: id_evaluare, id_elev: id_elev },
    });
    if (result) {
      res
        .status(200)
        .send({ nota: result, message: "grade updated", success: true });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getByDiscipline = async (req, res) => {
  try {
    let id_repartizare = req.params.id_repartizare;
    let assignments = await entities.Evaluare.findAll({
      where: { id_repartizare: id_repartizare },
    });
    let result = [];
    for (let i = 0; i < assignments.length; i++) {
      let grade = await entities.Nota.findOne({
        where: { id_evaluare: assignments[i].id },
      });
      result.push({
        id: grade ? grade.id : "",
        id_evaluare: assignments[i].id,
        nota: grade ? grade.nota : "",
        tip_evaluare: assignments[i].tip_evaluare,
        pondere: assignments[i].pondere,
        data_nota: grade ? grade.data_nota : "",
      });
    }
    res.status(200).send({ grades: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getMedieByStudentAndDiscipline = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let id_elev = req.params.id_elev;
    let id_disciplina = req.params.id_disciplina;
    let semestre = await entities.Semestru.findAll({
      where: { id_an_scolar: id_an_scolar },
    });
    let elev = await entities.Elev.findByPk(id_elev);
    let id_clasa = elev.id_clasa;
    let repartizare = await entities.RepartizareProfesor.findOne({
      where: {
        id_clasa: id_clasa,
        id_disciplina: id_disciplina,
        id_an_scolar: id_an_scolar,
      },
    });
    let medii = [];
    for (let i = 0; i < semestre.length; i++) {
      let sumOfGrades = 0;
      let sumOfWeights = 0;
      let evaluari = await entities.Evaluare.findAll({
        where: { id_repartizare: repartizare.id, id_semestru: semestre[i].id },
      });

      for (let j = 0; j < evaluari.length; j++) {
        let nota = await entities.Nota.findOne({
          where: { id_elev: id_elev, id_evaluare: evaluari[j].id },
        });
        sumOfWeights += evaluari[j].pondere;
        if (nota && nota.nota != "") {
          sumOfGrades += nota.nota * evaluari[j].pondere;
        }
      }
      if (sumOfWeights > 0) {
        medii.push({ medie: sumOfGrades / sumOfWeights });
      } else medii.push({ medie: 0 });
    }
    res.status(200).send({ medie: (medii[0].medie + medii[1].medie) / 2 });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteGrade = async (req, res) => {
  try {
    let id_elev = req.params.id_elev;
    let id_evaluare = req.params.id_evaluare;
    let grade = await entities.Nota.findOne({
      where: { id_elev: id_elev, id_evaluare: id_evaluare },
    });
    if (!grade) {
      res.status(400).send({ message: "nu exista", success: false });
      return;
    }

    await grade.destroy();
    res.status(200).send({ message: "grade deleted", success: true });
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getByAssignment = async (req, res) => {
  try {
    let id_evaluare = req.params.id_evaluare;
    let note = await entities.Nota.findAll({
      where: { id_evaluare: id_evaluare },
    });
    res.status(200).send({ grades: note });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  addGrade,
  updateGrade,
  deleteGrade,
  getByDiscipline,
  getByAssignment,
  getMedieByStudentAndDiscipline,
};
