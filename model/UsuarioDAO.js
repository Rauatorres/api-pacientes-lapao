const DAO = require('./DAO');

const UsuarioDAO = class UsuarioDAO extends DAO{
    constructor(){
        super('usuario_app');
    }
};

module.exports = UsuarioDAO;