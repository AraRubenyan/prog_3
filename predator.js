let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x,y, index)
        this.energy=6
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

    chooseCell(character)  {
        this.getNewCoordinates();
     return super.chooseCell(character)
    }
    move() {
        let chooseCells = this.chooseCell(0)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        let chooseCells1 = this.chooseCell(1)
        var newCell1 = chooseCells1[Math.floor(Math.random() * chooseCells1.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }
        else if (newCell1) {
            var newX = newCell1[0];
            var newY = newCell1[1];

            matrix[this.y][this.x] = 1;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }
    }
    eat() {

        let chooseCells = this.chooseCell(2)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 4;
        }
    }

    die() {
        if (this.energy <= 0 && weath != "summer") {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}