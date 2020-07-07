const Ticket = require("../models/ticket");

exports.getCards = (req, res, next) => {
  Ticket.fetchAll((tickets) => {
    res.render("home/cards", {
        tickets: tickets
    });
  });
};
