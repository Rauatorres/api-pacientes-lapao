const Usuario = require('./login/Usuario');

module.exports.logar = async (app, req, res)=>{
    const { username, senha } = req.body;
    
    const usuario = new Usuario();
    const usuarioDados = await usuario.fazerLogin(username, senha);
    const consultas = await usuario.getConsultas();

    
    res.json({dadosLogin: usuarioDados, consultas: consultas});
}

module.exports.cadastrar = async (app, req, res)=>{
    const { username, senha, tipo, id_pessoa } = req.body;

    const usuario = new Usuario(username, senha);
    const usuarioCadastrado = await usuario.cadastrar({tipo: tipo, id_pessoa: id_pessoa});
    
    res.json(usuarioCadastrado);
}
