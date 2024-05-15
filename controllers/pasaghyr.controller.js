const pasaghyrService = require('../services/pasaghyr.service');
const fs = require('fs').promises;
const path = require('path');

async function createPasaghyr(req, res) {
    try {
        const newPasaghyr = await pasaghyrService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newPasaghyr,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getPasaghyrs(req, res) {
    try {
        res.status(200)
            .json({
                status: 200,
                data: await pasaghyrService.find({}),
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getPasaghyr(req, res) {
    try {
        const { id } = req.params;
        const pasaghyr = await pasaghyrService.findById(id);

        if (!pasaghyr) {
            return res.status(400).json({
                status: 400,
                message: 'Pasaghyr not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: pasaghyr,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function updatePasaghyr(req, res) {
    try {
        const { id } = req.params;
        const pasaghyrData = req.body;
        await pasaghyrService.findByIdAndUpdate(id, pasaghyrData);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function deletePasaghyr(req, res) {
    try {
        const { id } = req.params;
        await pasaghyrService.findByIdAndDelete(id);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function createPasaghyrFromJSONFile(req, res) {
    try {
        const fileItem = req.file;
        if (!fileItem) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = path.join(__dirname, '..', fileItem.path);
        const data = await fs.readFile(filePath, 'utf8');
        const pasaghyrItems = JSON.parse(data);
        console.log(pasaghyrItems);
        pasaghyrItems.forEach((item)=>{
            pasaghyrService.create(item);
        })

        res.status(201).json({
            status: 201,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
}

module.exports = {
    createPasaghyr,
    getPasaghyrs,
    getPasaghyr,
    updatePasaghyr,
    deletePasaghyr,
    createPasaghyrFromJSONFile,
};