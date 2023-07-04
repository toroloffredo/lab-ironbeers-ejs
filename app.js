const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers('/beers')
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
      //console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom('/random-beer')
    .then(beer => {
      res.render('random-beer', { beer });
      console.log('Random beer from database', beer);
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (request, response)=>{
  punkAPI.getBeer(request.params.id)
  .then(beer => {response.render('random-beer', {beer});
})
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
