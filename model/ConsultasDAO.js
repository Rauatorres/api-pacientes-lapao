const DAO = require('./DAO');

const UsuarioDAO = class UsuarioDAO extends DAO{
    constructor(){
        super('agenda_consulta');
    }
};

module.exports = UsuarioDAO;