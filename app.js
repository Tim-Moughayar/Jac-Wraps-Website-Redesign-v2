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

app.get('/vehicle-wraps', (req, res) => {
    res.render('about/index', {title: 'About'});
})

app.get('/vehicle-wraps', (req, res) => { //ROUTING?? services/vehicle-wraps
    res.render('about/index', {title: 'About'});
})



// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

app.listen(3000, () => {
    console.log('Port open')
})