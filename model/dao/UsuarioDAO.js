const DAO = require('./DAO');

const UsuarioDAO = class UsuarioDAO extends DAO{
    constructor(){
        super('usuario_app');
    }

    async insertOne(insert){
        let atributos = '';
        let values = '';
        let preparedValues = [];

        for(const [key, value] of Object.entries(insert)){
            atributos += `, ${key}`;
            values += `, ?`;
            preparedValues.push(value);
        }

        let query = `INSERT INTO ${this.tabela} (id ${atributos}) VALUES(DEFAULT ${values})`;

        return await this._executarQuery(query, preparedValues);
    }
};

module.exports = UsuarioDAO;