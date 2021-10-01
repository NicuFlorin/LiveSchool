import axios, { getRequestError } from "./Axios";

const addCourse = async (disciplina) => {
  try {
    const res = await axios.post("/course/add", {
      denumire: disciplina.denumire,
      id_scoala: disciplina.id_scoala,
    });
    return { ok: true, disciplina: res.data.disciplina };
  } catch (err) {
    getRequestError(err);
  }
};

const getBySchool = async (id_scoala) => {
  try {
    const res = await axios.get(`/course/getBySchool/${id_scoala}`);
    return { ok: true, discipline: res.data.discipline };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByClass = async (id_clasa) => {
  try {
    const res = await axios.get(`/course/getByClass/${id_clasa}`);
    return { ok: true, discipline: res.data.discipline };
  } catch (err) {
    return getRequestError(err);
  }
};

const deleteCourse = async (id_disciplina) => {
  try {
    const res = await axios.delete("/course/delete/" + id_disciplina);
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (id, disciplina) => {
  try {
    const res = await axios.put("/course/update/" + id, { disciplina });
    return { ok: true, disciplina: res.data.disciplina };
  } catch (err) {
    return getRequestError(err);
  }
};

const Courses = { addCourse, getBySchool, getByClass, deleteCourse, update };
export default Courses;
