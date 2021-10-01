import axios, { getRequestError } from "./Axios";

const getByDate = async (data_participare, id_repartizare) => {
  try {
    let res = await axios.get(
      `/attendance/getByDate/${data_participare}/${id_repartizare}`
    );
    return { ok: true, attendance: res.data.attendance };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByStudentAndDate = async (data_participare, id_user) => {
  try {
    let res = await axios.get(
      "/attendance/getByStudentAndDate/" + data_participare + "/" + id_user
    );
    return { ok: true, attendance: res.data.attendance };
  } catch (err) {
    return getRequestError(err);
  }
};

const add = async (attendance) => {
  try {
    let res = await axios.post(
      "/attendance/add",
      { attendance },
      { headers: { id_an_scolar: localStorage.getItem("id_an_scolar") } }
    );
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const getAll = async (id_elev) => {
  try {
    const res = await axios.get(
      "/attendance/getAll/" +
        localStorage.getItem("id_an_scolar") +
        "/" +
        id_elev
    );
    return { ok: true, attendance: res.data.attendance };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByStudentAndPeriod = async (id_elev, start_date, final_date) => {
  try {
    const res = await axios.get(
      "/attendance/getByStudentAndPeriod/" +
        start_date +
        "/" +
        final_date +
        "/" +
        id_elev
    );
    return { ok: true, attendance: res.data.attendance };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (attendance) => {
  try {
    let res = await axios.put("/attendance/update", { attendance });
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const getNrNemotivate = async (id_elev) => {
  try {
    const res = await axios.get(
      `/attendance/getNrNemotivate/${localStorage.getItem(
        "id_an_scolar"
      )}/${id_elev}`
    );
  } catch (err) {
    return getRequestError(err);
  }
};

const Attendance = {
  getByDate,
  add,
  update,
  getByStudentAndDate,
  getNrNemotivate,
  getAll,
  getByStudentAndPeriod,
};
export default Attendance;
