let n1, n2;
let pisteet = 0;
let aika = 30;
let ajastin;
let pelikaynissa = true;

function aloitaPeli() {
    pisteet = 0;
    aika = 30;
    pelikaynissa = true;
    document.getElementById("pisteet").textContent = pisteet;
    document.getElementById("aika").textContent = aika;
    document.getElementById("tulos").textContent = "";
    Uusilasku();
    kaynnistaajastin();
}

function Uusilasku(){
    if (!pelikaynissa) return;
    n1 = Math.floor(Math.random() * 10);
    n2 = Math.floor(Math.random() * 10);

    document.getElementById("numero1").textContent = n1;
    document.getElementById("numero2").textContent = n2;

    document.getElementById("vastaus").value = "";
    document.getElementById("tulos").textContent = "";
}

function tarkistaVastaus() {
    if (!pelikaynissa) return;
    let käyttäjänVastaus = Number(document.getElementById("vastaus").value);
    let oikeaVastaus = n1 + n2;

    if (käyttäjänVastaus === oikeaVastaus) {
        document.getElementById("tulos").textContent = "jippii hurraa oikein";
        pisteet++;
        document.getElementById("pisteet").textContent = pisteet;

        setTimeout(() => {
            Uusilasku();
        }, 500);
    } else {
        document.getElementById("tulos").textContent = "väärin :(";
    }
}

function kaynnistaajastin() {
    ajastin = setInterval(() => {
        aika--;
        document.getElementById("aika").textContent = aika;

        if (aika <= 0) {
            clearInterval(ajastin);
            pelikaynissa = false;
            document.getElementById("tulos").textContent = "Peli ohi!";
        }
    }, 1000);
}
