require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');  


var app = express();
const appPath = path.join(__dirname,'../app');
app.use(express.static(appPath));
app.use(bodyParser.json());

app.get('/',(req,res) =>{
  res.sendFile(path.join(appPath,'index.html'));
});

app.get('/signup',(req,res) =>{
  res.sendFile(path.join(appPath,'signup.html'));
});

app.get('/profile',(req,res) =>{
  res.sendFile(path.join(appPath,'profile.html'));
});



app.post('/api/signUp', (req, res) => {
  var body = _.pick(req.body, ['name','email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.post('/api/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    });
  }).catch((e) => {
    res.status(401).send(e);
  });
});

app.get('/api/auth/token', authenticate, (req, res) => {
  res.send(req.user);
});

app.delete('/api/auth/remove_token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});



var port = process.env.PORT || 3000;
app.listen(port,() =>{
console.log(`Listening on port ${port}.`);
});


module.exports = {
  app
}
