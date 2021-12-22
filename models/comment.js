const mongoose = require('mongoose');

const { Schema } = mongoose;

require('./signInModel');
require('./product');

const commentSchema = new Schema({
    text: {
        type: Schema.Types.String,
        maxlenght: 500
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'client',
    }

}, { timestamps: true });

const model = mongoose.model('comment', commentSchema);
module.exports = model;