import axios, { getRequestError } from "./Axios";

const add = async (repetent) => {
  try {
    const res = await axios.post("/repetenti/add", { repetent });
    return { ok: true, repetent: res.data.repetent };
  } catch (err) {
    return getRequestError(err);
  }
};

const deleteRepetent = async (id_elev) => {
  try {
    const res = await axios.delete("/repetenti/delete/" + id_elev);
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const getBySchool = async (id_scoala) => {
  try {
    const res = await axios.get("/repetenti/getBySchool/" + id_scoala);
    return { ok: true, repetenti: res.data.repetenti };
  } catch (err) {
    return getRequestError(err);
  }
};

const Repetent = { add, deleteRepetent, getBySchool };
export default Repetent;
