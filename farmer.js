let LivingCreature = require('./LivingCreature')

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
        var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

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
            if(weath != "winter"){
            let chooseCells = this.chooseCell(1)
            var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]


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
}