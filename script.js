document.addEventListener("DOMContentLoaded", () => {

    // SCROLL REVEAL
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("ativo");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    reveals.forEach(el => observer.observe(el));

    // LIGHTBOX
    const fotos = document.querySelectorAll(".foto img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox.querySelector("img");

    fotos.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    const fotosHero = document.querySelectorAll('.hero-foto');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        fotosHero.forEach((foto, i) => {
            foto.style.transform = `translateY(${y * (i === 0 ? 0.05 : 0.03)}px) rotate(${i === 0 ? -3 : 3}deg)`;
        });
    });

});
