const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config();

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@node.6rvezyr.mongodb.net/Node?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
// Register view engine
app.set('view engine', 'ejs')

//If you want your views folder to have a differnet name
// app.set('views', 'myviews')

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    // res.send('<p>Home page</p>')
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p>Home page</p>')
    res.render('about', { title: 'About' })
})

// Blog routes
app.use('/blogs', blogRoutes)


app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})