//Init
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

//  Init middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Connexion à MongoDB
mongoose.connect("mongodb://localhost/kappa");


// On crée le REST
var Resource = app.resource = restful.model('voiture', mongoose.Schema({
        modele: String,
        constructeur: String,
    }))
    .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/voitures');


//On exécute le serveur
app.listen(3000);