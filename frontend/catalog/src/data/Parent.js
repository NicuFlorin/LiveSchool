import axios, { getRequestError } from "./Axios";

const add = async (parent, id_admin) => {
  try {
    const resUser = await axios.post(
      "/user/add",
      { user: parent },
      { headers: { id_user: id_admin } }
    );

    if (resUser.data.success) {
      const res = await axios.post(`/parent/add`, {
        id_utilizator: resUser.data.id,
        id_copil: parent.id_copil,
      });
      return { ok: true, parinte: res.data.parinte };
    } else return { ok: false };
  } catch (err) {
    return getRequestError(err);
  }
};

const getCopii = async (id_user) => {
  try {
    const res = await axios.get("/parent/getCopii/" + id_user);
    return { ok: true, copii: res.data.copii };
  } catch (err) {
    return getRequestError(err);
  }
};

const Parent = { add, getCopii };
export default Parent;
