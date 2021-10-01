import axios, { getRequestError } from "./Axios";

const addTeacher = async (teacher, id_admin) => {
  try {
    const res = await axios.post(
      "/user/add",
      { user: teacher },
      {
        headers: { id_user: id_admin },
      }
    );
    return { ok: true, id_profesor: res.data.id_profesor, profesor: teacher };
  } catch (err) {
    return getRequestError(err);
  }
};

const getTeachersBySchool = async (id_scoala) => {
  try {
    const res = await axios.get("/profesori/get/" + id_scoala);

    return { ok: true, profesori: res.data.profesori };
  } catch (err) {
    return getRequestError(err);
  }
};

const getTeacherByRepartizare = async (id_repartizare) => {
  try {
    const res = await axios.get(
      "/profesor/getTeacherByRepartizare/" + id_repartizare
    );
    return { ok: true, id_profesor: res.data.id_profesor };
  } catch (err) {
    return getRequestError(err);
  }
};

const Teacher = { addTeacher, getTeachersBySchool, getTeacherByRepartizare };
export default Teacher;
