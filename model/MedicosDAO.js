const DAO = require('./DAO');

const MedicosDAO = class MedicosDAO extends DAO{
    constructor(){
        super('medico');
    }
};

module.exports = MedicosDAO;