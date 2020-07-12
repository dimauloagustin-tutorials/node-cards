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
  });
};

module.exports = class Product {
  constructor(title, description, type, endDate, createDate) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.type = type;
    this.endDate = endDate;
    this.createDate = createDate;
    this.state = "AVAILABLE"; //TODO - change to enum
    this.isFav = false;
  }

  save() {
    getTicketsFromFile((tickets) => {
      tickets.push(this);
      fs.writeFile(p, JSON.stringify(tickets), (err) => {
        if (err !== null) console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getTicketsFromFile(cb);
  }
  
  //TODO - refactor in one function
  static fetchAllAvailables(cb) {
    const currentDate = new Date().toISOString().substring(0, 10);
    getTicketsFromFile((tickets) => {
      cb(tickets.filter((ticket) => ticket.state == "AVAILABLE"));
    });
  }

  static fetchAllExpired(cb) {
    const currentDate = new Date().toISOString().substring(0, 10);
    getTicketsFromFile((tickets) => {
      cb(tickets.filter((ticket) => ticket.state == "EXPIRED"));
    });
  }

  static fetchAllUsed(cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.filter((ticket) => ticket.state == "USED"));
    });
  }

  static fetchAllFavorites(cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.filter((ticket) => ticket.isFav == true));
    });
  }
};
