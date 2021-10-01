import axios, { getRequestError } from "./Axios";

const addSchool = async (scoala) => {
  try {
    const res = await axios.post("/school/add", scoala);
    return { ok: true, id_scoala: res.data.id_scoala };
  } catch (err) {
    return getRequestError(err);
  }
};

const Scoala = { addSchool };
export default Scoala;
