const express = require('express');
const path = require('path');

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const homeRouter = require('./routes/home.route');
const roomRouter = require('./routes/room.route');
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route');
const orderRouter = require('./routes/orders.route');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash());

const STORE = new SessionStore({
    uri:
        'mongodb://localhost/playground',
    collection: "sessions",
    useNewUrlParser: true,
});

app.use(
    session({
        secret: 'this is my secret secret to hash express sessions ......',
        saveUninitialized: false,
        //cookie: {
           // maxAge:1*60*60*100   //== expires: new Date(1*60*60*100)
       // }
        store: STORE
    })
);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine", "ejs');
app.set('views", "views');

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/room', roomRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/', orderRouter);

app.get('/error', (req, res, next) => {
    res.status(500);
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Error'
    });
});

app.get("/not-admin", (req, res, next) => {
    res.status(403);
    res.render("not-admin", {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: "Not Allowed"
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server listen on port " + port);
});
