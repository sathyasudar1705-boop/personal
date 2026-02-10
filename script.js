// --- DATA ARRAYS ---


// --- CORE NAVIGATION ---
function goToSection(sectionId) {
    const currentSection = document.querySelector('section.active');
    const nextSection = document.getElementById(sectionId);

    if (currentSection) currentSection.classList.remove('active');
    if (nextSection) {
        nextSection.classList.remove('hidden');
        nextSection.classList.add('active');

        // Trigger section-specific logic
        switch (sectionId) {
            case 'password-gate': triggerTypewriter('password-gate h2'); break;
            case 'bug-fixer': triggerTypewriter('bug-fixer h2'); break;
            case 'heart-game': initHeartGame(); break;
            case 'final': triggerFinalLetter(); break;
            case 'success': triggerFireworks(); break;
            case 'memory-gallery-section': triggerTypewriter('memory-gallery-section h2'); break;
            case 'final-promise': triggerTypewriter('final-promise h1'); break;
            case 'memory-timeline': initTimeline(); break;
            case 'final-revelation': triggerTypewriter('revelation-text'); break;
        }
    }
}

function initTimeline() {
    const moments = document.querySelectorAll('.timeline-moment');
    const footer = document.querySelector('.timeline-footer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.2 });

    moments.forEach(m => observer.observe(m));
    if (footer) observer.observe(footer);
}

// --- UTILITIES ---
function typeWriter(element, text, speed = 50, callback) {
    if (element.typingTimeout) {
        clearTimeout(element.typingTimeout);
    }

    let i = 0;
    element.innerHTML = '';

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            element.typingTimeout = setTimeout(typing, speed);
        } else if (callback) {
            element.typingTimeout = null;
            callback();
        }
    }
    typing();
}

function triggerTypewriter(selector) {
    const el = document.querySelector(`#${selector}`);
    if (el) typeWriter(el, el.getAttribute('data-text'));
}

// --- INITIALIZATION ---
window.onload = () => {
    createStars();
    typeWriter(document.getElementById('opening-text'), "“Hey Indhu… I created something special, because you are special to me.” ✨", 70);
    initParticles();
};

function createStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = Math.random() * 3 + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "opacity": { "value": 0.15 },
            "size": { "value": 2 },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1 }
        }
    });
}

// --- SECTION LOGIC ---

// 1. Opening
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('bg-music-1').play().catch(() => { });
    goToSection('password-gate');
});

// 1.5 Password Gate
document.getElementById('password-sub-btn').addEventListener('click', checkPassword);
document.getElementById('password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const error = document.getElementById('password-error');
    const success = document.getElementById('password-success');

    if (input === 'S-love-I') {
        error.classList.add('hidden');
        success.classList.remove('hidden');
        success.innerText = 'Welcome my love... Sending you into our world. ❤️';
        setTimeout(() => {
            goToSection('bug-fixer');
        }, 1500);
    } else {
        success.classList.add('hidden');
        error.classList.remove('hidden');
        error.innerText = 'Go on, baby… I believe you can do it...';
        // Shake animation reset
        error.style.animation = 'none';
        error.offsetHeight; // trigger reflow
        error.style.animation = null;
    }
}

// 2. Bug Fixer
document.getElementById('fix-bug-btn').addEventListener('click', function () {
    this.classList.add('hidden');
    document.querySelector('.code-content code').innerHTML = `
<span class="keyword">const</span> <span class="variable">status</span> = <span class="string">"Success!"</span>;
<span class="keyword">let</span> <span class="variable">happiness</span> = <span class="keyword">"Indhu"</span>;
<span class="comment">// Bug Fixed: Perfect Match Found</span>
<span class="class">Console</span>.<span class="variable">log</span>(<span class="string">"Indhu Found ❤️"</span>);`;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => document.getElementById('bug-fixed-msg').classList.remove('hidden'), 1000);
});

// 2.5 Dreamy Anti-Gravity Scene - REMOVED

// 3. Memory Lane - REMOVED

// 4. Magic Moments Section
let magicClicks = 0;
document.querySelectorAll('.surprise-btn').forEach(btn => {
    btn.onclick = () => {
        if (btn.classList.contains('clicked')) return;
        btn.classList.add('clicked');
        magicClicks++;

        const type = btn.getAttribute('data-type');
        const msg = btn.getAttribute('data-msg');
        const box = document.getElementById('coffee-msg-box');
        const msgEl = document.getElementById('coffee-msg');

        box.classList.remove('hidden');
        msgEl.className = ''; // Reset
        msgEl.innerText = msg;
        msgEl.classList.add(`${type}-text`);

        // Emit extra particles on click
        for (let i = 0; i < 5; i++) createMagicParticle();

        if (magicClicks === 3) setTimeout(() => document.getElementById('coffee-next-btn').classList.remove('hidden'), 2000);
    };
});

function createMagicParticle() {
    const container = document.getElementById('coffee');
    if (!container) return;

    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    particle.innerHTML = Math.random() > 0.5 ? '✨' : '❤️';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    const duration = Math.random() * 3 + 4;
    particle.style.setProperty('--duration', duration + 's');
    particle.style.fontSize = Math.random() * 10 + 15 + 'px';

    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
}

// Start continuous particles for this section
setInterval(createMagicParticle, 800);

