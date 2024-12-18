const Usuario = require('./login/Usuario');

module.exports.logar = async (app, req, res)=>{
    const { username, senha } = req.body;
    
    const usuario = new Usuario();
    const usuarioDados = await usuario.fazerLogin(username, senha);
    const consultas = await usuario.getConsultas();

    res.json({dadosLogin: usuarioDados, consultas: consultas});
}

module.exports.cadastrar = async (app, req, res)=>{
    const usuario = new Usuario();
    const usuarioCadastrado = await usuario.cadastrar(req.body);

    res.json(usuarioCadastrado);
}
