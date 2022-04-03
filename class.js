let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let chooseCells = this.chooseCell(0)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]
        if (this.multiply >= 15 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]

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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]

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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]

        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]
        let chooseCells1 = this.chooseCell(1)
        var newCell1 = chooseCells1[Math.floor(Math.random() * chooseCells1)]

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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]

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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]

        if (this.energy >= 8 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 4;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


module.exports = class SpoilGrass extends LivingCreature {

    eat() {
        let chooseCells = this.chooseCell(2)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            spoilGrassArr.splice(i, 1);
            matrix[newY][newX] = 0;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
        }
    }
    mul() {
        this.multiply++;
        let chooseCells = this.chooseCell(0)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]
        if (this.multiply >= 1 && newCell) {
            var newSpoilGrass = new SpoilGrass(newCell[0], newCell[1], this.index);
            spoilGrassArr.push(newSpoilGrass);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
        }
    }
}

module.exports = class Farmer extends LivingCreature{
    
    

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

    hndzel() {
        let chooseCells = this.chooseCell(4)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ]
            for (var i in matrix) {
                matrix[this.x][this.y] = 1
            }
            spoilGrassArr.splice(i, 8);
            matrix[newY][newX] = 0;


        }
    }
    move() {
        let chooseCells = this.chooseCell(1)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells)]


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 1;
            matrix[newY][newX] = 5;


            this.y = newY;
            this.x = newX;
        }
    }
}