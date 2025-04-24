const visailu = document.querySelector('#visailu');
let Planeettavisailu = Number(sessionStorage.getItem('Planeettavisailu'));
visailu.innerHTML = Planeettavisailu;

let palapelipisteet = Number(sessionStorage.getItem('palapeli'));


let pointElem = document.getElementById('points');
pointElem.textContent = 'Palapelin pisteet: ' + palapelipisteet;
