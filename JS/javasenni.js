const kortit = document.querySelectorAll('.kortit');

function flipKortti() {
    this.classList.toggle('flip');
}

kortit.forEach(kortti => kortti.addEventListener('click', flipKortti));