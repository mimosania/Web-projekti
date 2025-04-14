const kortit = document.querySelectorAll('.kortti');

function flipkortti() {
    this.classList.toggle('flip');
}

kortit.forEach(kortti => kortti.addEventListener('click', flipkortti));