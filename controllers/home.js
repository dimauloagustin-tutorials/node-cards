const Ticket = require("../models/ticket");
//TODO - make it look better
exports.getCards = (req, res, next) => {
  switch (req.query.filter) {
    case "AVAILABLE":
      Ticket.fetchByState(Ticket.STATE_AVAILABLE, (tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    case "FAVORITE":
      Ticket.fetchByFav(true, (tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    case "USED":
      Ticket.fetchByState(Ticket.STATE_USED, (tickets) => {
        res.render("home/home", {
          tickets: tickets,
        });
      });
      break;
    case "EXPIRED":
      Ticket.fetchByState(Ticket.STATE_EXPIRED, (tickets) => {
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

exports.changeFavState = (req, res, next) => {
  const id = req.body.id;
  Ticket.fetchSpecific(id, (ticket) => {
    var editedTicket = new Ticket(
      ticket.id,
      ticket.title,
      ticket.description,
      ticket.type,
      ticket.endDate,
      ticket.createDate,
      ticket.state,
      !ticket.isFav
    );
    editedTicket.save();
    res.send({ favState: editedTicket.isFav });
  });
};

exports.useTicket = (req, res, next) => {
  const id = req.body.id;
  Ticket.fetchSpecific(id, (ticket) => {
    var editedTicket = new Ticket(
      ticket.id,
      ticket.title,
      ticket.description,
      ticket.type,
      ticket.endDate,
      ticket.createDate,
      Ticket.STATE_USED,
      ticket.isFav
    );
    editedTicket.save();
    res.send({ state: editedTicket.state });
  });
};
