const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
hbs.partialsHe
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log(err);
    }
  });
  next();
});

app.use((req, res, next) => {
    res.render('maintainance.hbs')
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

app.get('/', (req, res) => {
  // res.send('<h1>hello express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the website',
    currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
  });
})

app.get('/bad', (req, res) => {
  res.send({
    status: '404',
    msg: 'oops sorry unable to fulfill the request'
  })
})

app.listen(3000, () => {
  console.log('Server 3000 is running');
});
