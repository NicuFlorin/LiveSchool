const { entities } = require("../database");

const addAssignment = async (req, res) => {
  try {
    let assignment = req.body.assignment;
    if (
      !assignment.nume ||
      !assignment.tip_evaluare ||
      !assignment.pondere ||
      !assignment.id_repartizare ||
      !assignment.id_semestru
    ) {
      res.status(400).send({ message: "invalid assignment", success: false });
      return;
    }

    let result = await entities.Evaluare.create(assignment);
    if (result) {
      res.status(200).send({
        id_evaluare: result.id,
        success: true,
        message: "assignment added",
      });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const update = async (req, res) => {
  try {
    let assignment = req.body.assignment;
    let result = await entities.Evaluare.update(assignment, {
      where: { id: assignment.id },
    });
    if (result) {
      res.status(200).send({ assignment: result });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getAssignmentsWithGrades = async (req, res) => {
  try {
    let id_repartizare = req.params.id_repartizare;
    let id_semestru = req.params.id_semestru;
    let assignments = await entities.Evaluare.findAll({
      where: {
        id_repartizare: id_repartizare,
        id_semestru: id_semestru,
      },
    });
    let result = [];

    for (let i = 0; i < assignments.length; i++) {
      let noteDB = await entities.Nota.findAll({
        where: { id_evaluare: assignments[i].id },
      });
      let note = [];
      for (let j = 0; j < noteDB.length; j++) {
        note.push({
          id: noteDB[j].id,
          id_elev: noteDB[j].id_elev,
          nota: noteDB[j].nota,
          feedback: noteDB[j].feedback,
        });
      }
      result.push({
        id: assignments[i].id,
        nume: assignments[i].nume,
        note: note,
        tip_evaluare: assignments[i].tip_evaluare,
        descriere: assignments[i].descriere,
        pondere: assignments[i].pondere,
        data_creare: assignments[i].data_creare,
        termen_raspuns: assignments[i].termen_raspuns,
        fisier_atasat: assignments[i].fisier_atasat,
        ora_deadline: assignments[i].ora_deadline,
      });
    }
    res.status(200).send({ evaluari: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getByIdAndUser = async (req, res) => {
  try {
    let id_evaluare = req.params.id_evaluare;
    let assignment = await entities.Evaluare.findByPk(id_evaluare);
    let elev = await entities.Elev.findOne({
      where: { id_utilizator: req.params.id_user },
    });
    let nota = await entities.Nota.findOne({
      where: { id_evaluare: id_evaluare, id_elev: elev.id },
    });
    let result = { nota: "", feedback: "" };
    if (assignment) {
      result.id = id_evaluare;
      result.id_repartizare = assignment.id_repartizare;
      result.nume = assignment.nume;
      result.tip_evaluare = assignment.tip_evaluare;
      result.descriere = assignment.descriere;
      result.termen_raspuns = assignment.termen_raspuns;
      result.pondere = assignment.pondere;
      result.ora_deadline = assignment.ora_deadline;
    } else {
      throw new Error("missing assignment");
    }
    if (nota) {
      result.nota = nota.nota;
      result.feedback = nota.feedback;
    }
    res.status(200).send({ assignment: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    let id_evaluare = req.params.id_evaluare;
    let evaluare = await entities.Evaluare.findByPk(id_evaluare);
    if (evaluare) {
      res.status(200).send({ assignment: evaluare });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    let assignment = req.body;

    let result = await entities.Evaluare.update(assignment, {
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).send({
        evaluare: result,
        success: true,
        message: "assignment updated",
      });
    } else {
      res.status(400).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

const deleteAssignment = async (req, res) => {
  let assignment = await entities.Evaluare.findOne({
    where: { id: req.params.id },
  });
  if (!assignment) {
    res.status(400).send({ message: "nu exista", success: false });
    return;
  }

  let note = await entities.Note.findOne({
    where: { id_evaluare: req.params.id },
  });
  if (note) {
    res.status(400).send({ message: "exxista note" });
    return;
  }
  await assignment.destroy();
  res.status(200).send({ message: "assignment deleted", success: true });
};

module.exports = {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsWithGrades,
  getByIdAndUser,
  getById,
  update,
};
