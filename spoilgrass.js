let LivingCreature = require('./LivingCreature')

module.exports = class SpoilGrass extends LivingCreature {

    eat() {
        let chooseCells = this.chooseCell(2)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]


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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (this.multiply >= 1 && newCell) {
            var newSpoilGrass = new SpoilGrass(newCell[0], newCell[1], this.index);
            spoilGrassArr.push(newSpoilGrass);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
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
}