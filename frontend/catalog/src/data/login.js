import axios, { getRequestError } from "./Axios";

const login = async (email, parola) => {
  try {
    const res = await axios.post("/login", {
      email: email,
      parola: parola,
    });
    return {
      ok: true,
      message: "Successgully logged in",
      userId: res.data.userId,
    };
  } catch (err) {
    return getRequestError(err);
  }
};

const logout = async () => {
  try {
    const res = await axios.post("/logout", {});

    return { ok: true, message: res.data.message };
  } catch (err) {
    return getRequestError(err);
  }
};

const register = async (user, id_admin) => {
  try {
    const res = await axios.post(
      "/register",
      { user: user },
      { headers: { id_user: id_admin } }
    );
    return { ok: true, message: res.data.message, id_admin: res.data.id };
  } catch (err) {
    return getRequestError(err);
  }
};

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
  }
  var end = document.cookie.indexOf(";", begin);
  if (end == -1) {
    end = dc.length;
  }
  return unescape(dc.substring(begin + prefix.length, end));
}

const getCurrentLoggedIn = async () => {
  try {
    const res = await axios.get("/isLoggedIn");
    return {
      ok: res.data.result,
      user: res.data.user,
    };
  } catch (err) {
    return getRequestError(err);
  }
};

const checkLoggedIn = () => {
  return {
    isLoggedIn: document.cookie.includes("isLoggedIn"),
    tip_utilizator: getCookie("tip_utilizator"),
  };
};

const Login = {
  login,
  logout,
  register,
  getCurrentLoggedIn,
  checkLoggedIn,
};
export default Login;
