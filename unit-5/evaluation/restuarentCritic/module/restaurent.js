const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/restaurentCritic');

const RestaurentSchema = new mongoose.Schema({
    name: { type: String, unique: true , required: true },
    Cuisine : {type : String, required : true , enum : ['Italian' , 'Mexican' , 'Indian' , 'Chinese' , 'Others']},
    averageRating: { type: Number, default: 0 },
    address: { type: String, required : true },
});

module.export = mongoose.model('Restaurent', RestaurentSchema);