const app = require('./configs/server');

const port = 3000;

app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`);
});