document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');
    const puzzleContainer = document.getElementById('puzzle');
    let userLocation = null;

    // Inicjalizacja mapy Leaflet
    const map = L.map(mapContainer).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Pobieranie lokalizacji użytkownika
    document.getElementById('locate').addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                userLocation = { lat: latitude, lng: longitude };
                map.setView([latitude, longitude], 13);
                L.marker([latitude, longitude]).addTo(map).bindPopup('Twoja lokalizacja').openPopup();
            },
            (error) => alert('Nie można pobrać lokalizacji.'),
        );
    });

    Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
            alert('Brak zgody na powiadomienia.');
        }
    });

    document.getElementById('download-map').addEventListener('click', () => {
        html2canvas(mapContainer).then((canvas) => {
            const image = canvas.toDataURL();
            generatePuzzle(image);
        });
    });

    function generatePuzzle(imageSrc) {
        puzzleContainer.innerHTML = '';
        const pieces = [];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url(${imageSrc})`;
                piece.style.backgroundPosition = `-${col * 150}px -${row * 150}px`;
                piece.dataset.correctPosition = `${row}-${col}`;
                piece.style.left = `${Math.random() * 400}px`;
                piece.style.top = `${Math.random() * 400}px`;

                piece.draggable = true;

                piece.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', piece.dataset.correctPosition);
                });

                pieces.push(piece);
            }
        }

        shuffleArray(pieces).forEach(piece => puzzleContainer.appendChild(piece));
    }

    function verifyPuzzle() {
        const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
        const isCorrect = pieces.every(piece => {
            const rect = piece.getBoundingClientRect();
            const correctPosition = piece.dataset.correctPosition.split('-');
            const correctX = correctPosition[1] * 150;
            const correctY = correctPosition[0] * 150;

            return (
                Math.abs(rect.left - correctX) < 10 &&
                Math.abs(rect.top - correctY) < 10
            );
        });

        if (isCorrect) {
            new Notification('Gratulacje!', {
                body: 'Ułożyłeś układankę!',
            });
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
