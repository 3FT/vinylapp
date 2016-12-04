var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var fs = require('fs');

require('./models/db');
require('./config/passport');

var routesAuth = require('./routes/auth');
var routesVinyls = require('./routes/vinyls');
var routesUsers = require('./routes/users');
var routesArtists = require('./routes/artists');

var projectDir = __dirname + '/../../';
var port = process.env.PORT || 7203;
var environment = process.env.NODE_ENV;


// Body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Initialize passport
app.use(passport.initialize());

// Routes
app.use('/vinyls', routesVinyls);
app.use('/auth', routesAuth);
app.use('/users', routesUsers);
app.use('/artists', routesArtists);

// Error handler
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.json({message: err.message});
});


console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

// create upload dir if it doesn't exist
var dir = './public/uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// common directory for uploads and images
app.use(express.static('./public/'));


switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static(projectDir + './build/'));
        app.use('/*', express.static(projectDir + './build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static(projectDir + './src/client/'));
        app.use(express.static(projectDir + './'));
        app.use(express.static(projectDir + './tmp'));
        app.use('/*', express.static(projectDir + './src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});



