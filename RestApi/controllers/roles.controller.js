const Validator = require('fastest-validator');
const models = require('../models');

function add(req,res){

  
    const role = {
        name: req.body.name,
        level: req.body.level
    }

    const schema = {
        name: {type: 'string', optional: false, max: '100'},
        level: {type: 'number', optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(role, schema);

    if(validationResponse != true){
        return res.status(400).json({
            message: 'Validation failed',
            errors: validationResponse
        });
    }

    models.Role.create(role).then(result => {
        res.status(201).json({
            message: 'Role created successfully',
            role: result
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}
function getById(req,res) {
    const id = req.params.id;
    models.Role.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Role not found'
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
    models.Role.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

function update(req,res) {
    const id = req.params.id;
    const role = {
        name: req.body.name,
        level: req.body.level
    }
    models.Role.update(role, {where: {id:id}}).then(result => {
        res.status(200).json({
            message: 'Role updated successfully',
            role: role
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
    
}

function destroy(req,res){
    const id = req.params.id;
    models.Role.destroy({where: {id:id}}).then(result => {
        res.status(200).json({
            message: 'Role deleted successfully'
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}



module.exports = {
    add:add,
    getById: getById,
    findAll: findAll,
    update: update,
    destroy: destroy
}