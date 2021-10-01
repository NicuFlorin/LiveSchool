import axios, { getRequestError } from "./Axios";

const add = async (repartizare) => {
  try {
    const res = await axios.post("/repartizare/add", repartizare);
    return { ok: true, repartizare: res.data.repartizare };
  } catch (err) {
    return getRequestError(err);
  }
};

const getByTeacher = async (id_scoala, id_profesor) => {
  try {
    let id_an_scolar = localStorage.getItem("id_an_scolar");
    const res = await axios.get(
      `/repartizare/getByTeacher/${id_scoala}/${id_an_scolar}/${id_profesor}`
    );

    return { ok: true, repartizari: res.data.discipline };
  } catch (err) {
    return getRequestError(err);
  }
};

const getClaseDisponibile = async (id_disciplina) => {
  try {
    const res = await axios.get(
      `/repartizare/getClaseDisponibile/${localStorage.getItem(
        "id_an_scolar"
      )}/${id_disciplina}`
    );
    return { ok: true, clase: res.data.clase };
  } catch (err) {
    return getRequestError(err);
  }
};

const Repartizare = { add, getByTeacher, getClaseDisponibile };
export default Repartizare;
