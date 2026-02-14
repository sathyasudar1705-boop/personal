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
            case 'polaroid-wall-section': initPolaroidWall(); break;
            case 'final-promise': triggerTypewriter('final-promise h1'); break;
            case 'memory-timeline': initTimeline(); break;
            case 'quiz-game': initQuiz(); break;

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
        success.innerText = 'Welcome my soulmate... Opening our world. ❤️';

        // Final success explosion
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff758c', '#ffffff']
        });

        setTimeout(() => {
            goToSection('bug-fixer');
        }, 1500);
    } else {
        success.classList.add('hidden');
        error.classList.remove('hidden');
        error.innerText = 'Wrong code, baby! Don’t worry, try again... ❤️';

        // Shake animation
        const box = document.querySelector('.password-box');
        box.classList.add('shake');
        setTimeout(() => box.classList.remove('shake'), 500);
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

// 5. Quiz Game Section
const QUIZ_DATA = [
    {
        q: "Namma first eppo pesunom? ❤️",
        o: ["Bakery", "Selva marriage", "College la vachi"],
        a: 0
    },
    {
        q: "First kiss eppo pannunom? 💋",
        o: ["September 5", "August 15", "College la vachi"],
        a: 1
    },
    {
        q: "Unaku en kitta pudichathu ennathu? 🥺",
        o: ["En kobam", "En payam", "En azhagu"],
        a: 1
    },
    {
        q: "Enaku un kitta enna pudikum? 💖",
        o: ["Un anbu", "Un kovam", "Un azhagu"],
        a: 0
    },
    {
        q: "Na unaku yaaru? ❤️",
        o: ["Lover", "Brother", "En Sathya"],
        a: 2
    }
];

let currentQuizIndex = 0;
let quizScore = 0;

function initQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('quiz-result-screen').classList.add('hidden');
    triggerTypewriter('quiz-title');
    renderQuestion();
}

