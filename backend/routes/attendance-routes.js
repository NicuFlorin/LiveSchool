const { entities } = require("../database");
const { sendEmail } = require("./send-mail");
const { Op } = require("sequelize");
sendMail = async (attendance) => {
  let elev = await entities.Elev.findByPk(attendance.id_elev);
  let user = await entities.Utilizator.findByPk(elev.id_utilizator);
  let parinti = await entities.Parinte.findAll({
    where: { id_copil: grade.id_elev },
  });
  let email = user.email;
  let participare = attendance.tip_participare;

  let repartizare = await entities.RepartizareProfesor.findByPk(
    attendance.id_repartizare
  );
  let disciplina = await entities.Disciplina.findByPk(
    repartizare.id_disciplina
  );

  let message = `<p>${user.prenume}, ai fost marcat ca ${participare} la ${
    disciplina.denumire
  } </p>
  <h4>Detalii:</h4>
  <ul>
  <li>Data: ${attendance.data_participare}</li>
  <li>Tip:${attendance.tip_participare}</li>
  <li>Comentariu: ${attendance.comentariu ? attendance.comentariu : "fara"}</li>
  </ul>`;

  let subject = "Notificare participare";

  sendEmail(email, subject, message);

  for (let i = 0; i < parinti.length; i++) {
    let parinte = await entities.Utilizator.findByPk(parinti[i].id_utilizator);
    email = parinte.email;
    subject = `${user.prenume}- participare la ora`;
    message = `<p>Copilul dumneavoastra, ${user.prenume}, a fost marcat ca ${
      attendance.tip_participare
    } la ${disciplina.denumire} </p>
    <h4>Detalii:</h4>
    <ul>
    <li>Data: ${attendance.data_participare}</li>
    <li>Tip:${attendance.tip_participare}</li>
    <li>Comentariu: ${
      attendance.comentariu ? attendance.comentariu : "fara"
    }</li>
    </ul>`;
    sendEmail(email, subject, message);
  }
};

async function getSemestru(data_participare, id_an_scolar) {
  if (!id_an_scolar) {
    throw new Error("missing school year");
  }
  let semestre = await entities.Semestru.findAll({
    where: { id_an_scolar: id_an_scolar },
  });

  for (let i = 0; i < semestre.length; i++) {
    if (
      semestre[i].data_inceput <= data_participare &&
      semestre[i].data_sfarsit >= data_participare
    ) {
      return semestre[i].id;
    }
  }
  throw new Error("not found");
}

const getAll = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let id_elev = req.params.id_elev;
    let semestre = await entities.Semestru.findAll({
      where: { id_an_scolar: id_an_scolar },
    });
    let result = {
      absenteNemotivate: 0,
      prezente: 0,
      absenteMotivate: 0,
      id_elev: id_elev,
    };
    for (let i = 0; i < semestre.length; i++) {
      let attendance = await entities.Participare.findAll({
        where: { id_semestru: semestre[i].id, id_elev: id_elev },
      });
      for (let j = 0; j < attendance.length; j++) {
        if (attendance[j].tip_participare == "Absent Nemotivat") {
          result.absenteNemotivate++;
        } else if (attendance[j].tip_participare == "Prezent") {
          result.prezente++;
        } else result.absenteMotivate++;
      }
    }
    res.status(200).send({ attendance: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const addAttendance = async (req, res) => {
  try {
    let attendance = req.body.attendance;
    let id_an_scolar = req.headers["id_an_scolar"];

    if (
      !attendance.id_elev ||
      !attendance.tip_participare ||
      !attendance.data_participare ||
      !attendance.id_repartizare
    ) {
      res.status(400).send({ message: "invalid attendance", success: false });
      return;
    }
    attendance.id_semestru = await getSemestru(
      attendance.data_participare,
      id_an_scolar
    );
    let result = await entities.Participare.create(attendance);
    if (result) {
      res.status(200).send({
        message: "attendance added",
        success: false,
        attendance: result,
      });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getByStudentAndPeriod = async (req, res) => {
  try {
    let start_date = req.params.start_date;
    let final_date = req.params.final_date;
    let id_elev = req.params.id_elev;
    let attendance = await entities.Participare.findAll({
      where: {
        id_elev: id_elev,
        data_participare: { [Op.gte]: start_date },
        data_participare: { [Op.lte]: final_date },
      },
    });
    let result = {
      absenteNemotivate: 0,
      absenteMotivate: 0,
      prezente: 0,
    };
    for (let i = 0; i < attendance.length; i++) {
      if (attendance[i].tip_participare == "Absent Nemotivat") {
        result.absenteNemotivate++;
      } else if (attendance[i].tip_participare == "Prezent") {
        result.prezente++;
      } else result.absenteMotivate++;
    }
    res.status(200).send({ attendance: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getByStudentAndDate = async (req, res) => {
  try {
    let date = req.params.date;
    let id_user = req.params.id_user;
    let elev = await entities.Elev.findOne({
      where: { id_utilizator: id_user },
    });
    if (!elev) {
      throw new Error("missing student");
    }

    let attendance = await entities.Participare.findAll({
      where: { id_elev: elev.id, data_participare: date },
    });
    let result = [];
    for (let i = 0; i < attendance.length; i++) {
      let repartizare = await entities.RepartizareProfesor.findByPk(
        attendance[i].id_repartizare
      );
      let disciplina = await entities.Disciplina.findByPk(
        repartizare.id_disciplina
      );
      result.push({
        disciplina: disciplina.denumire,
        tip_participare: attendance[i].tip_participare,
        comentariu: attendance[i].comentariu,
      });
    }

    res.status(200).send({ attendance: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getByDate = async (req, res) => {
  try {
    let data_participare = req.params.data_participare;
    let id_repartizare = req.params.id_repartizare;
    let attendance = await entities.Participare.findAll({
      where: {
        data_participare: data_participare,
        id_repartizare: id_repartizare,
      },
    });

    res.status(200).send({ attendance: attendance });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    let attendance = req.body.attendance;

    let result = await entities.Participare.update(attendance, {
      where: { id: attendance.id },
    });
    if (result) {
      res.status(200).send({
        message: "attendance updated",
        success: false,
        participare: result,
      });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const getNrNemotivate = async (req, res) => {
  try {
    let id_an_scolar = req.params.id_an_scolar;
    let id_elev = req.params.id_elev;

    let semestre = await entities.Semestru.findAll({
      where: { id_an_scolar: id_an_scolar },
    });
    let nr = 0;

    for (let i = 0; i < semestre.length; i++) {
      let attendance = await entities.Participare.findAll({
        where: {
          id_elev: id_elev,
          id_semestru: id_semestru,
          tip_participare: "Absent Nemotivat",
        },
      });
      nr += attendance.length;
    }
    res.status(200).send({ numar: nr });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  addAttendance,
  updateAttendance,
  getByDate,
  getByStudentAndDate,
  getNrNemotivate,
  getAll,
  getByStudentAndPeriod,
};
