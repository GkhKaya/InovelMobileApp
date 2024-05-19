const Validator = require('fastest-validator');
const models = require('../models');


function add(req, res) {
    const member = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        male : req.body.male,
        departmentOfSchool : req.body.departmentOfSchool,
        email : req.body.email,
        password : req.body.password
    }

    const schema = {
        firstName : { type: "string", optional: false, max: "100" },
        lastName : { type: "string", optional: false, max: "100" },
        departmentOfSchool : { type: "string", optional: false, max: "100" },
        email : { type: "email", optional: false },
        password : { type: "string", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(member, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Member.create(member).then(result => {
        res.status(201).json({
            message: "Member created successfully",
            member: result
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
    models.Member.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Member not found'
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
    models.Member.findAll().then(result => {
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
    const member = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        male : req.body.male,
        departmentOfSchool : req.body.departmentOfSchool,
        email : req.body.email,
        password : req.body.password
    }

    const schema = {
        firstName : { type: "string", optional: false, max: "100" },
        lastName : { type: "string", optional: false, max: "100" },
        departmentOfSchool : { type: "string", optional: false, max: "100" },
        email : { type: "email", optional: false },
        password : { type: "string", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(member, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Member.update(member, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: 'Member updated successfully',
            member: member
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function destroy (req, res) {
    const id = req.params.id;
    models.Member.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Member deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Member not found'
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