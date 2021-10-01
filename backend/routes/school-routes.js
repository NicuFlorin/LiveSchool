const { entities } = require("../database");

const addSchool = async (req, res) => {
  try {
    const school = req.body;
    if (!school.nume) {
      res.status(400).send({ message: "invalid school", success: false });
      return;
    }
    let result = await entities.Scoala.create(school);
    if (result) {
      res.status(200).send({
        id_scoala: result.id,
        message: "school created",
        success: true,
      });
    } else {
      res.status(400).send({ message: "error occured", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
};

module.exports = { addSchool };
