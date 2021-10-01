import axios, { getRequestError } from "./Axios";

const add = async (istoric) => {
  try {
    const res = await axios.post("/istoricClase/add", { istoric });
    return { ok: true, istoricClasa: res.data.istoricClasa };
  } catch (err) {
    return getRequestError(err);
  }
};

const IstoricClase = { add };
export default IstoricClase;
