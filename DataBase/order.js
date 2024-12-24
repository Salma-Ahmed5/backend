const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const orderSchema = new Schema({
    schemapickup: { type: String, required: true },
    schemadropoff: { type: String, required: true },
    schematype: { type: String, required: true },
    schemaweight: { type: Number, required: true },
    schemaextradetails: { type: String,required: true  },
    schemacourier: { type: String},
    userEmail:{type:String,required: true },
    schemastatus: { type: String }  
});

module.exports = mongoose.model('orderrs', orderSchema);
