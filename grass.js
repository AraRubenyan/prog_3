let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let chooseCells = this.chooseCell(0)
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (this.multiply >= 15 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
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
}