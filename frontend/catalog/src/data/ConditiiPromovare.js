import axios, { getRequestError } from "./Axios";

const getBySchool = async (id_scoala) => {
  try {
    const res = await axios.get("/conditiiPromovare/getBySchool/" + id_scoala);
    return { ok: true, conditii: res.data.conditii };
  } catch (err) {
    return getRequestError(err);
  }
};

const add = async (conditii) => {
  try {
    const res = await axios.post("/conditiiPromovare/add", { conditii });
    return { ok: true, conditii: res.data.conditii };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (conditii) => {
  try {
    debugger;
    const res = await axios.put("/conditiiPromovare/update/" + conditii.id, {
      conditii,
    });
    return { ok: true, conditii: res.data.conditii };
  } catch (err) {
    return getRequestError(err);
  }
};

const ConditiiPromovare = { getBySchool, add, update };
export default ConditiiPromovare;
