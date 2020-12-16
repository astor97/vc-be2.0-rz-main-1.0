const porta = 3333

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bancoDeDados = require('./bancoDeDados')

app.use(bodyParser.urlencoded({ extended: true }))


/****** TERRITORIES ******/

app.get('/territories', (req, res, next) => { // Retorna todos os produtos
    res.send(bancoDeDados.getTerritories())
})

app.get('/territories/:id', (req, res, next) => { // Retorna o produto de um determinado ID
    res.send(bancoDeDados.getTerritorie(req.params.id))
})

app.post('/territories', (req, res, next) => { // Cria um produto

    const territories = bancoDeDados.salvarTerritorie({
        data: {
            nome: req.body.name,
            inicio: { x: req.body.inicio, y: req.body.inicio },
            fim: { x: req.body.fim, y: req.body.fim },
            área: (req.body.fim - req.body.inicio) * (req.body.fim - req.body.inicio),
            pintado_área: 0,
        }
    }, req.body.fim);

    res.send(territories)
})

app.delete('/territories/:id', (req, res, next) => { // Retorna o produto de um determinado ID
    res.send(bancoDeDados.excluirTerritorie(req.params.id))
})


/****** SQUARES ******/

app.get('/squares/:x/:y', (req, res, next) => {
    const x = req.params.x
    const y = req.params.y

    res.send(bancoDeDados.getSquares(x, y))
})

app.patch('/squares/:x/:y/paint', (req, res, next) => {
    const x = req.params.x
    const y = req.params.y
    const changes = req.body;

    const matrizOriginal = bancoDeDados.pegarMatrizOriginal(x, y);

    let matrizModificada = matrizOriginal

    matrizModificada.data.painted = true


    bancoDeDados.salvarMatriz(x, y, matrizModificada);

    res.send(matrizModificada);
})
app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}.`)
})