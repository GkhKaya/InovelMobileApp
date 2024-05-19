const Validator = require('fastest-validator');
const models = require('../models');

function add(req, res) {
    const department = {
        name: req.body.name
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const v = new Validator();
    const validationResponse = v.validate(department, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Department.create(department).then(result => {
        res.status(201).json({
            message: "Department created successfully",
            department: result
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
    models.Department.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Department not found'
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
    models.Department.findAll().then(result => {
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
    const department = {
        name: req.body.name
    }

    const schema = {
        name: { type: "string", optional: false, max: "100" }
    }

    const v = new Validator();
    const validationResponse = v.validate(department, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Department.update(department, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: 'Department updated successfully',
            department: department
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
    models.Department.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Department deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Department not found'
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