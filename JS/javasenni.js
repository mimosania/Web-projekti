const kortit = document.querySelectorAll(".kortti");

let kaannetty = false;
let eka, toka;

function flipkortti() {
    this.classList.toggle('flip');
    if (!kaannetty) {
        kaannetty = true;
        eka = this;
    } else{
        kaannetty = false;
        toka = this;

        if (eka.dataset.framework === 
            toka.dataset.framework) {
            eka.removeEventListener("click", flipkortti);
            toka.removeEventListener("click", flipkortti);
        } else {
            setTimeout(()=> {
            eka.classList.remove("flip");
            toka.classList.remove("flip");
            }, 1500);


        }
    }
}

kortit.forEach(kortti => kortti.addEventListener('click', flipkortti));