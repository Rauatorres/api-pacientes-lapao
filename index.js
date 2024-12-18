const app = require('./configs/server');

require('dotenv').config();

const port = process.env.SERVER_PORT || 3000;

app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`);
});