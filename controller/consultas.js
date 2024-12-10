const ConsultasDAO = require('../model/dao/ConsultasDAO');
const Medico = require('../model/pessoas/Medico');
const Paciente = require('../model/pessoas/Paciente');

module.exports.obterConsultas = async (app, req, res) => {
    const { id_pessoa, tipo } = req.body;


    const PACIENTE = 0;
    const MEDICO = 1;

    let consultasDAO = new ConsultasDAO();

    let resultadoConsultas = [];

    if(tipo == PACIENTE){
        resultadoConsultas = await consultasDAO.selectMany({chave: 'idpaciente', valor: id_pessoa});
    }else if(tipo == MEDICO){
        resultadoConsultas = await consultasDAO.selectMany({chave: 'idmedico', valor: id_pessoa});
    }

    res.json({consultas: resultadoConsultas});
}

module.exports.obterNomePessoa = async (app, req, res) => {
    const { id } = req.body;
    
    let pessoa;

    
    switch(req.params.tipoPessoa){
        case 'medico':
            pessoa = new Medico(id);
            break;
        case 'paciente':
            pessoa = new Paciente(id);
            break;
        default:
            pessoa = { getNome: () => '(tipo de pessa indefinido)' };

    }

    res.json({nome: await pessoa.getNome()});
}
