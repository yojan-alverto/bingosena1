class BingoGame {
    constructor() {
        this.numbers = Array.from({ length: 100 }, (_, i) => i + 1);
        this.drawnNumbers = new Set();
        this.currentNumber = null;
        this.letterMap = this.getLetterMap(); 
        this.initializeGame();
    }

    getLetterMap() {
        const map = {};
        for (let i = 1; i <= 100; i++) {
            if (i <= 20) map[i] = "B";
            else if (i <= 40) map[i] = "I";
            else if (i <= 60) map[i] = "N";
            else if (i <= 80) map[i] = "G";
            else map[i] = "O";
        }
        return map;
    }

    initializeGame() {
        this.createBingoGrid();
        this.bindEvents();
        this.updateStats();
    }

    createBingoGrid() {
        const grid = document.getElementById("bingoGrid");
        grid.innerHTML = "";
        
        // Crear las 5 columnas (B, I, N, G, O)
        const columns = {
            "B": this.numbers.filter(n => n <= 20),
            "I": this.numbers.filter(n => n > 20 && n <= 40),
            "N": this.numbers.filter(n => n > 40 && n <= 60),
            "G": this.numbers.filter(n => n > 60 && n <= 80),
            "O": this.numbers.filter(n => n > 80 && n <= 100)
        };
        
        // Crear contenedores para cada columna
        Object.keys(columns).forEach(letter => {
            const columnDiv = document.createElement("div");
            columnDiv.className = "bingo-column";
            columnDiv.id = `column-${letter}`;
            
            // Añadir números a la columna
            columns[letter].forEach(number => {
                const numberElement = document.createElement("div");
                numberElement.className = "bingo-number";
                numberElement.textContent = number;
                numberElement.dataset.number = number;
                numberElement.dataset.letter = letter;
                columnDiv.appendChild(numberElement);
            });
            
            grid.appendChild(columnDiv);
        });
    }

    bindEvents() {
        document
            .getElementById("drawButton")
            .addEventListener("click", () => this.drawNumber());
        document
            .getElementById("resetButton")
            .addEventListener("click", () => this.resetGame());
    }

    drawNumber() {
        if (this.drawnNumbers.size >= 100) {
            alert("¡Todos los números han sido sorteados!");
            return;
        }

        const availableNumbers = this.numbers.filter(
            (n) => !this.drawnNumbers.has(n)
        );

        // Shuffle avanzado
        for (let i = availableNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableNumbers[i], availableNumbers[j]] = [
                availableNumbers[j],
                availableNumbers[i],
            ];
        }

        this.currentNumber = availableNumbers[0];
        this.drawnNumbers.add(this.currentNumber);

        this.updateDisplay();
        this.updateStats();
        this.highlightCurrentNumber();
        this.updateNumberAppearance(this.currentNumber);
    }

    updateDisplay() {
        const display = document.getElementById("currentNumber");
        const currentNumber = this.currentNumber;

        if (currentNumber) {
            const letter = this.letterMap[currentNumber];
            display.innerHTML = `<span style="color: yellow; font-weight:bold">${letter}</span>-${currentNumber}`;
        } else {
            display.textContent = "--";
        }

        display.style.transform = "scale(1.1)";
        setTimeout(() => {
            display.style.transform = "scale(1)";
        }, 300);
    }

    updateStats() {
        document.getElementById("drawnNumbers").textContent =
            this.drawnNumbers.size;
        document.getElementById("remainingNumbers").textContent =
            100 - this.drawnNumbers.size;
    }

    highlightCurrentNumber() {
        document
            .querySelectorAll(".bingo-number.current")
            .forEach((el) => el.classList.remove("current"));

        if (this.currentNumber) {
            const currentElement = document.querySelector(
                `.bingo-number[data-number="${this.currentNumber}"]`
            );
            if (currentElement) {
                currentElement.classList.add("current");
            }
        }
    }

    updateNumberAppearance(number) {
        const element = document.querySelector(
            `.bingo-number[data-number="${number}"]`
        );
        if (element) {
            element.classList.add("selected"); 
        }
    }

    resetGame() {
        if (
            confirm(
                "¿Estás seguro de que quieres reiniciar el juego? Se perderán todos los números sorteados."
            )
        ) {
            this.drawnNumbers.clear();
            this.currentNumber = null;
            document.getElementById("currentNumber").textContent = "--";
            this.updateStats();
            this.createBingoGrid();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new BingoGame();
});