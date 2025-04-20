let draggedPlanet = null;

// Make each planet draggable
let planets = document.querySelectorAll('#planets img');
planets.forEach(planet => {
    planet.addEventListener('dragstart', function(event) {
        draggedPlanet = event.target;
    });
});

// Handle drop zones
let dropSlots = document.querySelectorAll('.drop-slot');
dropSlots.forEach(slot => {
    slot.addEventListener('dragover', function(event) {
        event.preventDefault(); // Allow drop
    });

    slot.addEventListener('drop', function(event) {
        if (draggedPlanet !== null) {
            // Return existing planet in slot (if any) back to container
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
document.getElementById('resetBtn').addEventListener('click', function() {
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
document.getElementById('checkBtn').addEventListener('click', function() {
    let score = 0;

    dropSlots.forEach(slot => {
        const planet = slot.firstChild?.id;

        if (planet === slot.dataset.planet) {
            slot.style.borderColor = 'limegreen';
            score += 1;
        } else {
            slot.style.borderColor = 'red';
        }
    });

    document.getElementById('score').textContent = `Pisteet: ${score} / 8`;
});
