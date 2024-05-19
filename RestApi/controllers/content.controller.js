
const Validator = require('fastest-validator');
const models = require('../models');
const content = require('../models/content');

function add(req, res) {
    const content = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        readingUrl: req.body.readingUrl,
        contentCategoryId: req.body.contentCategoryId
    }

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        imageUrl: { type: "string", optional: false },
        readingUrl: { type: "string", optional: false },
        contentCategoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(content, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Content.create(content).then(result => {
        res.status(201).json({
            message: "Content created successfully",
            content: result
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function findById(req, res) {
    const id = req.params.id;
    models.Content.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Content not found'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function findByCategoryId(req, res) {
    const categoryId = req.params.contentCategoryId;
    models.Content.findAll({
        where: {
            contentCategoryId: categoryId
        }
    }).then(results => {
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({
                message: 'No content found for this category'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function findAll(req, res) {
    models.Content.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}



module.exports = {
    add,
    findById,
    findByCategoryId,
    findAll
}