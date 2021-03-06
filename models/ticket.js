const fs = require("fs");
const pather = require("../utils/pather");
const uuid = require("uuid");

const p = pather("data", "tickets.json");

const getTicketsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      var tickets = JSON.parse(fileContent);
      if (!tickets.length > 0) {
        cb([]);
      } else {
        //TODO - quit this code, just temporal workaround
        const currentDate = new Date().toISOString().substring(0, 10);
        var expiredFound = false;
        tickets.forEach((t) => {
          if (t.state == "AVAILABLE" && t.endDate < currentDate) {
            t.state = "EXPIRED";
            expiredFound = true;
          }
        });
        if (expiredFound)
          fs.writeFile(p, JSON.stringify(tickets), (err) => {
            if (err !== null) console.log(err);
          });
        //TODO - quit this code, just temporal workaround
        cb(tickets);
      }
    }
  });
};

module.exports = class Ticket {
  static STATE_AVAILABLE = "AVAILABLE";
  static STATE_USED = "USED";
  static STATE_EXPIRED = "EXPIRED";

  constructor(id, title, description, type, endDate, createDate, state, isFav) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.endDate = endDate;
    this.createDate = createDate;
    this.state = state;
    this.isFav = isFav;
  }

  static createTicket(title, description, type, endDate, createDate) {
    return new Ticket(
      uuid.v4(),
      title,
      description,
      type,
      endDate,
      createDate,
      this.STATE_AVAILABLE,
      false
    );
  }

  save() {
    getTicketsFromFile((tickets) => {
      var index = tickets.findIndex((t) => t.id == this.id);

      if (index === -1) {
        tickets.push(this);
      } else {
        tickets[index] = this;
      }

      fs.writeFile(p, JSON.stringify(tickets), (err) => {
        if (err !== null) console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getTicketsFromFile(cb);
  }

  static fetchSpecific(ticketId, cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.find((ticket) => ticket.id == ticketId));
    });
  }

  static fetchByState(state, cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.filter((ticket) => ticket.state == state));
    });
  }

  static fetchByFav(state, cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.filter((ticket) => ticket.isFav == state));
    });
  }
};
