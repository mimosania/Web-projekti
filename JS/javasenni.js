const kortit = document.querySelectorAll(".kortti");

let kaannetty = false;
let lockBoard = false;
let eka, toka;
let pisteet = 0;

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
        
        tarkistus();
            if (!eka){
                eka = this;
                return;
            }


    }
    function tarkistus(){
        if (eka.dataset.framework === 
            toka.dataset.framework) {  
                pisteet++;
                document.querySelector(".pisteet").textContent = pisteet;
                lockBoard = true;
                sessionStorage.setItem('muistipeli', pisteet.toString());
                poispaalta();
        } else {
            takaisin();

        }


    }
}

function poispaalta(){
    if (eka != null){
        eka.removeEventListener("click", flipkortti);
        toka.removeEventListener("click", flipkortti);
        resetBoard();
    }

}

function takaisin(){
    if (eka != null){
     lockBoard = true;
     setTimeout(()=> {
         eka.classList.remove("flip");
            toka.classList.remove("flip");

            lockBoard = false;
            resetBoard();
            }, 1000);
    }
}

function resetBoard(){
    [kaannetty, lockBoard] = [false, false];
    [eka, toka] = [ null, null];
}

(function sekoitus(){
    kortit.forEach(kortti=>{
        let randomPos = Math.floor(Math.random()*12);
        kortti.style.order = randomPos;
    });
})();



kortit.forEach(kortti => kortti.addEventListener('click', flipkortti));

function restart(){
    location.reload();
}
