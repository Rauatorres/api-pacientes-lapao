const DAO = require('./DAO');

const UsuarioDAO = class UsuarioDAO extends DAO{
    constructor(){
        super('paciente');
    }
};

module.exports = UsuarioDAO;