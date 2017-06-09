var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(stormpath.init(app, {
    client: {
        apiKey : {
            id : '5SUAQA5PF3O7HGH4URNS2ITGD',
            secret : '/CwZRUQWO+qnG51CPYyokiUECIn4A0bwMRZ7tTiXuKU'
        }
    }
}));

app.use('/profile',stormpath.loginRequired,require('./profile')());

app.get('/', stormpath.getUser, function(req, res) {
    res.render('home', {
        title: 'Welcome'
    });
});

app.on('stormpath.ready',function(){
    console.log('Stormpath Ready');
});

app.listen(3000);