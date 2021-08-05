const Reminders = require("../models/reminders");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  try {
    let { user, description, date } = req.body;

    let id;
    let prod = await Reminders.findAll();

    if (!prod.length) id = 1;
    else {
      id =
        Math.max.apply(
          Math,
          prod.map(function (o) {
            return o.id;
          })
        ) + 1;
    }

    let dataToSend = {
      id,
      user,
      description,
      date,
    };

    let reminder = await Reminders.create(dataToSend);
    if (!reminder) {
      throw new Error("Something went wrong, please try again later");
    }

    res.status(201).json(reminder);
  } catch (err) {
    res.status(405).json({ message: err.message });
  }
};

exports.listProduct = async (req, res) => {
  try {
    let result;
    if (req.query.user) {
      result = await Reminders.findAll({ where: { user: req.query.user } });
    }

    if (req.query.after) {
      result = result ? result : await Reminders.findAll();
      result = result.filter(
        (o) => new Date(o.dataValues.date) > new Date(+req.query.after)
      );
      console.log(result);
    } else if (!result) {
      result = await Reminders.findAll();
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(405).json();
  }
};

exports.getReminders = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let reminder = await Reminders.findOne({ where: { id } });
    if (!reminder) throw new Error("ID not found");
    res.status(200).json(reminder);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.putProduct = async (req, res) => {
  res.status(405).send();
};
