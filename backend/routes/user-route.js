const { entities } = require("../database");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const user = req.body.user;
    if (
      !user.nume ||
      !user.prenume ||
      !user.email ||
      !user.parola ||
      !user.id_scoala ||
      !user.tip_utilizator
    ) {
      res.status(400).send({ message: "invalid user", success: false });
      return;
    }
    let id_admin = req.headers["id_user"];

    if (id_admin !== "undefined") {
      let admin = await entities.Utilizator.findOne({
        where: { id: id_admin },
      });
      if (
        admin &&
        (admin.id_scoala != user.id_scoala ||
          admin.tip_utilizator != "Administrator")
      ) {
        res
          .status(402)
          .send({ message: "nu ai voie sa faci asta", success: false });
        return;
      }
    }
    if (
      await entities.Utilizator.findOne({
        where: { email: user.email, tip_utilizator: user.tip_utilizator },
      })
    ) {
      res.status(400).send({ message: "user already exists", success: false });
      return;
    }
    user.parola = await bcrypt.hash(user.parola, bcrypt.genSaltSync(5));

    const result = await entities.Utilizator.create(user);

    //se inregistreaza adminul
    if (result && result.tip_utilizator == "Administrator") {
      req.session.userId = result.id;
      res.cookie("isLoggedIn", {}, { httpOnly: false });
      res.cookie("tip_utilizator", user.tip_utilizator);
      res
        .status(201)
        .send({ message: "user created", success: true, id: result.id });
      return;
    } else if (result) {
      res
        .status(201)
        .send({ message: "user created", success: true, id: result.id });
      return;
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;

    if (user.parola) {
      userToUpdate.parola = await bcrypt.hash(
        userToUpdate.parola,
        bcrypt.genSaltSync(5)
      );
    }

    const result = await entities.Utilizator.update(userToUpdate, {
      where: { id: userToUpdate.id },
    });

    if (result) {
      res.status(200).send({ message: "user updated", success: true });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const getTeachers = async (req, res) => {
  try {
    let id_scoala = req.params.id_scoala;

    let profesori = await entities.Utilizator.findAll({
      where: {
        id_scoala: id_scoala,
        tip_utilizator: "Profesor",
      },
    });
    if (profesori) {
      res.status(200).send({ profesori: profesori, message: "success" });
    } else res.status(200).send({ profesori: [], message: "not found" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getTeacherByRepartizare = async (req, res) => {
  try {
    let id_repartizare = req.params.id_repartizare;
    let repartizare = await entities.RepartizareProfesor.findByPk(
      id_repartizare
    );
    let profesor = await entities.Utilizator.findByPk(repartizare.id_profesor);
    if (profesor) {
      res.status(200).send({ id_profesor: profesor.id });
    } else throw new Error("missing user");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { addUser, updateUser, getTeachers, getTeacherByRepartizare };
