const Pessoa = class Pessoa{
    constructor(id, DAO){
        this._id = id;
        this._DAO = DAO;
    }

    async getNome(){
        let pessoa = await this._DAO.selectOne({ id: id });
        return pessoa.encontrou ? pessoa.nome : "(não encontrado)";
    }
}

module.exports = Pessoa;