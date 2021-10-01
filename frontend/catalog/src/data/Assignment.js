import axios, { getRequestError } from "./Axios";

const getAssignmentsWithGrades = async (id_repartizare, id_semestru) => {
  try {
    let res = await axios.get(
      `/assignment/getAssignmentsWithGrades/${id_semestru}/${id_repartizare}`
    );
    return { ok: true, evaluari: res.data.evaluari };
  } catch (err) {
    return getRequestError(err);
  }
};

const add = async (assignment) => {
  try {
    let res = await axios.post("/assignment/add", { assignment });
    return { ok: true, id_evaluare: res.data.id_evaluare };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByIdAndUser = async (id_evaluare, id_user) => {
  try {
    let res = await axios.get(
      "/assignment/getByIdAndUser/" + id_evaluare + "/" + id_user
    );
    return { ok: true, assignment: res.data.assignment };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (assignment) => {
  try {
    let res = await axios.put("/assignments/update", { assignment });
    return { ok: true, assignment: res.data.assignment };
  } catch (err) {
    return getRequestError(err);
  }
};

const getById = async (id_evaluare) => {
  try {
    let res = await axios.get("/assignment/getById/" + id_evaluare);
    return { ok: true, assignment: res.data.assignment };
  } catch (err) {
    return getRequestError(err);
  }
};

const Assignment = {
  getAssignmentsWithGrades,
  add,
  getByIdAndUser,
  getById,
  update,
};
export default Assignment;