function renderQuestion() {
    const data = QUIZ_DATA[currentQuizIndex];
    document.getElementById('question-text').innerText = data.q;
    const optionsCont = document.getElementById('options-container');
    const feedback = document.getElementById('quiz-feedback');
    const progress = document.getElementById('quiz-progress-dots');

    optionsCont.innerHTML = '';
    feedback.innerText = '';
    feedback.classList.add('hidden');

    // Progress Dots
    progress.innerHTML = '';
    QUIZ_DATA.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot-progress ${i < currentQuizIndex ? 'completed' : (i === currentQuizIndex ? 'current' : '')}`;
        progress.appendChild(dot);
    });

    data.o.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.innerText = opt;
        btn.onclick = () => selectOption(i, btn);
        optionsCont.appendChild(btn);
    });
}

const TEASING_MESSAGES = [
    "Aiyo wrong 😭 try again baby ❤️",
    "Hint: Nee romba nalla theriyum 😉",
    "Innum konjam yosichu paru 💕"
];

function selectOption(index, btn) {
    const data = QUIZ_DATA[currentQuizIndex];
    const feedback = document.getElementById('quiz-feedback');

    if (index === data.a) {
        // Correct
        if (!btn.classList.contains('correct')) quizScore++;
        btn.classList.add('correct');
        feedback.innerText = "Correct! My smart girl ❤️";
        feedback.className = 'feedback-correct';
        feedback.classList.remove('hidden');

        confetti({
            particleCount: 50,
            spread: 60,
            origin: { x: btn.getBoundingClientRect().left / window.innerWidth, y: btn.getBoundingClientRect().top / window.innerHeight }
        });

        setTimeout(() => {
            currentQuizIndex++;
            if (currentQuizIndex < QUIZ_DATA.length) {
                renderQuestion();
            } else {
                showQuizResults();
            }
        }, 1500);
    } else {
        // Wrong
        btn.classList.add('wrong');
        feedback.innerText = TEASING_MESSAGES[Math.floor(Math.random() * TEASING_MESSAGES.length)];
        feedback.className = 'feedback-wrong';
        feedback.classList.remove('hidden');
        setTimeout(() => btn.classList.remove('wrong'), 500);
    }
}

function showQuizResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    const result = document.getElementById('quiz-result-screen');
    const emoji = document.getElementById('result-emoji');
    const scoreText = document.getElementById('result-score');
    const msg = document.getElementById('result-message');

    result.classList.remove('hidden');
    scoreText.innerText = `You scored ${quizScore}/${QUIZ_DATA.length} in our love memories ❤️`;

    if (quizScore === 5) {
        emoji.innerText = "💍❤️";
        msg.innerText = "“Perfect Soulmate” \nYou truly know our love story, Indhu ❤️";
        triggerFireworks();
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    } else if (quizScore >= 4) {
        emoji.innerText = "💖";
        msg.innerText = "“My Favorite Person”";
    } else if (quizScore >= 3) {
        emoji.innerText = "🥺💕";
        msg.innerText = "“Still My Love”";
    } else {
        emoji.innerText = "😭❤️";
        msg.innerText = "“But Still Mine Forever”";
    }
}


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

    typeWriter(document.getElementById('letter-text'), text, 20, () => {
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

// 9. Polaroid Memory Wall
function showMemoriesGallery() {
    goToSection('polaroid-wall-section');
}

const ASSET_IMAGES = [
    { file: "IMG-20250621-WA0006.jpg", note: "The day you smiled at me ❤️" },
    { file: "IMG-20250621-WA0011.jpg", note: "A moment I never want to forget" },
    { file: "IMG-20250921-WA0010.jpg", note: "My favorite memory with you" },
    { file: "IMG-20250921-WA0013.jpg", note: "Forever in my heart ✨" },
    { file: "IMG-20250921-WA0016.jpg", note: "Every laugh counts" },
    { file: "IMG-20250921-WA0017.jpg", note: "You are my peace" },
    { file: "IMG20250518160613.jpg", note: "Beginnings... ❤️" },
    { file: "IMG20250917200149.jpg", note: "Just us 🌸" },
    { file: "IMG20251004165713.jpg", note: "Pure magic ✨" },
    { file: "IMG_20250928_113341.jpg", note: "Sweet moments" },
    { file: "IMG_20251122_174020.jpg", note: "Better together" },
    { file: "IMG_20251230_142848.jpg", note: "Chasing dreams" },
    { file: "IMG_20260125_160827.jpg", note: "My sunshine ☀️" },
    { file: "IMG_20260210_194806.jpg", note: "Always you ❤️" }
];

const LOVE_MESSAGES = [
    "You are my today and all of my tomorrows. ❤️",
    "Every love story is beautiful, but ours is my favorite. ✨",
    "In your smile, I see something more beautiful than stars. 🌸",
    "I love you more than words can say. 💖",
    "Being with you is where I belong. 🌙",
    "You make my world light up. ☀️",
    "With you, I'm home. 🏠💕"
];

let currentPolaroidIndex = 0;
let polaroidImagesData = [];

function initPolaroidWall() {
    const container = document.getElementById('polaroid-container');
    const title = document.getElementById('polaroid-title');
    const nav = document.getElementById('polaroid-nav');
    container.innerHTML = '';
    polaroidImagesData = [...ASSET_IMAGES]; // Keep a copy of the data

    // Title typewriter
    title.innerText = '';
    typeWriter(title, title.getAttribute('data-text') || "“Our Beautiful Memories 📸❤️”", 50);

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        nav.classList.remove('hidden');
        renderMobileSlider();
        initSwipeGestures();
    } else {
        nav.classList.add('hidden');
        renderDesktopWall();
    }

    triggerWallParticles();
}

function renderDesktopWall() {
    const container = document.getElementById('polaroid-container');
    ASSET_IMAGES.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'polaroid-card anti-gravity-float';

        const cardWidth = 250;
        const cardHeight = 300;
        const rect = container.getBoundingClientRect();
        const startX = Math.random() * (rect.width - cardWidth);
        const startY = Math.random() * (rect.height - cardHeight);
        const rot = (Math.random() * 10 - 5).toFixed(2);
        const delay = (Math.random() * 2).toFixed(2);
        const duration = (5 + Math.random() * 3).toFixed(2);

        card.style.left = `${startX}px`;
        card.style.top = `${startY}px`;
        card.style.setProperty('--rot', `${rot}deg`);
        card.style.setProperty('--delay', `${delay}s`);
        card.style.setProperty('--duration', `${duration}s`);
        card.style.animationDelay = `${delay}s`;

        card.innerHTML = `
            <div class="polaroid-inner">
                <img src="assets/${data.file}" alt="Memory">
                <div class="polaroid-note">${data.note}</div>
            </div>
            <div class="love-tag">❤️</div>
        `;

        card.addEventListener('mouseenter', () => {
            card.hoverSparkles = setInterval(() => {
                const rect = card.getBoundingClientRect();
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                triggerSparkles(x, y, 3);
            }, 200);
        });

        card.addEventListener('mouseleave', () => clearInterval(card.hoverSparkles));
        card.addEventListener('click', (e) => {
            if (card.isDragging) return;
            const msg = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
            showLoveMessage(msg, e.clientX, e.clientY);
            triggerSparkles(e.clientX, e.clientY, 15);
        });

        makeDraggable(card);
        container.appendChild(card);
        setTimeout(() => card.classList.add('active'), index * 200);
    });
}

function renderMobileSlider() {
    const container = document.getElementById('polaroid-container');
    container.innerHTML = '';
    currentPolaroidIndex = 0;

    ASSET_IMAGES.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'polaroid-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="polaroid-inner">
                <img src="assets/${data.file}" alt="Memory">
                <div class="polaroid-note">${data.note}</div>
            </div>
            <div class="love-tag">❤️</div>
        `;

        card.addEventListener('click', (e) => {
            const msg = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
            const rect = card.getBoundingClientRect();
            showLoveMessage(msg, rect.left + rect.width / 2, rect.top + rect.height / 2);
            triggerSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 5);
        });

        container.appendChild(card);
    });

    updateMobileCard();

    document.getElementById('next-btn').onclick = nextMemory;
    document.getElementById('prev-btn').onclick = prevMemory;
}

