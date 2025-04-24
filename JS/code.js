const visailu = document.querySelector('#visailu');
let Planeettavisailu = Number(sessionStorage.getItem('Planeettavisailu'));
visailu.innerHTML = Planeettavisailu + "/8";

const tahtikuvio = document.querySelector('#tahtikuvio');
let palapeli = Number(sessionStorage.getItem('palapeli'));
tahtikuvio.innerHTML = palapeli + "/3";

const matematiikka = document.querySelector('#matematiikka');
let matikkapeli = Number(sessionStorage.getItem('matikkapeli'));
matematiikka.innerHTML = matikkapeli;

const asteroidit = document.querySelector('#asteroidit');
let finalScore = Number(sessionStorage.getItem('finalScore'));
asteroidit.innerHTML = finalScore;

const muisti = document.querySelector('#muisti');
let muistipeli = Number(sessionStorage.getItem('muistipeli'));
muisti.innerHTML = muistipeli;