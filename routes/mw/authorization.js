const mwAuth = (req, res, next) => {
    const { ID, goodsID } = req.session;

    if(!uid) {
        res.json({ status: 'non authorized' });
        return;
    }

    next();
}

module.exports = mwAuth;