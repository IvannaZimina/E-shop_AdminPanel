require('../bin/runners/db/db');

const categoryModel = require('../models/category');
const enterprizeModel = require('../models/enterprize');
const imageModel = require('../models/image');
const sizeModel = require('../models/size');
const productModel = require('../models/product');
const commentModel = require('../models/comment');

const createCategory = async (data) => {
    const doc = await categoryModel.create({ article: data.article, name: data.name });
    return doc;
};

const createEnterprize = async (data) => {
    const doc = await enterprizeModel.create({ article: data.article, name: data.name, country: data.country });
    return doc;
};

const createImage = async (data) => {
    const doc = await imageModel.create({ name: data.name, fileName: data.fileName, srcName: data.srcName });
    return doc;
};

const createSize = async (data) => {
    const doc = await sizeModel.create({ name: data.name });
    return doc;
};

const createProduct = async (data) => {
    const doc = await productModel.create({
        article: data.article,
        name: data.name,
        price: data.price,
        enterprize: data.enterprize,
        size: data.size,
        category: data.category,
        image: data.image,
        description: data.description
    });
    return doc;
};

const createCommentToGoods = async (data) => {
    const doc = await commentModel.create({ text: data.text, authorId: data.authorId });
    
    await productModel.findOneAndUpdate(
        { '_id': data.goodsId },
        { $push: { 'comment': doc._id } }
    );
    return doc;
};

const getCollections = async () => {


    const docsCategory = await categoryModel.find({});
    const docsEnterprize = await enterprizeModel.find({});
    const docsImage = await imageModel.find({});
    const docsSize = await sizeModel.find({});
    const docsProduct = await productModel.find({});

    const docsProd = await productModel
        .findOne({})
        .populate('enterprize')
        .populate('category', 'name')
        .populate('size', 'name')
        .populate('comment', 'text')
        .populate('image', 'srcName');

        console.log('docsProd: ', docsProd);

    return { docsCategory, docsEnterprize, docsImage, docsSize, docsProduct };
};

const updateOne = async (mass) => {

    productModel.findOneAndUpdate(
        { '_id': mass.nameProd },
        {$set:{ 'name': mass.nameProduct } },
        (err) => {
            if(err){
                throw err;
            }
    });
};

const findFilterFilds = async (id) => {
    const result = await productModel.findOne({ '_id': id });

    const enter = await enterprizeModel.findOne({ '_id': result.enterprize })
    const imageSrc = await imageModel.findOne({ '_id': result.image });
    const sizeProd = await sizeModel.find({ '_id': { $in: result.size } })

    const size = sizeProd.reduce( (acc, item) => {
        acc=`${acc} ${item.name}`;
        return acc;
    }, '');

    return {result, enter, imageSrc, size};
};


module.exports = {
    createCategory,
    createEnterprize,
    createImage,
    createSize,
    createProduct,
    createCommentToGoods,
    getCollections,
    updateOne,
    findFilterFilds
}
