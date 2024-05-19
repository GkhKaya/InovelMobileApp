const Validator = require('fastest-validator');
const models = require('../models');

function add(req, res) {
    const contentCategory = {
        name: req.body.name
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const v = new Validator();
    const validationResponse = v.validate(contentCategory, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.ContentCategory.create(contentCategory).then(result => {
        res.status(201).json({
            message: "Content Category created successfully",
            contentCategory: result
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
    models.ContentCategory.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Content Category not found'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function findAll(req,res){
    models.ContentCategory.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

module.exports = {
    add: add,
    findById: findById,
    findAll: findAll
}