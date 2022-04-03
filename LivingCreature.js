//Բարևևևև: Ինչխ ես? 
//Սկսիր ֆայլերը նայել հետևյալ հաջոդականությամբ.
//0.index.html
//1.LivingCreature
//2.Grass
//3.GrassEater
//4.server 
//5.script
//6.server

//դե ինչ, բարի ընթացք:


//քանի որ մենք մեր պրոյեկտը հանում ենք սերվերային հարթակ, 
//այդ պատճառով պետք է մեր կլասս-երը մոդուլ սարքել
// չմոռանաս ժառանգական սարքել պռոյեկտդ

module.exports = class LivingCreature {
    constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.multiply = 0;
		
	}

	getNewDirections(){
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
	
	chooseCell(num) {
		this.getNewDirections()
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}

}