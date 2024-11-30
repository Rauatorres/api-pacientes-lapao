const UsuarioDAO = require('../model/UsuarioDAO');
const ConsultasDAO = require('../model/ConsultasDAO');
const PacientesDAO = require('../model/PacientesDAO');
const MedicosDAO = require('../model/MedicosDAO');
const { constants } = require('crypto');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.send('<h1>Funcionando</h1>');
    });

    app.post('/login', async (req, res)=>{
        const { username, senha } = req.body;
        const usuarioDAO = new UsuarioDAO();
        const crypto = require('crypto');

        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
        
        let dadosUsuario = await usuarioDAO.selectOne({chave: 'username', valor: username});
        
        if(dadosUsuario){
            if (senhaHash == dadosUsuario.senha){
                const { id, username, id_pessoa, tipo} = dadosUsuario
                res.json({success: true, data: {
                    id: id,
                    username: username,
                    id_pessoa: id_pessoa,
                    tipo: tipo
                }});
            }else{
                res.json({success: false, msg: 'senha incorreta'});
            }
        }else{
            res.json({success: false, msg: 'nome de usuário não encontrado'});
        }
        
        
    });

    app.post('/cadastrar', (req, res)=>{
        const crypto = require('crypto');

        const usuario = new UsuarioDAO();

        const { username, senha, tipo, id_pessoa } = req.body;
        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');


        usuario.insertOne(
            {username: username, senha: senhaHash, tipo: tipo, id_pessoa: id_pessoa}, 
            (erro) => res.json({success: false, msg: erro.sqlMessage}), 
            () => res.json({success: true})
        );
    });
 
    app.post('/consultas', async (req, res)=>{
        const { id_pessoa, tipo } = req.body;

        // console.log(req.body);

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
    });

    app.post('/medico/nome', async (req, res)=>{
        const { id } = req.body;
        const medicoDAO = new MedicosDAO();

        const medico = await medicoDAO.selectOne({chave: 'id', valor: id});

        // console.log(medico == undefined);
        if(medico != undefined){
            res.json({nome: medico.nome});
        }else{
            res.json({nome: "(vazio)"});
        }

    });

    app.post('/paciente/nome', async (req, res)=>{
        const { id } = req.body;
        const pacienteDAO = new PacientesDAO();

        const paciente = await pacienteDAO.selectOne({chave: 'id', valor: id});

        // console.log(medico == undefined);
        if(paciente != undefined){
            res.json({nome: paciente.nome});
        }else{
            res.json({nome: "(vazio)"});
        }

    });

};
