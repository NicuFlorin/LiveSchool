import axios, { getRequestError } from "./Axios";

const add = async (corigenta) => {
  try {
    const res = await axios.post("/corigenta/add", { corigenta });
    return { ok: true, corigenta: res.data.corigenta };
  } catch (err) {
    return getRequestError(err);
  }
};

const Corigenta = { add };
export default Corigenta;
