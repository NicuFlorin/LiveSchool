const { entities } = require("../database");
const { sendEmail } = require("./send-mail");

const add = async (req, res) => {
  try {
    let interval = req.body.interval;
    if (
      !interval.clasa_primara ||
      !interval.clasa_terminala ||
      parseInt(interval.clasa_primara) > parseInt(interval.clasa_terminala)
    ) {
      res.status(400).send({ message: "bad request" });
      return;
    }
    let result = await entities.IntervalClase.create(interval);
    if (result) {
      res.status(200).send({ interval: result });
    } else res.status(400).send({ message: "error" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let interval = req.body.interval;
    if (parseInt(interval.clasa_primara) > parseInt(interval.clasa_terminala)) {
      res.status(400).send({ message: "bad request" });
      return;
    }
    let result = await entities.IntervalClase.update(interval, {
      where: { id_scoala: id },
    });
    if (result) {
      res.status(200).send({ interval: result });
    } else {
      res.status(400).send({ message: "error" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const get = async (req, res) => {
  try {
    let interval = await entities.IntervalClase.findOne({
      where: { id_scoala: req.params.id_scoala },
    });
    if (interval) {
      res.status(200).send({ interval: interval });
    } else res.status(200).send({ interval: "" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { add, update, get };
