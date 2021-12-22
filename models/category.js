const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
    article: {
        type: Schema.Types.Number,
    },
    name: {
        type: Schema.Types.String,
        unique: true
    }
}, { timestamps: true });

const model = mongoose.model('category', categorySchema);
module.exports = model;