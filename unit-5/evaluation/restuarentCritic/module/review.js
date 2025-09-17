const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/restaurentCritic');



const reviewSchema = new mongoose.Schema({
    text: { type : String, required : true },
    rating: {Number , required : true , min : 1 , max : 5 },
    restaurent:{ type : mongoose.Schema.Types.ObjectId , ref : 'Restaurent' , required : true},
});

module.export = mongoose.model('Review', reviewSchema);