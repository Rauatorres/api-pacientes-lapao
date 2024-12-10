module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.send('<h1>Funcionando</h1>');
    });

    app.post('/login', async (req, res)=>{
        await require('../controller/login').logar(app, req, res);
    });
    
    app.post('/cadastrar', (req, res)=>{
        require('../controller/login').cadastrar(app, req, res);
    });
 
    app.post('/consultas', async (req, res)=>{
        require('../controller/consultas').obterConsultas(app, req, res);
    });

    app.post('/:tipoPessoa/nome', async (req, res)=>{
        require('../controller/consultas').obterNomePessoa(app, req, res);
    });
}
