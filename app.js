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

app.get('/contact', (req, res) => {
    res.render('contact/index', {title: 'Contact'});
})

// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

app.listen(3000, () => {
    console.log('Port open')
})