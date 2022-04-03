let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 6
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
       return super.chooseCell(character)
    }

    move() {


        let chooseCells = this.chooseCell(0)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }
    }
    eat() {


        let chooseCells = this.chooseCell(1)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
        else {
            this.move();
            if (this.multiply >= 6) {
                this.mul();
            }
            else if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {

        let chooseCells = this.chooseCell(0)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
        if (weath == "winter") {

            this.multiply -= 2;
        }
        if (weath == "spring") {

            this.multiply += 5;
        }
        if (weath == "summer") {

            this.multiply += 3;
        }
        if (weath == "autumn") {

            this.multiply--;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        }
    }
}