function verificarSenha(){
    const senhaDigitada = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    // HASH da senha correta (SHA-256)
    const hashCorreto = "2247e5220afca9ea353825b35cac99f04b381def839681e1962be220dfc3243e";

    const hashDigitado = sha256(senhaDigitada);

    if(hashDigitado === hashCorreto){
        document.getElementById("lock").style.display = "none";
        document.getElementById("site").style.display = "block";
        erro.innerText = "";
    }else{
        erro.innerText = "Senha incorreta";
    }
}


// LIGHTBOX
document.querySelectorAll(".foto img").forEach(img=>{
    img.addEventListener("click",()=>{
        document.querySelector(".lightbox img").src = img.src;
        document.querySelector(".lightbox").style.display="flex";
    });
});

document.querySelector(".lightbox").addEventListener("click",()=>{
    document.querySelector(".lightbox").style.display="none";
});

const capa = document.getElementById('livroCapa');
const autora = document.querySelector('.autora-premium');

let estado = 'capa'; // capa | album | autora
let bloqueio = false;

function bloquearScroll(){
    document.body.style.overflowY = 'hidden';
}

function liberarScroll(){
    document.body.style.overflowY = 'auto';
}

bloquearScroll();

/* SCROLL PRINCIPAL */
window.addEventListener('wheel', (e) => {

    if(bloqueio) return;

    /* ↓ VIRA CAPA */
    if(estado === 'capa' && e.deltaY > 0){
        bloqueio = true;
        capa.classList.add('fechar');

        setTimeout(() => {
            capa.style.display = 'none';
            liberarScroll();
            estado = 'album';
            bloqueio = false;
        }, 1200);
    }

    /* ↑ VOLTA CAPA */
    if(estado === 'album' && e.deltaY < 0 && window.scrollY === 0){
        bloqueio = true;
        capa.style.display = 'flex';
        capa.classList.remove('fechar');

        bloquearScroll();

        setTimeout(() => {
            estado = 'capa';
            bloqueio = false;
        }, 100);
    }
});

/* ======================
   TETRIS SCROLL EFFECT
   ====================== */

const fotos = document.querySelectorAll('.foto');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {

            // delay tipo Tetris
            entry.target.style.transitionDelay = `${index * 70}ms`;

            entry.target.classList.add('aparecer');
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

fotos.forEach(foto => observer.observe(foto));


/* DETECTA SEÇÃO AUTORA */
window.addEventListener('scroll', () => {

    if(!autora) return;

    const topoAutora = autora.getBoundingClientRect().top;

    if(topoAutora < window.innerHeight * 0.4){
        estado = 'autora';
    }

    if(estado === 'autora' && topoAutora > window.innerHeight * 0.8){
        estado = 'album';
    }
});

/* ATIVA BRILHO */
window.addEventListener('load', () => {
    capa.classList.add('ativo');
});

