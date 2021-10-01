import axios, { getRequestError } from "./Axios";

const add = async (grade) => {
  try {
    const res = await axios.post("/grade/add", {
      grade,
    });
    return { ok: true, grade: res.data.nota };
  } catch (err) {
    return getRequestError(err);
  }
};
const update = async (grade) => {
  try {
    const res = await axios.put(
      "/grade/update/" + grade.id_evaluare + "/" + grade.id_elev,
      { grade }
    );
    return { ok: true, grade: res.data.nota };
  } catch (err) {
    return getRequestError(err);
  }
};

const deleteGrade = async (id_elev, id_evaluare) => {
  try {
    const res = await axios.delete(
      "/grade/delete/" + id_evaluare + "/" + id_elev
    );
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByDiscipline = async (id_repartizare) => {
  try {
    const res = await axios.get("/grade/getByDiscipline/" + id_repartizare);
    return { ok: true, grades: res.data.grades };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByAssignment = async (id_evaluare) => {
  try {
    const res = await axios("/grade/getByAssignment/" + id_evaluare);
    return { ok: true, grades: res.data.grades };
  } catch (err) {
    return getRequestError(err);
  }
};

const getMedieByStudentAndDiscipline = async (id_elev, id_disciplina) => {
  try {
    const res = await axios.get(
      "/grade/getMedie/" +
        localStorage.getItem("id_an_scolar") +
        "/" +
        id_disciplina +
        "/" +
        id_elev
    );

    return { ok: true, medie: res.data.medie };
  } catch (err) {
    return getRequestError(err);
  }
};

const Grade = {
  add,
  update,
  deleteGrade,
  getByDiscipline,
  getByAssignment,
  getMedieByStudentAndDiscipline,
};
export default Grade;
