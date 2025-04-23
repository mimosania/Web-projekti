let palapelipisteet = Number(sessionStorage.getItem('palapeli'));
let pointElem = document.getElementById('points');
pointElem.textContent = 'Palapelin pisteet: ' + palapelipisteet