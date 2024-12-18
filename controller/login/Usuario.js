const UsuariosDAO = require('../../model/dao/UsuarioDAO');
const ConsultasDAO = require('../../model/dao/ConsultasDAO');

const Usuario = class Usuario{
    constructor(){
        this._logado = false;
        this._usuariosDAO = new UsuariosDAO();
        this._username = '';
        this._senha = '';
    }

    async fazerLogin(username, senha){
        const crypto = require('crypto');
        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

        let dadosUsuario = await this._usuariosDAO.selectOne({username: username});
        let resultado = {};
        
        
        if(dadosUsuario){
            if (senhaHash == dadosUsuario.senha){
                this._logado = true;
                this._username = dadosUsuario.username;
                resultado = dadosUsuario;
            }else{
                resultado = { msg: 'senha incorreta' };
            }
        }else{
            resultado = { msg: 'nome de usuário não encontrado' };
        }
        return {success: this._logado, ...resultado};
    }

    async _getDados(username){
        let dadosUsuario = await this._usuariosDAO.selectOne({username: username});
        
        if(dadosUsuario.encontrou){
            return {success: true, ...dadosUsuario};
        }else{
            return {success: false, msg: 'usuário não encontrado'};
        }
    }
    
    async cadastrar(dados){
        const crypto = require('crypto');
        const senhaHash = crypto.createHash('sha256').update(dados.senha).digest('hex');
        
        return await this._usuariosDAO.insertOne(
            {username: dados.username, senha: senhaHash, tipo: dados.tipo, id_pessoa: dados.id_pessoa}
        );
    }

    async getConsultas(){
        let dados = await this._getDados(this._username);
        let { id_pessoa, tipo } = dados;

        const PACIENTE = 0;
        const MEDICO = 1;

        let consultasDAO = new ConsultasDAO();

        let resultadoConsultas = [];

        if(tipo == PACIENTE){
            resultadoConsultas = await consultasDAO.selectMany({ idpaciente: id_pessoa });
        }else if(tipo == MEDICO){
            resultadoConsultas = await consultasDAO.selectMany({ idmedico: id_pessoa });
        }

        return resultadoConsultas;
    }
}

module.exports = Usuario;
