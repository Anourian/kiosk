var mongoose = require('mongoose');
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/kiosk';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Mongodb connection open');
});

var authSchema = mongoose.Schema({
  access_token:String,
  expires_at:String,
  refresh_token:String
});


exports.auth = mongoose.model('auth', authSchema);