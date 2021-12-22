const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
    name: {
        type: Schema.Types.String,
    },
    srcName: {
        type: Schema.Types.String,
    }
}, { timestamps: true });

const model = mongoose.model('image', imageSchema);
module.exports = model;