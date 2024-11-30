const DAO = require('./DAO');

const PacientesDAO = class PacientesDAO extends DAO{
    constructor(){
        super('paciente');
    }
};

module.exports = PacientesDAO;