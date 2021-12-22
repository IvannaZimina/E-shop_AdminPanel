const mongoose = require('mongoose');

const { Schema } = mongoose;

const enterprizeSchema = new Schema({
    article: {
        type: Schema.Types.Number,
    },
    name: {
        type: Schema.Types.String,
    },
    country: {
        type: Schema.Types.String,
    }

}, { timestamps: true });

const model = mongoose.model('enterprize', enterprizeSchema);
module.exports = model;