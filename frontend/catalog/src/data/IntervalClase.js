import axios, { getRequestError } from "./Axios";

const add = async (interval) => {
  try {
    const res = await axios.post("/intervalClase/add", { interval });
    return { ok: true, interval: res.data.interval };
  } catch (err) {
    return getRequestError(err);
  }
};

const get = async (id_scoala) => {
  try {
    const res = await axios.get("/intervalClase/get/" + id_scoala);
    return { ok: true, interval: res.data.interval };
  } catch (err) {
    return getRequestError(err);
  }
};

const update = async (id, interval) => {
  try {
    const res = await axios.put("/intervalClase/update/" + id, { interval });
    return { ok: true, interval: res.data.interval };
  } catch (err) {
    return getRequestError(err);
  }
};

const IntervalClase = { add, update, get };

export default IntervalClase;
