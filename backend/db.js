// // db.js
// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://localhost:27017/myDatabase'; // Replace myDatabase with your DB name

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected ✅'))
// .catch((err) => console.log('MongoDB connection error ❌', err));

// module.exports = mongoose;


const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/insta_clone'; // Replace with your DB name

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected ✅'))
    .catch((err) => console.log('MongoDB connection error ❌', err));

module.exports = mongoose;
