module.exports = (app)=>{
    app.get('/', (req, res)=>{
        const DAO = require('../model/DAO');
        const PacienteDAO = new DAO('paciente');
        PacienteDAO.selectOne('id', 5, (resultado)=>{
            console.log(resultado);
        });
        
        res.send('<h1>Funcionando</h1>');
    });

    app.post('/login', (req, res)=>{
        const DAO = require('../model/DAO');
        const PacienteDAO = new DAO('paciente');

        
        const { username, password } = req.body;
        
        
        
        // console.log();
        res.json({msg: 'funcionando'});
    });

    app.get('/cadastrar', (req, res)=>{
        const UsuarioDAO = require('../model/UsuarioDAO');
        const PacienteDAO = new UsuarioDAO();

        // PacienteDAO.insertOne({teste: 'teste'});
        // PacienteDAO.selectAll((resultado)=>{
        //     console.log(resultado);
        // });

        res.send('<h1>Inserindo</h1>');
    })

};
