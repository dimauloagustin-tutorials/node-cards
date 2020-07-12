const Ticket = require("../models/ticket");
//TODO - make it look better
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
      ticket.isFav
    );
    editedTicket.isFav = !editedTicket.isFav;
    editedTicket.save();
    res.send({ favState: editedTicket.isFav });
  });
};
