//նորից սոքեթը փոխանցիր փոփոխականիդ
var socket = io();
let weath = "winter"
//էստեղ նախկին սկրիպտ ֆայլիցդ տպում և էստեղ ես բերում setup ֆունկցիան
 side = 30

function setup() {
    createCanvas(50 * side, 50 * side);
    background('#acacac');
}


socket.on("weather", (data) => {
    weath = data
})

function nkarel(matrix) {
    
for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weath == "summer") {
                    fill("green");
                }else if (weath == "autumn") {
                    fill("#333300");
                }else if (weath == "winter") {
                    fill("white");
                }else if (weath == "spring") {
                    fill("#4dffa6");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
                if (weath == "winter") {
                    matrix[y][x] = 0;
                }
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
}

}


function addGrassEater(){
    socket.emit("addGrassEater")
}
function killSpoilGrass(){
    socket.emit("killSpoilGrass")
}
function farmerToPredator(){
    socket.emit("farmerToPredator")
}
// քանի որ այժմ չունենք draw ֆունկցիա, որ ավտոմատ կանչվի, այդ պատճառով այն կանչում ենք 
// setInterval մեթոդի մեջ:
//էստեղ կլիենտը լսողն է: on մեթոդը լսելով send matrix հրամանը, կատարում է նկարել ֆունկցիան
// և որպես արգումենտ վերցնում սերվերի մատրիցը լցնելուց հետո գրված emit-ի մատրիցը:
setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)

//էստեղ այսքանը, հիմա նորից գնա սերվեր ֆայլ