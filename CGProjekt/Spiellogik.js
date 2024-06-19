class Brett {
    constructor() {
        this.felderZahl = 6 * 3;
        this.felder = new Map();
        this.gameOver = false;
        this.count = 0;

        for (let i = 0; i < this.felderZahl; i++) {
            this.felder.set(i, false);
        }
    }

    startGame() {
        this.count = 0;
        let currentField = 0;
        let nextField = 0;
        this.felder.set(currentField, true);

        while (!this.gameOver) {
            let p = this.diceThrow(); // after pressing a button on the screen
            nextField = currentField + p;
            console.log("randomly generated = " + p);
            console.log(`${this.count} cf + random = ${currentField} + ${p} = ${nextField}`);

            if (nextField <= this.felderZahl) {
                this.felder.set(currentField, false);
                this.felder.set(nextField, true);
                currentField = nextField;
            }

            if (nextField === this.felderZahl) {
                console.log("You won");
                this.gameOver = true;
            }

            if (this.count === 10) {
                console.log("You lost");
                this.gameOver = true;
            }

            this.count++;
        }
    }

    diceThrow() {
        return Math.floor(Math.random() * 6) + 1;
    }
}

// Main function
function main() {
    const brett = new Brett();
    brett.startGame();
}

// Execute main function
main();
