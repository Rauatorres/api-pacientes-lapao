const DAO = class DAO{
    
    constructor(tabela){
        this.pool = require('../configs/dbConfig');
        this.tabela = tabela;
    }

    _executarQuery(query, callbackErro, callbackSucesso){
        this.pool.getConnection((err, con)=>{
            if (err){
                callbackErro(err);
            }else{
                con.query(query, (erroQuery, resultados, fields)=>{
                    con.release();
                    if (erroQuery){
                        callbackErro(erroQuery);
                    }else{
                        callbackSucesso();
                    }
                });
            }
        });
    }

    selectOne(requisitos) {
        let { chave, valor } = requisitos;
        if(typeof(valor) == 'string'){
            valor = `'${valor}'`;
        }

        const query = `SELECT * FROM ${this.tabela} WHERE ${chave}=${valor}`;

        let executarQuery = new Promise((resolve, reject)=>{
            this.pool.getConnection((err, con)=>{
                if (err){
                    reject(err);
                }else{
                    con.query(query, (error, resultados, fields)=>{
                        if (error){
                            reject(error);
                        }else{
                            resolve(resultados[0]);
                        }
                        con.release();
                    });
                }
            });

        })

        return executarQuery.then(
            (resultado) => {return resultado;},
            (erro) => {return erro;}
        )

    }

    selectMany(requisitos) {
        let { chave, valor } = requisitos;
        if(typeof(valor) == 'string'){
            valor = `'${valor}'`;
        }

        const query = `SELECT * FROM ${this.tabela} WHERE ${chave}=${valor}`;

        let executarQuery = new Promise((resolve, reject)=>{
            this.pool.getConnection((err, con)=>{
                if (err){
                    reject(err);
                }else{
                    con.query(query, (error, resultados, fields)=>{
                        if (error){
                            reject(error);
                        }else{
                            resolve(resultados);
                        }
                        con.release();
                    });
                }
            });

        })

        return executarQuery.then(
            (resultado) => {return resultado;},
            (erro) => {return erro;}
        )

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

    
}

module.exports = DAO;