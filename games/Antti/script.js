let n1, n2;
function Uusilasku(){
 n1 = Math.floor(Math.random() * 10);
 n2 = Math.floor(Math.random() * 10);

document.getElementById("numero1").textContent=n1;
document.getElementById("numero2").textContent=n2;

document.getElementById("vastaus").value = "";
document.getElementById("tulos").textContent = "";
}
function tarkistaVastaus() {
    let käyttäjänVastaus = Number(document.getElementById("vastaus").value);
    let oikeaVastaus = n1 + n2;

    if (käyttäjänVastaus === oikeaVastaus) {
        document.getElementById("tulos").textContent = "jippii hurraa oikein";

        setTimeout(() => {
            Uusilasku();
        }, 1500);
    } else {
        document.getElementById("tulos").textContent = "väärin :("
    }
}


Uusilasku();