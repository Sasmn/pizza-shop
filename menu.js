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
    section.style.transform = "translateY(40%)";
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


/* PIZZA - KOSÁR */

/* a berakás */

const plus = document.querySelectorAll("#pizzaMenu .plusz");
const minus = document.querySelectorAll("#pizzaMenu .minusz");
const db = document.querySelectorAll("#pizzaMenu .db");
const kosarba = document.querySelectorAll("#pizzaMenu .kosarba");


const pizzaArak = ['1590', '1790', '1790', '1890', '1990', '1990', '1790', '1990', '2090', '2090']
const pizzaLeirasok = ['paradicsomszósz, mozzarella', 'paradicsomszósz, szalámi, mozzarella', 'paradicsomszósz, sonka, mozzarella', 'paradicsomszósz, gorgonzola, parmezán, gouda, mozzarella', 'paradicsomszósz, sonka, gomba, kukorica, mozzarella', 'paradicsomszósz, bolognai, ragu, mozzarella', 'paradicsomszósz, sonka, gomba, kukorica, szalámi, mozzarella', 'paradicsomszósz, sonka, rukkola, mozzarella', 'paradicsomszósz, kolbász, hagyma, erős, pista, mozzarella', 'paradicsomszósz, prosciutto cotto, bazsalikom, mozzarella']
const pizzaNevek = ['margherita', 'szalámis', 'sonkás', 'négysajtos', 'songoku', 'bolognai', 'négy évszak', 'rukkolás', 'magyaros', 'olasz'];

let kosarban = [];
let kosarDB = [];


const pizzaImage = document.querySelectorAll("#pizzaMenu .indexImage");
const nev = document.querySelectorAll('#pizzaMenu .description h3')
const leiras = document.querySelectorAll("#pizzaMenu .description h4");
const ar = document.querySelectorAll("#pizzaMenu .description .ár");

const kosarTartalma = document.getElementById("kosarTartalma");
const udito = document.getElementById("udito");
const vegosszeg = document.getElementById("vegosszeg");

let sum = 0;

for (let i = 0; i < plus.length; i++) {
    var img = document.createElement("img");
    img.src = `images/pizza${i + 1}.png`;
    pizzaImage[i].appendChild(img);

    nev[i].innerHTML = pizzaNevek[i];
    leiras[i].innerHTML = pizzaLeirasok[i];
    ar[i].innerHTML = pizzaArak[i] + " ft";

    plus[i].addEventListener('click', function () {
        if (db[i].value < 9) {
            db[i].value++;
        }
    })

    minus[i].addEventListener('click', function () {
        if (db[i].value > 1) {
            db[i].value--;
        }
    })

    kosarba[i].addEventListener('click', function () {
        kosarDB[i] = db[i].value;

        kosarTartalma.replaceChildren();

        let count = 0;
        sum = 0;

        for (let i = 0; i < kosarDB.length; i++) {
            if (!isNaN(kosarDB[i])) {
                const section = document.createElement("section");
                const kosarImage = document.createElement("div");
                kosarImage.classList.add("kosarImage");
                const img = document.createElement("img");
                img.src = `images/pizza${i + 1}.png`;
                kosarImage.appendChild(img);
                section.appendChild(kosarImage);

                const kosarAdatok = document.createElement("div");
                kosarAdatok.classList.add("kosarAdatok");
                const nev = document.createElement("p");
                nev.classList.add("nev");
                nev.innerHTML = pizzaNevek[i];
                const dbAr = document.createElement("p");
                dbAr.classList.add("dbAr");
                dbAr.innerHTML = `${kosarDB[i]} * ${pizzaArak[i]} ft`
                kosarAdatok.append(nev, dbAr);
                section.appendChild(kosarAdatok);

                kosarTartalma.appendChild(section)


                sum += kosarDB[i] * pizzaArak[i];
                count += kosarDB[i];

                if (kuponBe == true) {
                    akciosAr = sum * 0.95;
                    vegosszeg.innerHTML = `Vásárlás összege: ${akciosAr} ft`
                }
                else {
                    vegosszeg.innerHTML = `Vásárlás összege: ${sum} ft`
                }

                if (count >= 2) {
                    udito.style.display = "flex";
                }
                else {
                    udito.style.display = "none";
                }
            }
        }
    })
}

window.addEventListener('load', function () {
    for (let j = 0; j < plus.length; j++) {
        db[j].value = "1";
    }
})


/* KUPONKÓD */

const kupon = document.getElementById("kupon");
const bevaltas = document.querySelector("form button");
let kuponBe = false;
let akciosAr = 0;

bevaltas.addEventListener('click', function () {
    if (kupon.value == "figurati5" && kuponBe == false) {

        akciosAr = sum * 0.95;
        vegosszeg.innerHTML = `Vásárlás összege: ${akciosAr} ft`;
        kuponBe = true;
    }
    else if (kupon.value == "figurati5") {
        
    }
    else {
        kupon.value = "nem érvényes"
    }
});


/* FORM validálás */

$(document).ready(function () {
    $("#myForm").validate({
        rules: {
            nev: "required",
            telefonszam: {
                pattern: /^(\+36|06)-[0-9]{2}-[0-9]{3}-[0-9]{4}/,
                required: true
            },
            email: {
                required: true,
                email: true
            },
            jelszo: {
                required: true,
                minlenght: 6
            },
            jelszo2: {
                required: true,
                minlenght: 6,
                equalTo: "#jelszo"
            },
            cim: {
                required: true
            }
        },
        messages: {
            nev: "Kötelező név megadása!",
            telefonszam: {
                pattern: "Helyes formátum: +36-12-123-1234",
                required: "Írd be a telefonszámod!",
            },
            email: {
                required: "Kötelező e-mail cím megadása!",
                email: "Nem jó a formátum!"
            },
            jelszo: {
                required: "Kötelező jelszót megadni!",
                minlenght: "Legalább 6 karakter!"
            },
            jelszo2: {
                required: "Kötelező mező!",
                equalTo: "Nem egyezik!"
            },
            cim: {
                required: "Kötelező cím megadása!"
            }
        },

    });
});