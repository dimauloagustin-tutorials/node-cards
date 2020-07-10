const Ticket = require("../models/ticket");

exports.getCardsAll = (req, res, next) => {
  switch (req.query.view) {
    case "1":
      Ticket.fetchAllAvailables((tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    case "2":
      Ticket.fetchAllFavorites((tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    case "3":
      Ticket.fetchAllUsed((tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    case "4":
      Ticket.fetchAllExpired((tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    default:
      Ticket.fetchAll((tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
  }
};
