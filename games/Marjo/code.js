let questions = ['1. Aurinkoa kiertää:', '2. Ainoa planeetta, jolla tiedetään varmuudella elävän kasveja ja eläimiä?', '3. Suurinta osaa Maan pinnasta peittää', '4. Aurinkoa kiertäviä planeettoja on yhteensä', '5. Suurin planeetta on', '6. Aurinkokuntamme pienin ja lähinnä aurinkoa oleva planeetta on', '7. Kuinka monta vuorokautta Maan kiertoaika auringon ympäri on?', '8. Kuinka monta kuuta Maalla on?'];
let options = [['kivet', 'planeetat', 'tähdet'], ['Maa', 'Pluto', 'Venus'], ['ruoho', 'vesi','hiekka'], ['6', '7','8'], ['Jupiter', 'Merkurius', 'Mars'], ['Jupiter','Mars','Merkurius'],['365', '400', '325'],['2','1','3']]
let answers = ['planeetat', 'Maa', 'Vesi', '8', 'Jupiter', 'Merkurius','365', '1'];
let images = ['images/kiviplaneetat.jpg', 'images/planeetat.jpg', 'images/maa.jpg', 'images/planeetat2.jpg', 'images/jupiter.jpg', 'images/planeetatjaaurinko.jpg', 'images/planeetat2.jpg', 'images/aurinkojaplaneetat.jpg'];
let index = 0;
let points = 0;

//Haetaan lomake, vaihtoehdot sisältävä div lomakkeen sisällä, kysymyselementti ja asetetaan ensimmäinen kysymys
let form = document.getElementById('questionform');
const optionsDiv = document.querySelector('#questionOptions');
form.addEventListener('submit', answer);

let questionElement = document.getElementById('question');
nextQuestion();


// Kysymykseen vastaaminen. 
// Estetään lähetä-painikkeen normaali toiminto, eli lomakkeen lähettäminen. 
// Asetetaan vastaa-painike ei-aktiiviseen tilaan (ei voi painaa)
function answer(event){
    event.preventDefault();  
    document.querySelector('#answer').disabled = true;

    let formData = new FormData(form);
    let selection = formData.get('selection');

//Tarkistetaan onko käyttäjän antama vastaus oikea. 
// Jos vastaus on oikein, pistepotti kasvaa yhdellä ja kysymyselementin luokkalistaan lisätään arvo 'correct' (oikein)
// Muussa tapauksessa pistepotti pysyy ennallaan, kysymyselementin luokkalistaan lisätään 'incorrect' (väärin)
    
    if(selection.toUpperCase() == answers[index].toUpperCase()){
        points++;
        questionElement.classList.add('correct');
    }else{   
        questionElement.classList.add('incorrect');
    }

// Tuloselementin tekstisisältö päivitetään. Näytetään nykyinen pistesaldo.
// Siirrytään seuraavaan kysymykseen, kasvatetaan indexiä yhdellä

    document.querySelector('#result').textContent = 
        'Sinulla on nyt ' + points + '/' + questions.length + ' pistettä';

    document.querySelector('#correctAnswer').textContent = 'Oikea vastaus on: ' + answers[index];
    index++;

//3 sekunnin viive ennen seuraavaa kysymystä
    setTimeout(nextQuestion, 3000);
}


// Asetetaan uusi kysymys näkyviin
// Tyhjennetään vastausvaihtoehdot, jotta ne voidaan päivittää uuden kysymyksen mukaisiksi
// Tyhjennetään edellisen kysymyksen oikea vastaus
// Jos index on suurempi tai yhtä suuri kuin kysymysten määrä, kysely on päättynyt, muutoin siirrytään seuraavaan kysymykseen, index on kasvanut yhdellä.

function nextQuestion(){ 
    optionsDiv.innerHTML = "";    
    document.querySelector('#correctAnswer').textContent = '';
    
    if(index >= questions.length){
        document.querySelector('#result').textContent = 
            'Peli loppui ja sait yhteensä ' + points + '/' + questions.length + ' pistettä';
        form.classList.add('hidden');
        document.querySelector('#questionImage').src = "./images/aurinkokunta.jpg";
        sessionStorage.setItem('Planeettavisailu', points)
    }else{
        questionElement.textContent = questions[index];

// Käydään läpi options -taulukon kysymystä vastaavan indeksin sisällä olevassa taulukossa olevat vastausvaihtoehdot
// Syötetään HTML-koodi valintaruudulle ja sen labelille lomakkeen sisällä olevaan valintavaihtoehtojen diviin.

        for (let o = 0; o < options[index].length; o++) {    
            optionsDiv.insertAdjacentHTML("afterBegin", '<input type="checkbox" name="selection" id="' + options[index][o] + '" value="' + options[index][o] + '"><label for="' + options[index][o] + '">' + options[index][o] + '</label> <br>');
        }

// Kysymykseen liittyvän kuvan näyttäminen
// Poistetaan kysymyksestä luokkamäärite onko vastaus ollut oikein vai väärin
// Vaihdetaan vastaus-painikke aktiiviseksi
        document.querySelector('#questionImage').src = images[index];
        
        questionElement.classList.remove('correct', 'incorrect');
        
        document.querySelector('#answer').disabled = false;
    }
    
} 

//Koodipohjan lähteenä käytetty opettajan materiaalia "Visailuesimerkki".

