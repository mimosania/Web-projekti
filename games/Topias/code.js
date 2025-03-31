let draggedPlanet = null;

// Make each planet draggable
let planets = document.querySelectorAll('#planets img');
for (let i = 0; i < planets.length; i++) {
    planets[i].addEventListener('dragstart', function(event) {
        draggedPlanet = event.target;
    });
}

// Handle drop slots
let dropSlots = document.querySelectorAll('.drop-slot');
for (let j = 0; j < dropSlots.length; j++) {
    dropSlots[j].addEventListener('dragover', function(event) {
        event.preventDefault(); // This allows the drop
    });

    dropSlots[j].addEventListener('drop', function(event) {
        if (draggedPlanet !== null) {
            // If slot already has a planet, send it back
            if (this.firstChild) {
                let planetContainer = document.getElementById('planets');
                planetContainer.appendChild(this.firstChild);
            }

            // Drop the dragged planet into the slot
            this.appendChild(draggedPlanet);
            draggedPlanet = null;
        }
    });
}
