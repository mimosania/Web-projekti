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

const planeetat = document.querySelector('#planeetat');
let planeettapeli = Number(sessionStorage.getItem('planeettapeli'));
planeetat.innerHTML = planeettapeli + "/8";

function restart(){
    sessionStorage.setItem('palapeli', 0)
    sessionStorage.setItem('matikkapeli', 0)
    sessionStorage.setItem('Planeettavisailu', 0)
    sessionStorage.setItem('finalScore', 0)
    sessionStorage.setItem('muistipeli', 0)
    sessionStorage.setItem('planeettapeli', 0)
    location.reload();
}
