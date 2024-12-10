const Pessoa = require('./Pessoa');
const MedicosDAO = require('../dao/MedicosDAO');

const Medico = class Medico extends Pessoa{
    constructor(id){
        super(id, new MedicosDAO());
    }
}

module.exports = Medico;