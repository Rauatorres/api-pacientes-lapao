const UsuariosDAO = require('../dao/UsuarioDAO');

const Usuario = class Usuario{
    constructor(username, senha){
        const crypto = require('crypto');
        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

        this._username = username;
        this._senha = senhaHash;
        this._usuariosDAO = new UsuariosDAO;
    }

    async getDados(){
        let dadosUsuario = await this._usuariosDAO.selectOne({username: this._username});
        
        if(dadosUsuario){
            if (this._senha == dadosUsuario.senha){
                return {success: true, ...dadosUsuario};
            }else{
                return {success: false, msg: 'senha incorreta'};
            }
        }else{
            return {success: false, msg: 'nome de usuário não encontrado'};
        }
    }

    async cadastrar(dados){
        let usuarioDados = await this.getDados();
        if(!usuarioDados.success){
            return this._usuariosDAO.insertOne(
                {username: this._username, senha: this._senha, tipo: dados.tipo, id_pessoa: dados.id_pessoa}, 
                (erro) => ({success: false, msg: erro.sqlMessage}), 
                () => ({success: true})
            );
        }else{
            return {success: false, msg: 'O usuário já existe!'};
        }
    }
}

module.exports = Usuario;
