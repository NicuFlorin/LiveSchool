import axios, { getRequestError } from "./Axios";

const addSemestre = async (
  nume,
  data_inceput,
  data_sfarsit,
  id_an_scolar,
  id_admin
) => {
  try {
    const res = await axios.post(
      `/semestru/add/${id_an_scolar}`,
      { nume: nume, data_inceput: data_inceput, data_sfarsit: data_sfarsit },
      { headers: { id_user: id_admin } }
    );
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (data_inceput, data_sfarsit, id_semestru) => {
  try {
    const res = await axios.post(`/semestru/update/${id_semestru}`, {
      data_inceput: data_inceput,
      data_sfarsit: data_sfarsit,
    });
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const getBySchoolYear = async () => {
  try {
    let res = await axios.get(
      `/semestru/getBySchoolYear/${localStorage.getItem("id_an_scolar")}`
    );
    return { ok: true, semestre: res.data.semestre };
  } catch (err) {
    getRequestError(err);
  }
};

const Semestre = { addSemestre, getBySchoolYear, update };
export default Semestre;
