const Pessoa = require('./Pessoa');
const PacientesDAO = require('../dao/PacientesDAO');

const Paciente = class Paciente extends Pessoa{
    constructor(id){
        super(id, new PacientesDAO());
    }
}

module.exports = Paciente;