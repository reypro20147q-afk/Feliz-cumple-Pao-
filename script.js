/* =========================================
   ELEMENTOS
========================================= */

const inicio = document.getElementById("inicio");
const carta = document.getElementById("carta");
const final = document.getElementById("final");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const envelope = document.getElementById("envelope");
const letterText = document.getElementById("letterText");

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

const openText = document.getElementById("openText");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");


/* =========================================
   CARTA
========================================= */

const message = `
**Querida Paola 💖**

Hoy es un día especial porque celebramos tu cumpleaños, y no quería dejar pasar la oportunidad de escribirte unas palabras.

Espero que este nuevo año de vida venga lleno de momentos increíbles, muchas sonrisas, nuevas aventuras y personas que sepan valorar lo maravillosa que eres. ✨

Quiero agradecerte por todos esos momentos, por las risas, las conversaciones y por cada recuerdo que hemos ido creando. A veces no hace falta conocer a alguien durante toda una vida para darse cuenta de lo especial que puede llegar a ser una persona.

Deseo de corazón que todos esos sueños que tienes poco a poco se hagan realidad, que nunca te falten motivos para sonreír y que, incluso en los días difíciles, recuerdes lo mucho que vales. 🌷

Hoy disfruta muchísimo, ríe, celebra, come algo rico, recibe muchos abrazos y deja que te consientan porque te lo mereces. 🥳🎂

**¡Feliz cumpleaños, Paola! 🎉💖**

Que este nuevo año de tu vida sea todavía más bonito que el anterior y que esté lleno de historias que algún día podamos recordar con una sonrisa.

Gracias por ser tú y por ser una persona tan especial.

**Con mucho cariño,
Santiago ❤️**

`;


/* =========================================
   BOTÓN INICIAL
========================================= */

startBtn.addEventListener("click", () => {

    inicio.classList.add("hidden");

    setTimeout(() => {

        carta.classList.remove("hidden");

    }, 700);

    music.play()
        .then(() => {

            musicBtn.textContent = "🔊";

        })
        .catch(() => {

            console.log("La música necesita interacción.");

        });

});


/* =========================================
   ABRIR SOBRE
========================================= */

let opened = false;

envelope.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    envelope.classList.add("open");

    openText.style.opacity = "0";

    setTimeout(() => {

        typeWriter();

    }, 1000);

});


/* =========================================
   EFECTO ESCRITURA
========================================= */

function typeWriter() {

    let i = 0;

    letterText.innerHTML = "";

    function write() {

        if (i < message.length) {

            if (message[i] === "\n") {

                letterText.innerHTML += "<br>";

            } else {

                letterText.innerHTML += message[i];

            }

            i++;

            setTimeout(write, 28);

        } else {

            setTimeout(() => {

                createExplosion();

            }, 700);

            setTimeout(() => {

                carta.classList.add("hidden");

                setTimeout(() => {

                    final.classList.remove("hidden");

                }, 800);

            }, 2500);

        }

    }

    write();

}


/* =========================================
   MUSICA
========================================= */

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.textContent = "🔊";

    } else {

        music.pause();

        musicBtn.textContent = "🎵";

    }

});


/* =========================================
   CORAZONES FLOTANTES
========================================= */

function createFloatingHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.textContent =
        Math.random() > .5 ? "❤️" : "💖";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 30) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 7) + "s";

    document.querySelector(".hearts")
        .appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 12000);

}

setInterval(createFloatingHeart, 500);


/* =========================================
   CANVAS
========================================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   PARTICULAS
========================================= */

let particles = [];

function createExplosion() {

    for (let i = 0; i < 150; i++) {

        particles.push({

            x: window.innerWidth / 2,

            y: window.innerHeight / 2,

            vx:
                (Math.random() - .5) * 10,

            vy:
                (Math.random() - .5) * 10,

            size:
                Math.random() * 4 + 1,

            life: 100

        });

    }

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((p, index) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vy += .04;

        p.life--;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,120,200," +
            p.life / 100 +
            ")";

        ctx.fill();

        if (p.life <= 0) {

            particles.splice(index, 1);

        }

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================================
   REINICIAR
========================================= */

restartBtn.addEventListener("click", () => {

    final.classList.add("hidden");

    setTimeout(() => {

        inicio.classList.remove("hidden");

    }, 700);

    envelope.classList.remove("open");

    letterText.innerHTML = "";

    opened = false;

});


/* =========================================
   MENSAJE CONSOLA
========================================= */

console.log(
    "✨ Carta para Paola cargada correctamente 💖"
);