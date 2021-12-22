require('../bin/runners/db/db');

const signInModel = require('../models/signInModel');

const createUser = async (nameUser, emailUser, pwdUser) => {
    const doc = await signInModel.create({ nameUser, emailUser, pwdUser });
    return doc;
};

const login = async (nameUser, emailUser, pwdUser) => {
    const doc = await signInModel.findOne({ nameUser: nameUser });

    if(!doc) {
        const newUser = await createUser(nameUser, emailUser, pwdUser)
        return {status: 'client added', newUser: newUser};
    };

    const check = doc.checkPwd(pwdUser);
    if(!check) {
        return { status: 'invalid password' };
    };

    const profile = {
        status: 'ok',
        id: doc.id,
        nameUser: doc.nameUser,
        emailUser: doc.emailUser
    };

    return { status: 'ok', payload: { profile }};
};

const entering = async (nameUser, pwdUser) => {

    const doc = await signInModel.findOne({ 'nameUser': nameUser });

    if(!doc) {
        return { status: 'client not declare'};
    };

    const check = doc.checkPwd(pwdUser);
    
    if(!check) {
        return { status: 'invalid password' };
    };

    const profile = {
        status: 'ok',
        id: doc.id,
        nameUser: doc.nameUser,
        emailUser: doc.emailUser
    };
    
    return { status: 'ok', payload: { profile }};
};

const getUserByID = async (id) => {
    const doc = await signInModel.findOne({ _id: id });

    if(!doc) {
        return { status: 'client not declare'};
    };

    const profile = {
        status: 'ok',
        id: doc.id,
        nameUser: doc.nameUser,
    };
    
    return { status: 'ok', payload: { profile }};
};

module.exports = {
    createUser,
    login,
    entering,
    getUserByID
};