// 5. Reasons Section - REMOVED

// 6. Mini Game
let caughtCount = 0;
function initHeartGame() {
    const arena = document.getElementById('heart-game-arena');
    arena.innerHTML = '';
    const spawnHeart = () => {
        if (caughtCount >= 10) return;
        const heart = document.createElement('div');
        heart.className = 'game-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 80 + 10 + '%';
        heart.style.top = Math.random() * 80 + 10 + '%';
        heart.onclick = () => {
            caughtCount++;
            document.getElementById('game-score').innerText = `Hearts Caught: ${caughtCount}`;
            heart.remove();
            confetti({ particleCount: 20, spread: 50, origin: { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight } });
            if (caughtCount >= 10) {
                document.getElementById('open-heart-btn').classList.remove('hidden');
                arena.innerHTML = '<h3 style="margin-top: 150px;">You caught all my love! ❤️</h3>';
            } else {
                spawnHeart();
            }
        };
        arena.appendChild(heart);
    };
    spawnHeart();
}

// 7. Final Letter
function triggerFinalLetter() {
    const text = `Dear Indhu ❤️,

I don’t know the exact moment my heart became yours…
Maybe it was in your smile.
Maybe it was in your voice.
Or maybe it was in the quiet comfort I feel when I’m with you. 🌙

All I know is —
before you, life was normal.
After you, it became meaningful. ✨

You didn’t just enter my life…
you became my peace.
In a world that moves too fast,
you are the calm my heart runs to. 🌧️💞

There were days I didn’t even know what I was missing…
until you filled that space without even trying.
You didn’t fix my world —
you became my world.

Loving you isn’t loud.
It isn’t dramatic.
It’s quiet, steady, and true.
It’s the kind of love that chooses you — even on hard days.
Especially on hard days. ❤️

Indhu…

When I think about my future,
I don’t see places or things.
I see you.
Laughing beside me.
Walking with me.
Growing with me.

I don’t just want moments with you.
I want a lifetime.

So today, with all my heart —
not just as a lover,
but as someone who wants to stand beside you through everything —

I’m asking you softly…`;

    typeWriter(document.getElementById('letter-text'), text, 40, () => {
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

// Runaway "No" Button
document.getElementById('no-btn').onmouseover = function () {
    this.style.position = 'fixed';
    this.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    this.style.top = Math.random() * (window.innerHeight - 50) + 'px';
};

document.getElementById('yes-btn').onclick = () => {
    // Switch music
    const music1 = document.getElementById('bg-music-1');
    const music2 = document.getElementById('bg-music-2');

    if (music1) {
        music1.pause();
        music1.currentTime = 0;
    }
    if (music2) {
        music2.play().catch(() => { });
    }

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
    goToSection('success');
};

// 8. Success Fireworks
function triggerFireworks() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ particleCount, origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() - 0.2 } });
        confetti({ particleCount, origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() - 0.2 } });
    }, 250);
}

// 9. Memory Gallery Section
const ASSET_IMAGES = [
    "IMG-20250621-WA0006.jpg", "IMG-20250621-WA0011.jpg", "IMG-20250921-WA0010.jpg",
    "IMG-20250921-WA0013.jpg", "IMG-20250921-WA0016.jpg", "IMG-20250921-WA0017.jpg",
    "IMG20250518160613.jpg", "IMG20250917200149.jpg", "IMG20251004165713.jpg",
    "IMG_20250928_113341.jpg", "IMG_20251122_174020.jpg", "IMG_20251230_142848.jpg",
    "IMG_20260125_160827.jpg", "IMG_20260210_194806.jpg"
];

function showMemoriesGallery() {
    goToSection('memory-gallery-section');
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    ASSET_IMAGES.forEach((filename, index) => {
        const frame = document.createElement('div');
        frame.className = 'memory-frame floating';

        // Random variations for float animation
        const rot = (Math.random() * 6 - 3).toFixed(2);
        const delay = (Math.random() * 5).toFixed(2);
        const duration = (8 + Math.random() * 4).toFixed(2);

        frame.style.setProperty('--rot', `${rot}deg`);
        frame.style.setProperty('--delay', `${delay}s`);
        frame.style.setProperty('--duration', `${duration}s`);

        frame.innerHTML = `
            <div class="love-tag">❤️</div>
            <img src="assets/${filename}" alt="Our Memory">
        `;

        // Interactive 3D Tilt Effect
        frame.onmousemove = (e) => {
            const rect = frame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            frame.classList.remove('floating'); // Pause floating while interacting
            frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        };

        frame.onmouseleave = () => {
            frame.classList.add('floating');
            frame.style.transform = '';
        };

        frame.onclick = () => {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#ff4d6d', '#ffffff', '#8a2be2']
            });
        };

        grid.appendChild(frame);
    });

    triggerGalleryEffects();
}

function triggerGalleryEffects() {
    const container = document.getElementById('gallery-particles');
    container.innerHTML = '';
    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'magic-particle';
        p.innerHTML = Math.random() > 0.5 ? '❤' : '✨';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '100vh';
        p.style.color = '#ff4d6d';
        const duration = Math.random() * 5 + 5;
        p.style.setProperty('--duration', duration + 's');
        container.appendChild(p);
        setTimeout(() => p.remove(), duration * 1000);
    }, 1000);
}
