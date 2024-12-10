const Usuario = require('../model/login/Usuario');

module.exports.logar = async (app, req, res)=>{
    const { username, senha } = req.body;
    
    const usuario = new Usuario(username, senha);
    const usuarioDados = await usuario.getDados();
    
    res.json(usuarioDados);
}

module.exports.cadastrar = async (app, req, res)=>{
    const { username, senha, tipo, id_pessoa } = req.body;

    const usuario = new Usuario(username, senha);
    const usuarioCadastrado = await usuario.cadastrar({tipo: tipo, id_pessoa: id_pessoa});
    
    res.json(usuarioCadastrado);
}
