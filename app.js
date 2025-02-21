if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home', {title: 'Home'})
})

app.get('/services', (req, res) => {
    res.render('services/index', {title: 'Services'});
})

app.get('/contact', (req, res) => {
    res.render('contact/index', {title: 'Contact'});
})

app.get('/about', (req, res) => {
    res.render('about/index', {title: 'About'});
})

app.get('/services/vehicle-wraps', (req, res) => {
    res.render('services/vehicle-wraps/index', {title: 'Vehicle Wraps'});
})

app.get('/services/architectural-graphics', (req, res) => {
    res.render('services/architectural-graphics/index', {title: 'Architectural Graphics'});
})



// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

app.listen(3000, () => {
    console.log('Port open')
})