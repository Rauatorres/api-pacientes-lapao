const Medico = require('./pessoas/Medico');
const Paciente = require('./pessoas/Paciente');

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
