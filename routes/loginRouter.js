const express = require('express');
const router = express.Router();
const axios = require('axios');

const upload = require('multer')();
const Ajv = require('ajv');
const ajv = new Ajv();

const signInSchema = require('./Schemas/signInSchema.json');
const signUpSchema = require('./Schemas/signUpSchema.json');

const authCtrl = require('../controller/authorization');
const mwAuth = require('./mw/authorization');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/signUp', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(signInSchema);
  const valid = validate(data);

  if (!valid) {
      const result = {
        status: 'invalid data',
        payload: { errors: validate.errors }
      };

      res.json( result );
      return;
  };

  const newUser = await authCtrl.login( data.nameUser, data.emailUser, data.pwdUser);

  res.json({ status: 'ok', user: newUser });
});

router.post('/signIn', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(signUpSchema);
  const valid = validate(data);

  if (!valid) {
      const result = {
        status: 'invalid data',
        payload: { errors: validate.errors }
      };

      res.json( result );
      return;
  };

  const enterUser = await authCtrl.entering( data.nameUser, data.emailUser, data.pwdUser);

  res.json({ status: 'ok', user: enterUser });
});


module.exports = router;