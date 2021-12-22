const express = require('express');
const router = express.Router();
const axios = require('axios');

const upload = require('multer')();
const Ajv = require('ajv');
const ajv = new Ajv();

const adminCtrl = require('../controller/adminCtrl');
const authCtrl = require('../controller/authorization');
const signUpSchema = require('./Schemas/signUpSchema.json');
const commentSchema = require('./Schemas/commentSchema.json')
const mwAuth = require('./mw/authorization');

router.get('/', (req, res) => {
  res.render('index', { title: 'E-SHOP'});
});

router.post('/userCheck', async (req, res) => {
  const { ID } = req.session;

  if(!ID) {
    res.json({ status: 'client not declare'})
    return;
  };

  const userName = await authCtrl.getUserByID(ID);

  res.json({ status: 'ok', userName: userName })
})

router.post('/goods/infoSession', async (req, res) => {
  const { ID, goodsID } = req.session;

  const data = await adminCtrl.findFilterFilds(goodsID);

  if(!ID) {
    res.json({ status: 'client not declare', goodField: data })
    return;
  }

  const userName = await authCtrl.getUserByID(ID);

  res.json({ status: 'ok', goodField: data, userName: userName })
})

router.get('/goods/:id', async (req, res) => {
  const goodsID = req.params.id;
  const session = req.session;
  session.goodsID = goodsID;

  res.render('goods', {title: 'GOODS'});
  
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

  const enterUser = await authCtrl.entering( data.nameUser, data.pwdUser);

  const session = req.session;

  if([ 'client not declare', 'invalid password' ].includes(enterUser.status)) {
    res.json({ user: enterUser });
    return;
  }
  
  session.ID = enterUser.payload.profile.id;

  res.json({ user: enterUser });

});

router.post('/comment', upload.none(), async (req, res) => {
  const { comment } = req.body;
  const { ID, goodsID } = req.session;

  if(!ID) {
    res.json({ status: 'client nor declare' });
    return;
  }

  const data = { text: comment, authorId: ID, goodsId: goodsID };

  const validate = ajv.compile(commentSchema);
  const valid = validate(data);

  if (!valid) {
      const result = {
        status: 'invalid data',
        payload: { errors: validate.errors }
      };

      res.json( result );
      return;
  };

  const userComment = await adminCtrl.createCommentToGoods(data);
  console.log('userComment: ', userComment);

  res.json({ status: 'ok', userComment });
})

module.exports = router;
