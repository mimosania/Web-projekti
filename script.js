let n1 = Math.floor(Math.random() * 10);
let n2 = Math.floor(Math.random() * 10);

document.getElementById("numero1").textContent=n1;
document.getElementById("numero2").textContent=n2;

function tarkistavastaus() {
    let käyttäjänVastaus = Number(document.getElementById("vastaus").value);
    let oikeaVastaus = n1 + n2;
    
}