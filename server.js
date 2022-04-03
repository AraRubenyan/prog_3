var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000,  () => {
    console.log('connected');
    
});

matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
spoilGrassArr = [];
farmerArr = [];
rows = 50;
columns = 50;

weath = "winter";
Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
SpoilGrass = require("./spoilgrass")
Farmer = require("./farmer")


for (let y = 0; y < rows; y++) {
    matrix[y] = [];
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0;
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1;
        }
        else if (a >= 40 && a < 50) {
            matrix[y][x] = 2;
        }
        else if (a >= 50 && a < 70) {
            matrix[y][x] = 3;
        }
        else if (a >= 70 && a < 90) {
            matrix[y][x] = 4;
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5;
        }
    }
}

io.sockets.emit('send matrix', matrix)




function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr)
            }
            else if (matrix[y][x] == 4) {
                var spGrass = new SpoilGrass(x, y, 4);
                spoilGrassArr.push(spGrass)
            }
            else if (matrix[y][x] == 5) {
                var fa = new Farmer(x, y, 5);
                farmerArr.push(fa)
            }
        }
    }


    io.sockets.emit('send matrix', matrix)

}


function play() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in spoilGrassArr) {
        spoilGrassArr[i].mul();
        spoilGrassArr[i].eat();
    }
    for (var i in farmerArr) {
        farmerArr[i].hndzel();
        farmerArr[i].move();
    }
    io.sockets.emit('send matrix', matrix)
}

function addGrassEater(){
    console.log('grassEater');
    
    for (var i = 0; i < 7; i++) {   
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }else{
                i--
            }
        }
        io.sockets.emit("send matrix", matrix);
}

function killSpoilGrass() {
    console.log('SpoilGrass');
    spoilGrassArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 4){
                matrix[y][x] = 1;
                grassArr.push(new Grass(x, y, 1))
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function farmerToPredator(){
    console.log('Farmer');
    farmerArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 5){
                matrix[y][x] = 3;
                predatorArr.push(new Predator(x, y, 3))
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000)
setInterval(play, 1000)

io.on('connection', function (socket) {
    console.log('are conncted?');
    createObject(matrix)
    socket.on('addGrassEater', addGrassEater)
    socket.on('killSpoilGrass', killSpoilGrass)
    socket.on('farmerToPredator', farmerToPredator)
})