function updateMobileCard() {
    const cards = document.querySelectorAll('.polaroid-card');
    cards.forEach((card, i) => {
        card.classList.remove('active');
        card.style.display = 'none';
        if (i === currentPolaroidIndex) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('active'), 50);
        }
    });

    // Final Memory Special Effect
    if (currentPolaroidIndex === ASSET_IMAGES.length - 1) {
        setTimeout(triggerFinalMemoryEffect, 1000);
    }
}

function nextMemory() {
    if (currentPolaroidIndex < ASSET_IMAGES.length - 1) {
        currentPolaroidIndex++;
        updateMobileCard();
    } else {
        // Loop back or show final message? Current requirement says final memory triggers effect
        currentPolaroidIndex = 0;
        updateMobileCard();
    }
}

function prevMemory() {
    if (currentPolaroidIndex > 0) {
        currentPolaroidIndex--;
        updateMobileCard();
    }
}

function triggerFinalMemoryEffect() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffffff']
    });

    const msg = document.createElement('div');
    msg.className = 'final-memory-msg glass';
    msg.innerHTML = "<h3>Every memory with you is my favorite forever 💖</h3>";
    msg.style.position = 'fixed';
    msg.style.top = '50%';
    msg.style.left = '50%';
    msg.style.transform = 'translate(-50%, -50%) scale(0)';
    msg.style.zIndex = '2000';
    msg.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.transform = 'translate(-50%, -50%) scale(1)';
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        }, 3000);
    }, 100);
}

function initSwipeGestures() {
    let touchstartX = 0;
    let touchendX = 0;
    const container = document.getElementById('polaroid-container');

    container.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);

    container.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchendX < touchstartX - 50) nextMemory();
        if (touchendX > touchstartX + 50) prevMemory();
    }
}

function showLoveMessage(msg, x, y) {
    const popup = document.createElement('div');
    popup.className = 'love-popup glass';
    popup.innerText = msg;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

function triggerSparkles(x, y, count = 15) {
    const isMobile = window.innerWidth <= 768;
    const finalCount = isMobile ? Math.ceil(count / 2) : count;

    for (let i = 0; i < finalCount; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.innerHTML = '✨';
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        const scatter = isMobile ? 80 : 150;
        const tx = (Math.random() - 0.5) * scatter;
        const ty = (Math.random() - 0.5) * scatter;
        s.style.setProperty('--tx', `${tx}px`);
        s.style.setProperty('--ty', `${ty}px`);
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    }
}

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        el.isDragging = false;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        el.classList.add('dragging');
        el.classList.remove('anti-gravity-float');
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        el.isDragging = true;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        el.classList.remove('dragging');
        el.classList.add('anti-gravity-float');
        el.style.transform = ''; // Return to random rot or straightened state? 
        // Hover CSS will handle straightening, but inline transform might override.
        // Let's clear inline to let CSS take over.
        el.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => el.style.transition = '', 500);
    }
}

function triggerWallParticles() {
    const container = document.getElementById('polaroid-floaters');
    container.innerHTML = '';
    const isMobile = window.innerWidth <= 768;
    const interval = isMobile ? 4000 : 2000;

    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'magic-particle';
        p.innerHTML = Math.random() > 0.5 ? '❤️' : '🌸';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '100vh';
        p.style.opacity = '0.4';
        const duration = isMobile ? (Math.random() * 5 + 15) : (Math.random() * 8 + 10);
        p.style.setProperty('--duration', duration + 's');
        container.appendChild(p);
        setTimeout(() => p.remove(), duration * 1000);
    }, interval);
}
