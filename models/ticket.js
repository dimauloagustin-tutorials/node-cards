const fs = require("fs");
const pather = require("../utils/pather");
const uuid = require("uuid");

const p = pather("data", "tickets.json");

const getTicketsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
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
    this.state = 'AVAILABE';  //TODO - change to enum
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

  static fetchAllAvailables(cb) {
    const currentDate = new Date().toISOString().substring(0,10);
    getTicketsFromFile((tickets) => {
      cb(tickets.filter(ticket => ticket.state == 'AVAILABE' && ticket.endDate >= currentDate));
    });
  }

  static fetchAllExpired(cb) {
    const currentDate = new Date().toISOString().substring(0,10);
    getTicketsFromFile((tickets) => {
      cb(tickets.filter(ticket => ticket.state == 'AVAILABE' && ticket.endDate < currentDate));
    });
  }

  static fetchAllUsed(cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.filter(ticket => ticket.state == 'USED'));
    });
  }

  static fetchAllFavorites(cb) {
    getTicketsFromFile((tickets) => {
      cb(tickets.filter(ticket => ticket.isFav == true));
    });
  }
};
