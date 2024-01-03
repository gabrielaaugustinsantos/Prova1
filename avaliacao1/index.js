const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Compra = require('./model/Compra');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.post('/processar', function(req, res){
  var com = new Compra();

  com.urgencia = req.body.urgencia;
  com.quantidade = req.body.quantidade;

  com.serv.matricula = req.body.matricula;
  com.serv.nome = req.body.nome;
  com.serv.cargo = req.body.cargo;

  com.mat.material = req.body.material;
  com.mat.descricao = req.body.descricao;
  com.mat.preco = req.body.preco;
  com.mat.unidade = req.body.unidade;

  com.calcularCompra();
  com.calcularPrazo();

  res.render('resultado.ejs', {
    urgencia: com.urgencia,
    quantidade: com.quantidade,

    matricula: com.serv.matricula,
    nome: com.serv.nome,
    cargo: com.serv.cargo,

    material: com.mat.material,
    descricao: com.mat.descricao,
    preco: com.mat.preco,
    unidade: com.mat.unidade,

    prazoEntrega: com.prazoEntrega,
    valorCompra: com.valorCompra

  })
});


