const kortit = document.querySelectorAll(".kortti");

let kaannetty = false;
let lockBoard = false;
let eka, toka;

function flipkortti() {
    if(lockBoard) return;
    if (this === eka) return;

    this.classList.toggle('flip');
    if (!kaannetty) {
        kaannetty = true;
        eka = this;
    } else{
        kaannetty = false;
        toka = this;
        
        pari();


    }
    function pari(){
        if (eka.dataset.framework === 
            toka.dataset.framework) {
                poispaalta();

        } else {
            takaisin();

        }

    }
}

function poispaalta(){
    eka.removeEventListener("click", flipkortti);
    toka.removeEventListener("click", flipkortti);
    resetBoard();

}

function takaisin(){
    lockBoard = true;
    setTimeout(()=> {
        eka.classList.remove("flip");
        toka.classList.remove("flip");

        lockBoard = false;
        resetBoard();
        }, 1500);
}

function resetBoard(){
[kaannetty, lockBoard] = [false, false];
[eka, toka] = [ null, null];
}

kortit.forEach(kortti => kortti.addEventListener('click', flipkortti));