import axios, { getRequestError } from "./Axios";

const getBySchoolYear = async () => {
  try {
    const res = await axios.get(
      `/student/getBySchoolYear/${localStorage.getItem("id_an_scolar")}`
    );
    return { ok: true, elevi: res.data.elevi };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByClass = async (id_clasa) => {
  try {
    const res = await axios.get(`/student/getByClass/${id_clasa}`);
    return { ok: true, elevi: res.data.elevi };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByRepartizare = async (id_repartizare) => {
  try {
    const res = await axios.get("/student/getByRepartizare/" + id_repartizare);
    return { ok: true, elevi: res.data.elevi };
  } catch (err) {
    return getRequestError(err);
  }
};

const addStudent = async (student, id_admin) => {
  try {
    const resUser = await axios.post(
      "/user/add",
      { user: student },
      { headers: { id_user: id_admin } }
    );

    if (resUser.data.success) {
      const res = await axios.post(
        `/student/add/`,
        {
          id_utilizator: resUser.data.id,
          id_clasa: student.id_clasa,
        },
        { headers: { id_user: id_admin } }
      );
      return { ok: true, elevi: res.elevi };
    } else return { ok: false };
  } catch (err) {
    return getRequestError(err);
  }
};

const getStudentsWithParents = async () => {
  try {
    const res = await axios.get(
      "/student/getWithParents/" + localStorage.getItem("id_an_scolar")
    );
    return { ok: true, elevi: res.data.elevi };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByParent = async (id_user) => {
  try {
    debugger;
    const res = await axios.get(
      "/student/getByParent/" +
        localStorage.getItem("id_an_scolar") +
        "/" +
        id_user
    );
    return { ok: true, copii: res.data.copii };
  } catch (err) {
    return getRequestError(err);
  }
};

const getWithAttendance = async (id_clasa, date) => {
  try {
    const res = await axios.get(
      `/student/getWithAttendance/${localStorage.getItem(
        "id_an_scolar"
      )}/${date}/${id_clasa}`
    );

    return { ok: true, elevi: res.data.elevi };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (id_elev, student) => {
  try {
    const res = await axios.put("/student/update/" + id_elev, { student });
    return { ok: true, student: res.data.student };
  } catch (err) {
    return getRequestError(err);
  }
};

const Student = {
  getBySchoolYear,
  addStudent,
  getByClass,
  getByRepartizare,
  getStudentsWithParents,
  getByParent,
  getWithAttendance,
  update,
};
export default Student;
