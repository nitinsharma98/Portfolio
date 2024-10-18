const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    owner:{
        type:String,
    },
    phone:{
        type:Number,
    },
    address:{
        type:String,
    },
    service:{
        type: String,
        enum:['Website','Web Pages Design','Get Your Portfolio','Something else ']
    },
    budget:{
        type: String,
        enum:['Below 2000','2000 - 4000','4000 - 6000','6000 - 8000','8000 - 10000','Above 10000']
    },
    about:{
        type:String,
    }
});

const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;