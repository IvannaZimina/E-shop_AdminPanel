const mongoose = require('mongoose');

const { Schema } = mongoose;

const sizeGridSchema = new Schema({
    name: {
        type: Schema.Types.String,
    }
}, { timestamps: true });

const model = mongoose.model('size', sizeGridSchema);
module.exports = model;