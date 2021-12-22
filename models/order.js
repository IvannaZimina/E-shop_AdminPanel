const mongoose = require('mongoose');

const { Schema } = mongoose;

require('./product');
require('./user');


const orderSchema = new Schema({
    orderNumber: {
        type: Schema.Types.Number,
    },
    uid: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    productID: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    countProducts: {
        type: Schema.Types.Number,
    },
    orderDate: {
        type: Schema.Types.Date,
    },
    totalPrice: {
        type: Schema.Types.Number,
    },
    discountOrder: {
        type: Schema.Types.Number,
    }
}, { timestamps: true });

const model = mongoose.model('order', orderSchema);
module.exports = model;