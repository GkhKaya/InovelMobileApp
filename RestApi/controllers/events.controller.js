const Validator = require('fastest-validator');
const models = require('../models');

function add(req, res) {
    const event = {
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        location: req.body.location,
        eventCategoryId: req.body.eventCategoryId
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" },
        date: { type: "string", optional: false },
        description: { type: "string", optional: false },
        location: { type: "string", optional: false },
        eventCategoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(event, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Event.create(event).then(result => {
        res.status(201).json({
            message: "Event created successfully",
            event: result
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
    models.Event.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Event not found'
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
    models.Event.findAll().then(result => {
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
    const updatedEvent = {
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        location: req.body.location,
        eventCategoryId: req.body.eventCategoryId
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" },
        date: { type: "string", optional: false },
        description: { type: "string", optional: false },
        location: { type: "string", optional: false },
        eventCategoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedEvent, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Event.update(updatedEvent, { where: { id: id } }).then(result => {
        if (result[0]) {
            res.status(200).json({
                message: 'Event updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Event not found'
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
    models.Event.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Event deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Event not found'
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
}