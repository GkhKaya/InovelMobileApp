const Validator = require('fastest-validator');
const models = require('../models');
function add(req, res) {
    const eventCategory = {
        name: req.body.name
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const v = new Validator();
    const validationResponse = v.validate(eventCategory, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.EventCategory.create(eventCategory).then(result => {
        res.status(201).json({
            message: "Event Category created successfully",
            eventCategory: result
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
    models.EventCategory.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Event Category not found'
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
    models.EventCategory.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function update(req, res) {
    const id = req.params.id;
    const eventCategory = {
        name: req.body.name
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const v = new Validator();
    const validationResponse = v.validate(eventCategory, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.EventCategory.update(eventCategory, { where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Event Category updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Event Category not found'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function destroy(req, res) {
    const id = req.params.id;
    models.EventCategory.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Event Category deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Event Category not found'
            });
        }
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
    findAll: findAll,
    update: update,
    destroy: destroy
};