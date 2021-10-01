import axios, { getRequestError } from "./Axios";

const getBySchoolYear = async () => {
  try {
    const res = await axios.get(
      `/class/getBySchoolYear/${localStorage.getItem("id_an_scolar")}`
    );
    return { ok: true, clase: res.data.clase };
  } catch (err) {
    return getRequestError(err);
  }
};

const addClass = async (clasa) => {
  try {
    let id_an_scolar = localStorage.getItem("id_an_scolar");
    const res = await axios.post(`/class/add/${id_an_scolar}`, clasa);
    return { ok: true, clase: res.data.clase };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByStudent = async (id_user) => {
  try {
    const res = await axios.get(`/class/getByStudent/${id_user}`);
    return { ok: true, clasa: res.data.clasa };
  } catch (err) {
    return getRequestError(err);
  }
};

const promote = async (id_clasa, id_an_scolar) => {
  try {
    const res = await axios.put(
      "/class/promote/" + id_an_scolar + "/" + id_clasa
    );
    return { ok: true, clasa: res.data.clasa };
  } catch (err) {
    return getRequestError(err);
  }
};

const Clase = { getBySchoolYear, addClass, getByStudent, promote };
export default Clase;
