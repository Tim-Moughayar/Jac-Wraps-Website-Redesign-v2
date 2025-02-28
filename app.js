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
    res.render('home', {title: 'Home', description: "Enhance your brand visibility with fleet and storefront graphics in Chicago."})
})

app.get('/services', (req, res) => {
    res.render('services/index', {title: 'Services', description: "We offer vinyl solutions for vehicles, walls, and windows. Inside and out. "});
})

app.get('/contact', (req, res) => {
    res.render('contact/index', {title: 'Contact', description: "Contact us today for a free estimate!"});
})

app.get('/about', (req, res) => {
    res.render('about/index', {title: 'About', description: "Jac Wraps is a family owned business, proudly serving nationwide clients and our local communities."});
})

app.get('/services/vehicle-wraps', (req, res) => {
    res.render('services/vehicle-wraps/index', {title: 'Vehicle Wraps', description: "We provide fleet graphics, color changes, chrome deletion, and paint protection film."});
})

app.get('/services/architectural-graphics', (req, res) => {
    res.render('services/architectural-graphics/index', {title: 'Architectural Graphics', description: "We provide fleet graphics, color changes, chrome deletion, and paint protection film."});
})



// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

app.listen(3000, () => {
    console.log('Port open')
})