import axios, { getRequestError } from "./Axios";
import Semestre from "./Semestre";

const addYear = async (
  data_inceput_semestrul1,
  data_sfarsit_semestrul1,
  data_inceput_semestrul2,
  data_sfarsit_semestrul2,
  id_scoala,
  id_admin
) => {
  try {
    const res = await axios.post(
      `/anScolar/add/${id_scoala}`,
      {
        data_inceput: data_inceput_semestrul1,
        data_sfarsit: data_sfarsit_semestrul2,
      },
      {
        headers: { id_user: id_admin },
      }
    );

    const addSemestre1 = await Semestre.addSemestre(
      "Semestrul 1",
      data_inceput_semestrul1,
      data_sfarsit_semestrul1,
      res.data.id_an_scolar,
      id_admin
    );
    const addSemestre2 = await Semestre.addSemestre(
      "Semestrul 2",
      data_inceput_semestrul2,
      data_sfarsit_semestrul2,
      res.data.id_an_scolar,
      id_admin
    );
    return { ok: true, id_an_scolar: res.data.id_an_scolar };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (
  data_inceput_semestrul1,
  data_sfarsit_semestrul1,
  data_inceput_semestrul2,
  data_sfarsit_semestrul2,
  id_an_scolar,
  id_semestrul1,
  id_semestrul2
) => {
  try {
    const res = await axios.put(`/anScolar/update/${id_an_scolar}`, {
      data_inceput: data_inceput_semestrul1,
      data_sfarsit: data_sfarsit_semestrul2,
    });

    const addSemestre1 = await Semestre.update(
      data_inceput_semestrul1,
      data_sfarsit_semestrul1,
      id_semestrul1
    );
    const addSemestre2 = await Semestre.update(
      "Semestrul 2",
      data_inceput_semestrul2,
      data_sfarsit_semestrul2,
      id_semestrul2
    );
    return { ok: true };
  } catch (err) {
    return getRequestError(err);
  }
};

const getBySchool = async (id_scoala) => {
  try {
    const res = await axios.get(`/anScolar/getBySchool/${id_scoala}`);
    return { ok: true, aniScolari: res.data.aniScolari };
  } catch (err) {
    return getRequestError(err);
  }
};

const getAnScolarUrmator = async (id_scoala) => {
  try {
    const res = await axios.get(
      "/anScolar/getAnScolarUrmator/" +
        id_scoala +
        "/" +
        localStorage.getItem("id_an_scolar")
    );
    return { ok: true, anScolar: res.data.anScolar };
  } catch (err) {
    return getRequestError(err);
  }
};

const getAllWithSemester = async (id_scoala) => {
  try {
    const res = await axios.get("/anScolar/getAllWithSemester/" + id_scoala);
    return { ok: true, aniScolari: res.data.aniScolari };
  } catch (err) {
    return getRequestError(err);
  }
};

const SchoolYear = {
  addYear,
  getBySchool,
  getAnScolarUrmator,
  getAllWithSemester,
  update,
};
export default SchoolYear;
