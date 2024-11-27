const DAO = class DAO{
    
    constructor(tabela){
        this.pool = require('../configs/dbConfig');
        this.tabela = tabela;
    }

    #executarQuery(query){
        this.pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(query, (error, resultados, fields)=>{
                // callback(resultados[0]);
                con.release();
                if (error) throw error;
            });
        });
    }
    #executarSelectQuery(query, callback){
        this.pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(query, (error, resultados, fields)=>{
                callback(resultados[0]);
                con.release();
                if (error) throw error;
            });
        });
    }

    selectOne(atributo, valor, callback) {
        const query = `SELECT * FROM ${this.tabela} WHERE ${atributo}=${valor}`;
        this.pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(query, (error, resultados, fields)=>{
                callback(resultados[0]);
                con.release();
                if (error) throw error;
            });
        });

    }

    selectAll(callback){
        const query = `SELECT * FROM ${this.tabela}`;
        this.pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(query, (error, resultados, fields)=>{
                callback(resultados);
                con.release();
                if (error) throw error;
            });
        });
    }

    insertOne(insert){
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
        console.log(query);

        this.#executarQuery(query);
    }
}

module.exports = DAO;