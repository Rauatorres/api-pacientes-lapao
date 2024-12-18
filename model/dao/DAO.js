const DAO = class DAO{
    
    constructor(tabela){
        this.pool = require('../../configs/dbConfig');
        this.tabela = tabela;
    }

    async _executarQuery(query, requisitosPreparedArray){
        let executarQuery = new Promise((resolve, reject)=>{
            this.pool.getConnection((err, con)=>{
                if (err){
                    reject(err);
                }else{
                    con.query(query, requisitosPreparedArray, (error, resultados, fields)=>{
                        if (error){
                            reject({ success: false, ...error });
                        }else{
                            if(resultados.length){
                                if(resultados.length > 0){
                                    resolve({ ...resultados[0], success: true });
                                }else{
                                    resolve({ success: false });
                                }
                            }else{
                                resolve({ success: true });
                            }
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

    selectOne(requisitos) {
        let requisitosQuery = '';
        let requisitosPreparedArray = [];

        for(const [chave, valor] of Object.entries(requisitos)){
            if((Object.keys(requisitos))[0] == chave){
                requisitosQuery += `${chave}=? `;
            }else{
                requisitosQuery += `AND ${chave}=? `;
            }
            requisitosPreparedArray.push(valor);
        }

        const query = `SELECT * FROM ${this.tabela} WHERE ${requisitosQuery}`;

        let executarQuery = new Promise((resolve, reject)=>{
            this.pool.getConnection((err, con)=>{
                if (err){
                    reject(err);
                }else{
                    con.query(query, requisitosPreparedArray, (error, resultados, fields)=>{
                        if (error){
                            reject(error);
                        }else{
                            if(resultados.length > 0){
                                resolve({ ...resultados[0], encontrou: true });
                            }else{
                                resolve({ encontrou: false })
                            }
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
        let requisitosQuery = '';
        let requisitosPreparedArray = [];

        for(const [chave, valor] of Object.entries(requisitos)){
            if((Object.keys(requisitos))[0] == chave){
                requisitosQuery += `${chave}=? `;
            }else{
                requisitosQuery += `AND ${chave}=? `;
            }
            requisitosPreparedArray.push(valor);
        }

        const query = `SELECT * FROM ${this.tabela} WHERE ${requisitosQuery}`;

        let executarQuery = new Promise((resolve, reject)=>{
            this.pool.getConnection((err, con)=>{
                if (err){
                    reject(err);
                }else{
                    con.query(query, requisitosPreparedArray, (error, resultados, fields)=>{
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