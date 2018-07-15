const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log('Connected to db');
},(err)=>{
  console.log('unable to connect to db.');
});

module.exports = {
  mongoose
};
