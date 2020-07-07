const Ticket = require('../models/ticket');

exports.getCreateTicket = (req, res, next) => {
    res.render('admin/createTicket');
};

exports.postCreateTicket = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const endDate = req.body.endDate;
    const createDate = new Date().toISOString().substring(0,10);
    const ticket = new Ticket(title, description, type, endDate, createDate);
    ticket.save();
    res.redirect('/');
};