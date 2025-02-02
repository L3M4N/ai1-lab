document.addEventListener("DOMContentLoaded", function() {
    if ("Notification" in window) {
        Notification.requestPermission();
    }

    const map = L.map('map').setView([53.430127, 14.564802], 18);
    L.tileLayer.provider('Esri.WorldImagery').addTo(map);

    document.getElementById("locationButton").addEventListener("click", function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                map.setView([lat, lon], 18);
                document.getElementById("coordinates").textContent = "Współrzędne: " + lat.toFixed(5) + ", " + lon.toFixed(5);
            }, function(error) {
                console.error("Błąd geolokalizacji:", error);
            });
        } else {
            alert("Geolokalizacja nie jest dostępna.");
        }
    });

    document.getElementById("downloadMapButton").addEventListener("click", function() {
        leafletImage(map, function (err, canvas) {
            if (err) {
                console.error(err);
                return;
            }
            createPuzzle(canvas);
        });
    });

    function createPuzzle(canvas) {
        const rows = 4, cols = 4;
        const pieceWidth = canvas.width / cols;
        const pieceHeight = canvas.height / rows;

        document.getElementById("puzzleGrid").innerHTML = "";
        document.getElementById("puzzlePieces").innerHTML = "";

        for (let i = 0; i < rows * cols; i++) {
            const dropZone = document.createElement("div");
            dropZone.className = "drop-zone";
            dropZone.dataset.index = i;
            dropZone.addEventListener("dragover", handleDragOver);
            dropZone.addEventListener("drop", handleDrop);
            dropZone.addEventListener("dragenter", handleDragEnter);
            dropZone.addEventListener("dragleave", handleDragLeave);
            document.getElementById("puzzleGrid").appendChild(dropZone);
        }

        let pieces = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const pieceCanvas = document.createElement("canvas");
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
                const ctx = pieceCanvas.getContext("2d");
                ctx.drawImage(canvas,
                    col * pieceWidth, row * pieceHeight,
                    pieceWidth, pieceHeight,
                    0, 0,
                    pieceWidth, pieceHeight);
                const pieceDiv = document.createElement("div");
                pieceDiv.className = "puzzle-piece";
                pieceDiv.draggable = true;
                pieceDiv.dataset.index = row * cols + col;
                pieceDiv.appendChild(pieceCanvas);
                pieceDiv.addEventListener("dragstart", handleDragStart);
                pieceDiv.addEventListener("dragend", handleDragEnd);
                pieces.push(pieceDiv);
            }
        }
        pieces = shuffleArray(pieces);

        const piecesContainer = document.getElementById("puzzlePieces");
        pieces.forEach(piece => piecesContainer.appendChild(piece));
    }

    let draggedPiece = null;

    function handleDragStart(e) {
        draggedPiece = this;
        e.dataTransfer.setData("text/plain", this.dataset.index);
        setTimeout(() => this.style.visibility = "hidden", 0);
    }

    function handleDragEnd(e) {
        this.style.visibility = "visible";
        draggedPiece = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add("over");
    }

    function handleDragLeave(e) {
        this.classList.remove("over");
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove("over");

        if (this.firstChild) {
            const existingPiece = this.removeChild(this.firstChild);
            document.getElementById("puzzlePieces").appendChild(existingPiece);
        }
        this.appendChild(draggedPiece);

        checkPuzzle();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function checkPuzzle() {
        const dropZones = document.querySelectorAll(".drop-zone");
        let correctCount = 0;
        dropZones.forEach(zone => {
            if (zone.firstChild) {
                const piece = zone.firstChild;
                if (piece.dataset.index === zone.dataset.index) {
                    zone.classList.add("correct");
                    correctCount++;
                } else {
                    zone.classList.remove("correct");
                }
            } else {
                zone.classList.remove("correct");
            }
        });
        if (correctCount === dropZones.length) {
            if (Notification.permission === "granted") {
                new Notification("Gratulacje!", { body: "Ułożyłeś mapę poprawnie!" });
            } else {
                alert("Gratulacje! Ułożyłeś mapę poprawnie!");
            }
            console.log("Gratulacje! Ułożyłeś mapę poprawnie!");
        }
    }
});
