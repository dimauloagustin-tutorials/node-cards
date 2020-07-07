const express = require('express');
const bodyParser = require('body-parser');

const pather = require('./utils/pather');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(pather('public')));
app.use(bodyParser.urlencoded({extended: false}));

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');
app.use(homeRoutes);
app.use('/admin',adminRoutes);

app.use(errorController.get404);

app.listen(2999);