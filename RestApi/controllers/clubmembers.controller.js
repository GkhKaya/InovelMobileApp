const Validator = require('fastest-validator');
const models = require('../models');

function add(req, res) {
    const clubMember = {
        memberId: req.body.memberId,
        roleId : req.body.roleId,
        departmentOfClubId: req.body.departmentOfClubId,
        imageUrl : req.body.imageUrl,
        isDeveloper : req.body.isDeveloper,
        joindDate : req.body.joindDate,

    }

    const schema = {
       memberId: { type: "number", optional: false },
        roleId: { type: "number", optional: false },
        departmentOfClubId: { type: "number", optional: false },
        imageUrl: { type: "string", optional: false },
        isDeveloper: { type: "boolean", optional: false },
        joindDate: { type: "string",format:"date", optional: false }

    }

    const v = new Validator();
    const validationResponse = v.validate(clubMember, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.ClubMember.create(clubMember).then(result => {
        res.status(201).json({
            message: "Club Member created successfully",
            clubMember: result
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
    models.ClubMember.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Club Member not found'
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
    models.ClubMember.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function update(req, res) {
    const clubMember = {
        memberId: req.body.memberId,
        roleId : req.body.roleId,
        departmentOfClubId: req.body.departmentOfClubId,
        imageUrl : req.body.imageUrl,
        isDeveloper : req.body.isDeveloper,
        joindDate : req.body.joindDate,

    }

    const schema = {
       memberId: { type: "number", optional: false },
        roleId: { type: "number", optional: false },
        departmentOfClubId: { type: "number", optional: false },
        imageUrl: { type: "string", optional: false },
        isDeveloper: { type: "boolean", optional: false },
        joindDate: { type: "string",format:"date", optional: false }

    }

    const v = new Validator();
    const validationResponse = v.validate(clubMember, schema);

    if (validationResponse != true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.ClubMember.update(clubMember, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: 'Club Member updated successfully',
            clubMember: clubMember
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
    models.ClubMember.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Club Member deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Club Member not found'
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