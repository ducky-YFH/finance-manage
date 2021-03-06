const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// 引入user.js
const users = require('./routes/api/users');
// 引入profiles.js
const profiles = require('./routes/api/profiles');

// DB config
const db = require("./config/keys").mongoUrl;

// 使用body-parser中间将
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(db)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(() => {
    console.log('err');
  })

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// 使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);


const port = process.env.port || 5000

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})