module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.send('<h1>Funcionando</h1>');
    });

    app.post('/login', (req, res)=>{
        console.log(req.body);
        res.json({msg: 'funcionando'});
    });

};
