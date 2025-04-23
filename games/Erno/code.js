document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("contents_palapeli");
    const shuffleBtn = document.getElementById("shuffleBtn");
    const timerDisplay = document.getElementById("timer");
    const winMessage = document.getElementById("winMessage");
    const emptyTile = document.getElementById("palapeli_empty");

    let seconds = 0;
    let timer = null;
    let started = false;
    let points = 0;

    function getCurrentTiles() {
        return Array.from(puzzleContainer.children);
    }

    function getTileIndex(tile) {
        return getCurrentTiles().indexOf(tile);
    }

    function getGridCoords(index) {
        return [Math.floor(index / 3), index % 3];
    }

    function areAdjacent(index1, index2) {
        const [r1, c1] = getGridCoords(index1);
        const [r2, c2] = getGridCoords(index2);
        const dx = Math.abs(r1 - r2);
        const dy = Math.abs(c1 - c2);
        return dx + dy === 1;
    }

    function swapTiles(tile1, tile2) {
        const temp = document.createElement("div");
        puzzleContainer.replaceChild(temp, tile1);
        puzzleContainer.replaceChild(tile1, tile2);
        puzzleContainer.replaceChild(tile2, temp);
    }

    function startTimer() {
        if (timer) return;
        seconds = 0;
        timerDisplay.textContent = `Aika: 0 s`;
        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `Aika: ${seconds} s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    function checkWinCondition() {
        const expectedOrder = [
            "palapeli_1_1", "palapeli_1_2", "palapeli_1_3",
            "palapeli_2_1", "palapeli_2_2", "palapeli_2_3",
            "palapeli_3_1", "palapeli_3_2"
        ];
        const currentOrder = getCurrentTiles()
            .filter(tile => tile.id !== "palapeli_empty")
            .map(tile => tile.id);

        const isCorrectOrder = expectedOrder.every((id, i) => currentOrder[i] === id);
        const isEmptyTileCorrect = getTileIndex(emptyTile) === 8;

        if (isCorrectOrder && isEmptyTileCorrect && started) {
            stopTimer();
            let pointsEarned = 1;

            if (seconds <= 150) {
                pointsEarned = 3;
            } else if (seconds <= 300) {
                pointsEarned = 2;
            }

            points = pointsEarned;
            winMessage.textContent = `Onneksi olkoon! Ratkaisit palapelin ajassa ${seconds} sekuntia. Pisteet: ${points}`;
            started = false;
        }
    }

    function handleTileClick(e) {
        const clickedTile = e.currentTarget;
        const clickedIndex = getTileIndex(clickedTile);
        const emptyIndex = getTileIndex(emptyTile);

        if (areAdjacent(clickedIndex, emptyIndex)) {
            swapTiles(clickedTile, emptyTile);
            if (!started) {
                started = true;
                startTimer();
            }
            updateTileListeners();
            checkWinCondition();
        }
    }

    function updateTileListeners() {
        getCurrentTiles().forEach(tile => {
            tile.removeEventListener("click", handleTileClick);
        });

        getCurrentTiles().forEach(tile => {
            if (tile.id !== "palapeli_empty") {
                tile.addEventListener("click", handleTileClick);
            }
        });
    }

    function shufflePuzzle(moves = 100) {
        const tiles = getCurrentTiles();
        let emptyIndex = getTileIndex(emptyTile);

        for (let i = 0; i < moves; i++) {
            const neighbors = tiles.filter(tile => {
                const index = getTileIndex(tile);
                return tile.id !== "palapeli_empty" && areAdjacent(index, emptyIndex);
            });

            const randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
            const randomIndex = getTileIndex(randomTile);

            if (randomTile) {
                swapTiles(randomTile, emptyTile);
                emptyIndex = randomIndex;
            }
        }

        winMessage.textContent = "";
        stopTimer();
        timerDisplay.textContent = `Aika: 0 s`;
        started = false;

        updateTileListeners();
    }

    shuffleBtn.addEventListener("click", () => shufflePuzzle(100));

    updateTileListeners();
});

