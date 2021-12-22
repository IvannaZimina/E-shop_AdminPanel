const express = require('express');
const router = express.Router();
const axios = require('axios');

const upload = require('multer')();
const Ajv = require('ajv');
const ajv = new Ajv();

const categorySchema = require('./Schemas/categorySchema.json');
const enterprizeSchema = require('./Schemas/enterprizeSchema.json');
const imageSchema = require('./Schemas/imageSchema.json');
const sizeGridSchema = require('./Schemas/sizeGridSchema.json');
const productSchema = require('./Schemas/productSchema.json');
const updateNameProdSchema = require('./Schemas/updateSchema.json');

const adminCtrl = require('../controller/adminCtrl');
const { uploadsSingle } = require('../controller/uploadFileCtrl');

router.get('/', (req, res) => {
  res.render('admin', { title: 'ADMIN PANEL'});
});

router.get('/category', (req, res) => {
  res.render('category', { title: 'ADMIN PANEL'});
});

router.get('/enterprize', (req, res) => {
  res.render('enterprize', { title: 'ADMIN PANEL'});
});

router.get('/image', (req, res) => {
  res.render('image', { title: 'ADMIN PANEL'});
});

router.get('/size', (req, res) => {
  res.render('size', { title: 'ADMIN PANEL'});
});

router.get('/product', (req, res) => {
  res.render('product', { title: 'ADMIN PANEL'});
});

router.get('/updateNameProd', (req, res) => {
  res.render('updateNameProd', { title: 'ADMIN PANEL'});
});

router.get('/server', async (req, res) => {
  const datas = await adminCtrl.getCollections();
  
  res.json({
    category: datas.docsCategory,
    enterprize: datas.docsEnterprize,
    images: datas.docsImage,
    size: datas.docsSize,
    product: datas.docsProduct
  });
});

router.post('/category', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(categorySchema);
  const valid = validate(data);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors }
    };

    res.json( result );
    return;
  };

  await adminCtrl.createCategory(data);
  res.json({ status: 'ok' });
});

router.post('/enterprize', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(enterprizeSchema);
  const valid = validate(data);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors }
    };

    res.json( result );
    return;
  };

  await adminCtrl.createEnterprize(data);
  res.json({ status: 'ok' });
});

router.post('/image', uploadsSingle, async (req,res) => {
  const { filename } = req.file;
  const { name } = req.body;
  const srcName = `/images/${filename}`;

  const data = { name, srcName };
  console.log(data)

  const validate = ajv.compile(imageSchema);
  const valid = validate(data);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors }
    };

    res.json( result );
    return;
  };

  await adminCtrl.createImage(data);
  res.json({status:'ok'});
});

router.post('/size', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(sizeGridSchema);
  const valid = validate(data);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors }
    };

    res.json( result );
    return;
  };

  await adminCtrl.createSize(data);
  res.json({ status: 'ok' });
});

router.post('/product', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(productSchema);
  const valid = validate(data);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors }
    };

    res.json( result );
    return;
  };

  await adminCtrl.createProduct(data);
  res.json({ status: 'ok' });
});

router.post('/update', upload.none(), async (req, res) => {
  const data = req.body;

  const validate = ajv.compile(updateNameProdSchema);
  const valid = validate(data);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors }
    };

    res.json( result );
    return;
  };

  await adminCtrl.updateOne(data);
  res.json({ status: 'ok' });
});


module.exports = router;