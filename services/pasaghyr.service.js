const pasaghyrModel = require("../models/pasaghyr.model");

async function create(pasaghyr) {
    return pasaghyrModel.create(pasaghyr);
}

async function find() {
    filter = {};
    return {
        items: await pasaghyrModel.find(filter),
        count: await pasaghyrModel.countDocuments(filter),
    };
}

async function findById(id) {
    return pasaghyrModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
    return pasaghyrModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
}

async function findByIdAndDelete(id) {
    return pasaghyrModel.findByIdAndDelete(id);
}

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
};
