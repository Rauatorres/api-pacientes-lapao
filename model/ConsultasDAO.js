const DAO = require('./DAO');

const ConsultasDAO = class ConsultasDAO extends DAO{
    constructor(){
        super('agenda_consulta');
    }
};

module.exports = ConsultasDAO;