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


//Kysymykseen vastaaminen
function answer(event){
    // Estetään lähetä-painikkeen normaali toiminto, eli lomakkeen lähettäminen
    event.preventDefault();

    //Asetetaan vastaa-painike ei-aktiiviseen tilaan (ei voi painaa)
    document.querySelector('#answer').disabled = true;

    let formData = new FormData(form);
    let selection = formData.get('selection');

    //Tarkistetaan onko käyttäjän antama vastaus oikea. Jotta kirjaisimen koko ei vaikuttaisi virheellisesti vastauksen tulkintaan, muutetaan valittu vastaus ja tarkistusvastaus ISOIKSI kirjaimiksi. Vaihtoehtoisesti voisi käyttää myös toLowerCase()
    
    // Jos vastaus on oikein, pistepotti kasvaa yhdellä ja kysymyselementin luokkalistaan lisätään arvo 'correct' (oikein)
    if(selection.toUpperCase() == answers[index].toUpperCase()){
        points++;
        questionElement.classList.add('correct');
    }else{
        // Muussa tapauksessa pistepotti pysyy ennallaan, kysymyselementin luokkalistaan lisätään 'incorrect' (väärin)
        questionElement.classList.add('incorrect');
    }

    // Tuloselementin tekstisisältö päivitetään. Näytetään nykyinen pistesaldo.
    document.querySelector('#result').textContent = 
        'Sinulla on nyt ' + points + '/' + questions.length + ' pistettä';

    document.querySelector('#correctAnswer').textContent = 'Oikea vastaus on: ' + answers[index];

    //Siirrytään seuraavaan kysymykseen, kasvatetaan indexiä yhdellä
    index++;

    //4 sekunnin viive ennen seuraavaa kysymystä
    setTimeout(nextQuestion, 4000);
}


//Asetetaan uusi kysymys näkyviin
function nextQuestion(){
    // Tyhjennetään vastausvaihtoehdot, jotta ne voidaan päivittää uuden kysymyksen mukaisiksi
    optionsDiv.innerHTML = "";
    // Tyhjennetään edellisen kysymyksen oikea vastaus
    document.querySelector('#correctAnswer').textContent = '';

    // Jos index on suurempi tai yhtä suuri kuin kysymysten määrä, kysely on päättynyt
    if(index >= questions.length){
        document.querySelector('#result').textContent = 
            'Peli loppui ja sait yhteensä ' + points + '/' + questions.length + ' pistettä';
        form.classList.add('hidden');
        document.querySelector('#questionImage').src = "./images/planeetat.jpg";
        sessionStorage.setItem('Planeettavisailu', points)
    }else{
        // Siirrytään seuraavaan kysymykseen, index on kasvanut yhdellä.
        questionElement.textContent = questions[index];

        // Käydään läpi options -taulukon kysymystä vastaavan indeksin sisällä olevassa taulukossa olevat vastausvaihtoehdot
        for (let o = 0; o < options[index].length; o++) {
            // Syötetään HTML-koodi valintaruudulle ja sen labelille lomakkeen sisällä olevaan valintavaihtoehtojen diviin.
            optionsDiv.insertAdjacentHTML("afterBegin", '<input type="checkbox" name="selection" id="' + options[index][o] + '" value="' + options[index][o] + '"><label for="' + options[index][o] + '">' + options[index][o] + '</label> <br>');
        }

        // Kysymykseen liittyvän kuvan näyttäminen
        document.querySelector('#questionImage').src = images[index];
        
        // Poistetaan kysymyksestä luokkamäärite onko vastaus ollut oikein vai väärin
        questionElement.classList.remove('correct', 'incorrect');
        // Vaihdetaan vastaus-painikke aktiiviseksi
        document.querySelector('#answer').disabled = false;
    }
    
} 

