const sequence = {
    _id: 1,
    get id() { return this._id++ }
}
const territories = {}


function salvarTerritorie(territorie, area) { //Define o Id seguinte para o territorie ou utiliza um ID definido caso tenha
    if (!territorie.id) territorie.id = sequence.id
    territories[territorie.id] = territorie

    var MATRIZ2 = [];
    for (var i = 0; i < area; i++) {
        MATRIZ2[i] = [];
        for (var j = 0; j < area; j++) {
            MATRIZ2[i][j] = ''
        }
    }

    for (var L = 0; L < area; L++) {
        for (var C = 0; C < area; C++) {

            MATRIZ2[L][C] = {
                data: {
                    x: L,
                    y: C,
                    painted: false
                },
                error: false
            }
        }
    }

    territories.matriz = MATRIZ2

    return territorie
}


function getSquares(x, y) {
    const stringQuadrado = JSON.stringify(territories.matriz)
    const dadosQuadrado = JSON.parse(stringQuadrado)
    return dadosQuadrado[x][y]
}

function pegarMatrizOriginal(x, y) {
    const stringQuadrado = JSON.stringify(territories.matriz)
    const dadosQuadrado = JSON.parse(stringQuadrado)
    return dadosQuadrado[x][y]
}

function getTerritorie(id) {
    return territories[id] || {}
}

function salvarMatriz(x, y, matrizModificada) {
    territories.matriz[x][y] = matrizModificada
}

function getTerritories() {
    const valoresMatriz = Object.values(territories)
    const stringQuadrado = JSON.stringify(valoresMatriz)
    const dadosQuadrado = JSON.parse(stringQuadrado)
    let matrizFormatada = []   
    for(var i=0; i<valoresMatriz.length; i++) {
        if(valoresMatriz[i].id) {
            matrizFormatada.push(dadosQuadrado[i])
        }
    }
    
   return matrizFormatada
}


function excluirTerritorie(id) {
    const territorie = territories[id]
    delete territories[id]
    return { erro: false }
}

module.exports = { salvarTerritorie, getTerritorie, getTerritories, excluirTerritorie, getSquares, pegarMatrizOriginal, salvarMatriz}