const UsuarioDAO = require('../model/UsuarioDAO');
const ConsultasDAO = require('../model/ConsultasDAO');
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
        const { id_usuario, tipo } = req.body;

        const PACIENTE = 0;
        const MEDICO = 1;

        let consultasDAO = new ConsultasDAO();

        let resultadoConsultas = [];

        if(tipo == PACIENTE){
            resultadoConsultas = await consultasDAO.selectMany({chave: 'idpaciente', valor: id_usuario});
        }else if(tipo == MEDICO){
            resultadoConsultas = await consultasDAO.selectMany({chave: 'idmedico', valor: id_usuario});
        }

        res.json({consultas: resultadoConsultas});
    });

};
