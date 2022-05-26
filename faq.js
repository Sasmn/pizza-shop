/* Kezdőlap képének mozgatása egérmozgásra */

const headerImage = document.querySelector(".title-background");
const start = document.querySelector(".start");

start.addEventListener('mousemove', (e) => {
    var x = e.pageX;
    var y = e.pageY;

    headerImage.style.transition = "0.1s";
    headerImage.style.transform = "rotateY(" + (x - window.innerWidth / 2) / 4500 + "deg) rotateX(" + (window.innerHeight / 2 - y) / 1500 + "deg)";
})

start.addEventListener('mouseleave', () => {
    headerImage.style.transition = "1s";
    headerImage.style.transform = "none";
})

/* OLDALAK KÖZTI NAVIGÁCIÓS ABLAK MEGJELENÍTÉSE */

const asideButton = document.getElementById("asideButton");
const header = document.querySelector("header");

asideButton.addEventListener('click', function () {
    header.style.top = "-12vmin"
    setTimeout(() => {
        header.style.position = "fixed";
        sitesButton.style.display = "block";
        header.style.top = "0"
    }, 100);
})

const sitesButton = document.getElementById("sitesButton");

sitesButton.addEventListener('click', function () {
    header.style.top = "-12vmin"
    setTimeout(() => {
        header.style.position = "absolute";
        sitesButton.style.display = "none";
        header.style.top = "0"
    }, 100);
})

/* ASIDE színezése */

const mainArticles = document.querySelectorAll("main > *");

const asideLinks = document.querySelectorAll("aside ul a");
const asideLinksLi = document.querySelectorAll("aside ul li");



window.addEventListener('scroll', () => {
    asideSzinezes();
})

function asideSzinezes() {
    for (let i = 0; i < mainArticles.length; i++) {
        const article = mainArticles[i];
        const cim = asideLinks[i];

        if (window.scrollY >= article.offsetTop - 300) {
            asideLinks.forEach(link => {
                link.style.color = "black";
                link.style.fontSize = "min(4vmin, 2.2vmax)";
            });
            cim.style.color = "var(--main-red)";
            cim.style.fontSize = "min(5vmin, 2.5vmax)";
        }
    }
}


/* BETÖLTÉSI ANIMÁCIÓ */

//Az oldal tetejére ugrik újratöltésnél
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


const sections = document.querySelectorAll("section");

sections.forEach(section => {
    section.style.transform = "translateY(70%)";
});


window.addEventListener('scroll', () => {
    becsuszasAnimacio();
})

window.addEventListener('touchmove', () => {
    becsuszasAnimacio();
})

function becsuszasAnimacio() {
    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - window.innerHeight)) {
            section.style.transform = "translateY(0)";
        }
    });
}