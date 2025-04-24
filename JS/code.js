const visailu = document.querySelector('#visailu');
let Planeettavisailu = Number(sessionStorage.getItem('Planeettavisailu'));
visailu.innerHTML = Planeettavisailu + "/8";

const tahtikuvio = document.querySelector('#tahtikuvio');
let palapeli = Number(sessionStorage.getItem('palapeli'));
tahtikuvio.innerHTML = palapeli + "/3";