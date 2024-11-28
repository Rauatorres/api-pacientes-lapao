const DAO = require('./DAO');

const UsuarioDAO = class UsuarioDAO extends DAO{
    constructor(){
        super('usuario_app');
    }

    insertOne(insert, callbackErro, callbackSucesso){
        let atributos = '';
        let values = '';

        for(const [key, value] of Object.entries(insert)){
            atributos += `, ${key}`;
            if((typeof value) == 'string'){
                values += `, '${value}'`;
            }else{
                values += `, ${value}`;
            }
        }

        let query = `INSERT INTO ${this.tabela} (id ${atributos}) VALUES(DEFAULT ${values})`;

        this._executarQuery(query, callbackErro, callbackSucesso);
    }
};

module.exports = UsuarioDAO;