const Validator = require('fastest-validator');
const models = require('../models');

function add(req, res) {
    const announcement = {
        title: req.body.title,
        content: req.body.content
    }

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(announcement, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Announcement.create(announcement).then(result => {
        res.status(201).json({
            message: "Announcement created successfully",
            announcement: result
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
    models.Announcement.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Announcement not found'
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
    models.Announcement.findAll().then(result => {
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
    const announcement = {
        title: req.body.title,
        content: req.body.content
    }

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(announcement, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Announcement.update(announcement, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: 'Announcement updated successfully',
            announcement: announcement
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function destroy(req, res) {
    const id = req.params.id;
    models.Announcement.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Announcement deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Announcement not found'
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