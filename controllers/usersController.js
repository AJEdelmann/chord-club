const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync('data/db.json');
const db = low(adapter);

const User = require("../models/User");
const createError = require("http-errors");

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        next(e);
    }

    // const users = db.get('users').value();
    // res.status(200).send(users);
};

exports.addUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        next(e);
    }

    // const user = req.body;
    // db.get('users').push(user).last().assign({
    //     id: Date.now().toString()
    // }).write();

    // res.status(200).send(user);
};

exports.getUser = (req, res, next) => {
    const {
        id
    } = req.params;
    const users = db.get('users').find({
        id
    }).value();
    res.status(200).send(users);
};

exports.deleteUser = (req, res, next) => {
    const {
        id
    } = req.params;
    const users = db.get('users').remove({
        id
    }).write();
    res.status(200).send(users);
};

exports.updateUser = (req, res, next) => {
    const {
        id
    } = req.params;
    const data = req.body;
    const users = db.get('users').find({
        id
    }).assign(data).value();
    res.status(200).send(users);
};