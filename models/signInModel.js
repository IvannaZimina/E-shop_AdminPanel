const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const signInSchema = new Schema({
    nameUser: {
      type: Schema.Types.String,
      default: '',
      maxLength: 255,
      unique: true
    },
    emailUser: {
        type: Schema.Types.String,
        require: true
    },
    hashPwd: {
        type: Schema.Types.String,
        require: true
    }
}, { timestamps: true });

const hashingPwd = (pwdUser) => {
    const data = new TextEncoder().encode(pwdUser);
    const result = crypto.createHash('sha256').update(data).digest('hex');
    return result;
};

signInSchema.virtual('pwdUser')
  .set( function(val) {
    const hash = hashingPwd(val);
    this.hashPwd = hash;
  });

signInSchema.methods.checkPwd = function(pwdUser) {
    const hash = hashingPwd(pwdUser);
    const check = hash === this.hashPwd;
    return check;
};

const model = mongoose.model('client', signInSchema);
module.exports = model;