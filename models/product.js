const mongoose = require('mongoose');

const { Schema } = mongoose;

require('./enterprize');
require('./category');
require('./image');
require('./size');
require('./comment');

const productSchema = new Schema({
    article: {
        type: Schema.Types.Number,
    },
    name: {
        type: Schema.Types.String,
    },
    price: {
        type: Schema.Types.Number,
    },
    enterprize: [{
        type: Schema.Types.ObjectId,
        ref: 'enterprize'
    }],
    size: [{
        type: Schema.Types.ObjectId,
        ref: 'size'
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    image: [{
        type: Schema.Types.ObjectId,
        ref: 'image',
    }],
    description: {
        type: Schema.Types.String,
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
    }],

}, { timestamps: true });

const model = mongoose.model('product', productSchema);
module.exports = model;