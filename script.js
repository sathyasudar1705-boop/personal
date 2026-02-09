// Section Navigation
function goToSection(sectionId) {
    const currentSection = document.querySelector('section.active');
    const nextSection = document.getElementById(sectionId);

    if (currentSection) currentSection.classList.remove('active');
    if (nextSection) {
        nextSection.classList.add('active');

        // Trigger specific section logic
        if (sectionId === 'bug-fixer') triggerTypewriter('bug-fixer h2');
        if (sectionId === 'why-you') triggerReasons();
        if (sectionId === 'final') triggerFinalLetter();
        if (sectionId === 'success') triggerFireworks();
    }
}

// Background Twinkling Stars
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(star);
    }
}

// Typewriter Effect
function typeWriter(element, text, speed = 50, callback) {
    let i = 0;
    element.innerHTML = '';

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

function triggerTypewriter(selector) {
    const el = document.querySelector(`#${selector}`);
    if (el) {
        const text = el.getAttribute('data-text');
        typeWriter(el, text);
    }
}

// Opening Logic
const startBtn = document.getElementById('start-btn');
const openingTag = document.getElementById('opening-text');

window.onload = () => {
    createStars();
    typeWriter(openingTag, "Hey Indhu... I built something special for you.", 70);

    // Initialize Particles for code-like background (will update in more detail later)
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "opacity": { "value": 0.1, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1 }
        }
    });
};

startBtn.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    music.play().catch(e => console.log("Audio play blocked by browser"));
    goToSection('bug-fixer');
});

// Bug Fixer Logic
const fixBugBtn = document.getElementById('fix-bug-btn');
const bugFixedMsg = document.getElementById('bug-fixed-msg');

fixBugBtn.addEventListener('click', () => {
    fixBugBtn.classList.add('hidden');

    // Simulating "fixing" code
    const codeContent = document.querySelector('.code-content code');
    codeContent.innerHTML = `<span class="keyword">const</span> <span class="variable">status</span> = <span class="string">"Success!"</span>;
<span class="keyword">let</span> <span class="variable">happiness</span> = <span class="keyword">"Indhu"</span>;

<span class="comment">// Bug Fixed: Perfect Match Found</span>
<span class="class">Console</span>.<span class="variable">log</span>(<span class="string">"Indhu Found ❤️"</span>);`;

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        bugFixedMsg.classList.remove('hidden');
    }, 1000);
});

// Coffee Section Logic
const coffeeBtns = document.querySelectorAll('.surprise-btn');
const coffeeMsgBox = document.getElementById('coffee-msg-box');
const coffeeMsg = document.getElementById('coffee-msg');
const coffeeNextBtn = document.getElementById('coffee-next-btn');

let clickedCount = 0;

coffeeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('clicked')) {
            btn.classList.add('clicked');
            clickedCount++;

            coffeeMsgBox.classList.remove('hidden');
            typeWriter(coffeeMsg, btn.getAttribute('data-msg'), 30);

            if (clickedCount === 3) {
                setTimeout(() => {
                    coffeeNextBtn.classList.remove('hidden');
                }, 2000);
            }
        }
    });
});

// Why You Section Logic
function triggerReasons() {
    const reasons = document.querySelectorAll('.reason');
    reasons.forEach(r => {
        setTimeout(() => {
            r.classList.add('fade-in');
        }, r.getAttribute('data-delay'));
    });

    setTimeout(() => {
        document.getElementById('open-heart-btn').classList.remove('hidden');
    }, 4500);
}

// Final Letter Logic
function triggerFinalLetter() {
    const letterText = document.getElementById('letter-text');
    const text = `From the day you came into my life, everything changed. 
    You didn’t just enter my world… you completed it. 
    Like perfect code, you make everything work beautifully. 
    You are my happiness, my peace, my forever.

    I don’t just want to love you today… 
    I want to choose you every single day.`;

    typeWriter(letterText, text, 40, () => {
        document.querySelector('.proposal-actions').classList.remove('hidden');
        triggerRosePetals();
    });
}

function triggerRosePetals() {
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.innerHTML = '🌸';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 7000);
    }, 500);
}

// Proposals Actions
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

yesBtn.addEventListener('click', () => {
    goToSection('success');
});

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// Fireworks
function triggerFireworks() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}
