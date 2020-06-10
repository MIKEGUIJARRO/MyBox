const express = require('express'),
    morgan = require('morgan'),
    exphbs = require('express-handlebars'),
    path = require('path'),
    flash = require('connect-flash'),
    session = require('express-session'),
    MySqlStore = require('express-mysql-session'),
    passport = require('passport');



//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(session({
    secret: 'mysqlnodesession',
    resave: false,
    saveUninitialized: false,
    //store: new MySqlStore()
}));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize()),
    app.use(passport.session());

//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message'),
        app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/trucks', require('./routes/trucks'));
app.use('/drivers', require('./routes/drivers'));
//app.use(require('./routes/schedule_trucks'));
//app.use(require('./routes/delivery'));
//app.use(require('./routes/packages'));
//app.use(require('./routes/states'));

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Server start up
app.listen(app.get('port'), () => {
    console.log('SERVER UP...');
});


