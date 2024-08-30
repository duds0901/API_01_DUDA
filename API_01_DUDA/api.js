//1 requires 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const mysql_config = require('./inc/mysql_config');
const functions = require('./inc/functions');

//2 criaçao de duas constantes para definiçao da pisponibilidade da
//api e da versao da api
const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

//3 iniciar o server 
const app = express();
app.listen(3000,()=>{
    console.log("API esta executando")
})

//4 checar se API esta disponivel 
app.use((req,res, next)=>{
         if (API_AVAILABILITY){
            next();
        } else{
            res.json(functions.response('atençao','API esta em manutençao. Sinto muito',0,null))
        }
    })

//5 mysql connection 
const connection = mysql.createConnection(mysql_config);

//6 cors 
app.use(cors());

//7 rotas 
//rota inicial que vai dizer que a API esta disponivel 
app.get('/',(req,res)=>{
    res.json(functions.response('sucesso','API esta rodando',0,null))
})

//9 rota para pegar todas as tarefas
app.get('/tasks',(req,res)=>{
    connection.query('SELECT * FROM tasks',(err,rows))
})

//8 midleware para caso alguma rota nao encontrada 
app.use((req,res)=>{
    res.json(functions.response('atençao', 'Rota nao encontrada',0,null))
})
