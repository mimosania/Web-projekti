let draggedPlanet = null;

// Make each planet draggable
let planets = document.querySelectorAll('#planets img');
planets.forEach(planet => {
    planet.addEventListener('dragstart', event => {
        draggedPlanet = event.target;
    });
});

// Handle drop zones
let dropSlots = document.querySelectorAll('.drop-slot');
dropSlots.forEach(slot => {
    slot.addEventListener('dragover', event => {
        event.preventDefault(); // Allow drop
    });

    slot.addEventListener('drop', function () {
        if (draggedPlanet) {
            // Move existing planet in slot back to container
            if (this.firstChild) {
                document.getElementById('planets').appendChild(this.firstChild);
            }

            // Drop new planet in slot
            this.appendChild(draggedPlanet);
            draggedPlanet = null;
        }
    });
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
    let container = document.getElementById('planets');

    dropSlots.forEach(slot => {
        if (slot.firstChild) {
            container.appendChild(slot.firstChild);
        }
        slot.style.borderColor = 'white'; // Reset border color
    });

    document.getElementById('score').textContent = ''; // Clear score
});

// Check button
document.getElementById('checkBtn').addEventListener('click', () => {
    let score = 0;

    dropSlots.forEach(slot => {
        const planet = slot.firstChild?.id;

        if (planet === slot.dataset.planet) {
            slot.style.borderColor = 'limegreen';
            score++;
        } else {
            slot.style.borderColor = 'red';
        }
    });

    let pisteet = `Pisteet: ${score} / 8`;
    document.getElementById('score').textContent = pisteet;
    sessionStorage.setItem('planeettapeli', score);
});
