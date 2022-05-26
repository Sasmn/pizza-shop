/* Kezdőlap képének mozgatása egérmozgásra */

const headerImage = document.querySelector(".title-background");
const start = document.querySelector(".start");

start.addEventListener('mousemove', (e) => {
    var x = e.pageX;
    var y = e.pageY;

    headerImage.style.transition = "0.1s";
    headerImage.style.transform = "rotateY(" + (x - window.innerWidth / 2) / 4500 + "deg) rotateX(" + (start.clientHeight / 2 - y) / 1500 + "deg)";
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

/* SHADOW-k mozgatása */

const body = document.querySelector("body");
const hirek2 = document.querySelectorAll(".pirosSzurke .szoveg")

if (window.innerWidth >= 768) {
    body.addEventListener('mousemove', (e) => {
        hirek2.forEach(hir => {
            var x = (e.clientX - hir.getBoundingClientRect().left - hir.clientWidth / 2) / 1500;
            var y = (e.clientY - hir.getBoundingClientRect().top - hir.clientHeight / 2) / 750;


            hir.style.boxShadow = `${x}vw ${y}vh rgb(95, 95, 89)`
        });
    })
}

/* OLDAL ELEI BILLENTYŰZET SZERŰ "ANIMÁCIÓ" */

const szoveg = document.getElementById("szoveg");
const jobbBorder = document.getElementById("jobbBorder");

const szovegek = ["Üdvözlünk a Figuratiban!", "Egy pizzázó mind felett.", "Rendelj tőlünk még ma!", "tel: 5-22-22-22"]


console.log(szovegek.length)

window.addEventListener('load', function () {
    var i = 0;
    var s = 0;

    var gepel = false;
    var kurzorBe = 0;

    szovegKurzorVillog();
    kiiro();

    function kiiro() {
        gepel = true;
        var t = Math.random() * 100 + 80;
        // t = 120;

        setTimeout(() => {
            szoveg.innerHTML += szovegek[s].charAt(i);
            i++

            if (i < szovegek[s].length) {
                kiiro();
            }
            else if (s < szovegek.length - 1) {
                gepel = false;
                szovegKurzorVillog();

                setTimeout(() => {
                    torlo();
                }, 4000);
            }
            else {
                gepel = false;
                szovegKurzorVillog();
            }
        }, t);

    }

    function torlo() {
        gepel = true;
        setTimeout(function () {
            // console.log(szoveg.innerHTML.slice(0, -1))
            szoveg.innerHTML = szoveg.innerHTML.slice(0, -1);
            i--;
            if (i > 0) {
                torlo();
            }
            else {
                s++;
                kiiro();
            }
        }, 60);
    }


    function szovegKurzorVillog() {

        setTimeout(() => {
            if (kurzorBe % 2 == 1) {
                jobbBorder.style.borderRight = "0.4vmax solid var(--hatter)"
            }
            else {
                jobbBorder.style.borderRight = "0.4vmax solid rgba(88, 88, 88, 0.498)";
            }
            kurzorBe++;

            if (gepel == false) {
                szovegKurzorVillog();
            }
            else {
                jobbBorder.style.borderRight = "0.4vmax solid rgba(88, 88, 88, 0.498)";
            }

        }, 800);
    }
})


/* AJÁNLATOK váltása */

const balra = document.getElementById("balra");
const jobbra = document.getElementById("jobbra");
const ajanlatok = document.getElementById("ajanlatokSlides")
const ajanlatok2 = document.querySelectorAll("ajanlatokSlides div")

console.log(ajanlatok2[1])

let x = 0;
var ajanlatValto;

window.addEventListener('load', () => {
    automatikusMozgatas();
})

jobbra.addEventListener('click', () => {
    x++;
    if (x > 3) { x = 1 };

    clearInterval(ajanlatValto);
    ajanlatokMozgatas(x);

    automatikusMozgatas();
})

balra.addEventListener('click', () => {
    x--;
    if (x < 1) { x = 3 };

    clearInterval(ajanlatValto);
    ajanlatokMozgatas(x);

    automatikusMozgatas();
})

function automatikusMozgatas() {
    ajanlatValto = setInterval(function () {
        x++;
        if (x > 3) { x = 1 };

        ajanlatokMozgatas(x);
    }, 6000)
}

function ajanlatokMozgatas(x) {
    ajanlatok.style.transform = "scale(0.95)"

    switch (x) {
        case 1:
            ajanlatok.style.left = "-100%";
            break;
        case 2:
            ajanlatok.style.left = "-200%";
            break;
        default:
            ajanlatok.style.left = "0";
            break;
    }
    setTimeout(
        function () {
            ajanlatok.style.transform = "scale(1)";
        }, 800)
}

