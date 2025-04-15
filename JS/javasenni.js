const kortit = document.querySelectorAll(".kortti");

let kaannetty = false;
let eka, toka;
function flipkortti() {
    this.classList.toggle('flip');
    if (!kaannetty){
        kaannetty=true;
        kaannetty = this;
        console.log({kaannetty, eka});
    }
}

kortit.forEach(kortti => kortti.addEventListener('click', flipkortti));