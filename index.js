require('dotenv').config()
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const dbConfig = require('./src/config/db.config');
const userRoutes = require('./src/routes/userRoutes');


// Initialize Express app
const app = express();

//***************** Session config   ******************//
app.use(session({
    secret:  process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))

//  *********************   Global Middleware ***********************//
app.use((req, res, next) => {

    res.locals.session = req.session
    // console.log(req.session)
    next();
})


//***************** Express Flash  ******************//
app.use(flash())


// ********  serve the static file from the 'public' directory *********//
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// *********   Set Template Engine  *********//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))

// *********  Database Connection ************//
dbConfig.connectMongoDB();


// ********  Route Setup ***********//
app.get('/', (req, res) => {
    res.redirect('/send-otp');
});

app.use('/', userRoutes);


//*****   404 Error Handling   *******/ 
app.use((req, res, next) => {
    res.status(404).render('error/error', { title: 'Page Not Found' });
});


// ***********   Port Start   *************//
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => {
    console.error('Failed to start the server:', err.message);
});