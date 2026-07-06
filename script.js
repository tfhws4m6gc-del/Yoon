/**
 * ==========================================================================
 * THE SYMPHONY OF US — CORE PRODUCTION ARCHITECTURAL ENGINE (V4.1)
 * ==========================================================================
 */

// Global App State Layer Matrix
const SymphonyState = {
    isAudioPlaying: false,
    activeGalleryIndex: 0,
    totalGalleryItems: 0,
    galleryItemsData: []
};

document.addEventListener('DOMContentLoaded', () => {
    // Audit Lock Safe Execution Sequences
    PreloaderSystem.init();
    CursorEffectsEngine.init();
});

/**
 * ==========================================================================
 * PART 1 & 2: GLOBAL UTILITIES, SMOOTH INTERPOLATION & PRELOADER SYSTEM (FIXED)
 * ==========================================================================
 */
const PreloaderSystem = {
    init() {
        const fill = document.getElementById('preloader-progress-fill');
        const circularFill = document.getElementById('v4-circular-fill');
        const statusText = document.getElementById('preloader-status-text');
        const overlay = document.getElementById('preloader-overlay');
        
        // Safety Fallback Guard: Element မရှိခဲ့ရင် loading ကို ချက်ချင်းဖြုတ်ပေးမယ်
        if (!fill || !overlay) {
            document.body.classList.remove('loading-locked');
            this.igniteCoreApplication();
            return;
        }

        let progress = 0;
        document.body.classList.add('loading-locked');

        const loop = setInterval(() => {
            progress += Math.floor(Math.random() * 12) + 4;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(loop);
                
                fill.style.width = '100%';
                if (circularFill) circularFill.style.strokeDasharray = '100, 100';
                if (statusText) statusText.innerText = "Symphony Orchestrated.";

                setTimeout(() => {
                    overlay.classList.add('fade-out');
                    document.body.classList.remove('loading-locked');
                    this.igniteCoreApplication();
                }, 400);
            } else {
                fill.style.width = `${progress}%`;
                if (circularFill) circularFill.style.strokeDasharray = `${progress}, 100`;
                if (statusText && progress > 50) statusText.innerText = "Configuring cinematic aura...";
            }
        }, 60);
    },

    igniteCoreApplication() {
        // App Modules များကို စတင်မောင်းနှင်ခြင်း
        NavbarEngine.init();
        PremiumHeroFXEngine.init();
        HeroMouseParallaxEngine.init();
        CountdownTimerEngine.init();
        MusicPlayerEngine.init();
        MetricsCounterEngine.init();
        TimelineAnimationEngine.init();
        MapInteractionEngine.init();
        LightboxSystemEngine.init();
        FeaturesAndGiftEngine.init();
        BackToTopEngine.init();
        FinalInitializationObserver.init();
    }
};

/**
 * ==========================================================================
 * PART 3: NAV BAR SMART KINETIC ENGINE
 * ==========================================================================
 */
const NavbarEngine = {
    navbar: null,
    scrollIndicator: null,
    lastScrollTop: 0,

    init() {
        this.navbar = document.querySelector('.luxury-navbar');
        this.scrollIndicator = document.getElementById('v4-scroll-indicator');
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Progress Fill Line Indicator
            if (this.scrollIndicator && docHeight > 0) {
                const scrolled = (scrollTop / docHeight) * 100;
                this.scrollIndicator.style.width = `${scrolled}%`;
            }

            // Hide/Show on Scroll Logic
            if (scrollTop > this.lastScrollTop && scrollTop > 120) {
                this.navbar.style.transform = 'translateY(-100px)';
                this.navbar.style.opacity = '0';
            } else {
                this.navbar.style.transform = 'translateY(0)';
                this.navbar.style.opacity = '1';
            }
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }
};

/**
 * ==========================================================================
 * PART 4: PREMIUM HERO FX ENGINE (SNOW, FIREFLIES, DYNAMIC HEARTS PARTICLES)
 * ==========================================================================
 */
const PremiumHeroFXEngine = {
    canvas: null,
    ctx: null,
    particles: [],
    maxParticles: 35,

    init() {
        this.canvas = document.getElementById('hero-fx-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });
        
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.spawnParticle(true));
        }
        this.loop();
    },

    resize() {
        const rect = this.canvas.parentNode.getBoundingClientRect();
        this.canvas.width = rect.width + 40;
        this.canvas.height = rect.height + 40;
    },

    spawnParticle(randomY = false) {
        const categories = ['snow', 'firefly', 'heart'];
        const type = categories[Math.floor(Math.random() * categories.length)];
        return {
            type: type,
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : this.canvas.height + 15,
            size: type === 'heart' ? Math.random() * 5 + 4 : Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.3,
            vy: type === 'snow' ? (Math.random() * 0.4 + 0.15) : -(Math.random() * 0.5 + 0.2),
            alpha: Math.random() * 0.5 + 0.2,
            pulse: Math.random() * Math.PI
        };
    },

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.pulse += 0.02;
            let currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
            currentAlpha = Math.max(0.1, Math.min(0.7, currentAlpha));

            this.ctx.save();
            this.ctx.globalAlpha = currentAlpha;

            if (p.type === 'snow') {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fill();
            } else if (p.type === 'firefly') {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
                this.ctx.fillStyle = '#bde0fe';
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = '#a2d2ff';
                this.ctx.fill();
            } else if (p.type === 'heart') {
                this.drawHeart(p.x, p.y, p.size);
            }

            this.ctx.restore();

            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -20 || p.y > this.canvas.height + 20 || p.x < -20 || p.x > this.canvas.width + 20) {
                Object.assign(p, this.spawnParticle(false));
            }
        });

        requestAnimationFrame(() => this.loop());
    },

    drawHeart(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size / 4);
        this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 2);
        this.ctx.bezierCurveTo(x - size / 2, y + size, x, y + size * 1.25, x, y + size * 1.5);
        this.ctx.bezierCurveTo(x, y + size * 1.25, x + size / 2, y + size, x + size / 2, y + size / 2);
        this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
        this.ctx.closePath();
        this.ctx.fillStyle = '#ffafcc';
        this.ctx.fill();
    }
};

const HeroMouseParallaxEngine = {
    trigger: null,
    tx: 0, ty: 0, cx: 0, cy: 0,

    init() {
        this.trigger = document.getElementById('v4-hero-parallax-trigger');
        if (!this.trigger) return;

        window.addEventListener('mousemove', (e) => {
            this.tx = (e.clientX - window.innerWidth / 2) * 0.03;
            this.ty = (e.clientY - window.innerHeight / 2) * 0.03;
        }, { passive: true });

        this.update();
    },

    update() {
        this.cx += (this.tx - this.cx) * 0.08;
        this.cy += (this.ty - this.cy) * 0.08;
        this.trigger.style.transform = `translate3d(${this.cx}px, ${this.cy}px, 0) rotateY(${this.cx * 0.2}deg) rotateX(${-this.cy * 0.2}deg)`;
        requestAnimationFrame(() => this.update());
    }
};

/**
 * ==========================================================================
 * PART 5 & 6: COUNTDOWN TIMER & MASTER AUDIO INTERACTION DECK
 * ==========================================================================
 */
const CountdownTimerEngine = {
    init() {

        // START VALUE (30d 6h 30m 15s)
        let totalSeconds =
            (30 * 24 * 60 * 60) +
            (6 * 60 * 60) +
            (30 * 60) +
            15;

        const dNode = document.getElementById('v4-days');
        const hNode = document.getElementById('v4-hours');
        const mNode = document.getElementById('v4-minutes');
        const sNode = document.getElementById('v4-seconds');

        if (!dNode || !hNode || !mNode || !sNode) return;

        function update() {

            let temp = totalSeconds;

            const days = Math.floor(temp / (24 * 3600));
            temp %= 24 * 3600;

            const hours = Math.floor(temp / 3600);
            temp %= 3600;

            const minutes = Math.floor(temp / 60);
            const seconds = temp % 60;

            dNode.innerText = String(days).padStart(2, '0');
            hNode.innerText = String(hours).padStart(2, '0');
            mNode.innerText = String(minutes).padStart(2, '0');
            sNode.innerText = String(seconds).padStart(2, '0');

            // 👉 COUNT UP (THIS IS THE KEY CHANGE)
            totalSeconds++;
        }

        update();
        setInterval(update, 1000);
    }
};

const MusicPlayerEngine = {
    audio: null,
    playTrigger: null,
    navTrigger: null,
    vinyl: null,
    progressFill: null,

    init() {
        this.playTrigger = document.getElementById('v4-deck-play-trigger');
        this.navTrigger = document.getElementById('v4-nav-audio-trigger');
        this.vinyl = document.getElementById('v4-vinyl-record');
        this.progressFill = document.getElementById('v4-audio-progress-fill');
        
        // Dynamic Cinematic Audio Pipeline Anchor
        this.audio = new Audio('music1.mp3');
        this.audio.loop = true;

        if (this.playTrigger) this.playTrigger.addEventListener('click', () => this.togglePlayback());
        if (this.navTrigger) this.navTrigger.addEventListener('click', () => this.togglePlayback());

        this.audio.addEventListener('timeupdate', () => {
            if (this.progressFill) {
                const percent = (this.audio.currentTime / this.audio.duration) * 100;
                this.progressFill.style.width = `${percent}%`;
            }
        });
    },

    togglePlayback() {
        if (SymphonyState.isAudioPlaying) {
            this.audio.pause();
            SymphonyState.isAudioPlaying = false;
            if (this.vinyl) this.vinyl.style.animation = 'none';
            document.querySelectorAll('.play-glyph-v4').forEach(g => g.innerText = '▶');
        } else {
            this.audio.play().catch(() => {});
            SymphonyState.isAudioPlaying = true;
            if (this.vinyl) this.vinyl.style.animation = 'spinV4 4s linear infinite';
            document.querySelectorAll('.play-glyph-v4').forEach(g => g.innerText = '⏸');
        }
    }
};

/**
 * ==========================================================================
 * PART 7, 8 & 9: COUNTERS, REVEALS, AND MASONRY LAZY GALLERY SYSTEM
 * ==========================================================================
 */
const MetricsCounterEngine = {
    init() {
        const counters = document.querySelectorAll('.metric-counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'), 10);
                    this.animate(target, 0, endValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    },

    animate(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerText = end;
            }
        };
        window.requestAnimationFrame(step);
    }
};

const LightboxSystemEngine = {
    lightbox: null,
    displayImg: null,
    caption: null,

    init() {
        this.lightbox = document.getElementById('global-v4-lightbox');
        this.displayImg = document.getElementById('v4-lightbox-display-node');
        this.caption = document.getElementById('v4-lightbox-caption-node');
        
        const galleryItems = document.querySelectorAll('.masonry-item');
        SymphonyState.totalGalleryItems = galleryItems.length;

        galleryItems.forEach((item, idx) => {
            const imgNode = item.querySelector('img');
            SymphonyState.galleryItemsData.push({
                src: imgNode.getAttribute('src'),
                caption: item.getAttribute('data-caption') || 'Symphony Memory Node'
            });

            item.addEventListener('click', () => {
                SymphonyState.activeGalleryIndex = idx;
                this.syncLightboxChamber();
                this.open();
            });
        });

        // Event controls wiring
        const closeBtn = document.getElementById('v4-lightbox-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        
        const prevBtn = document.getElementById('v4-lightbox-prev');
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.navigate(-1); });

        const nextBtn = document.getElementById('v4-lightbox-next');
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.navigate(1); });
        
        if (this.lightbox) {
            this.lightbox.addEventListener('click', () => this.close());
        }
    },

    syncLightboxChamber() {
        const data = SymphonyState.galleryItemsData[SymphonyState.activeGalleryIndex];
        if (this.displayImg) {
            this.displayImg.style.opacity = '0';
            setTimeout(() => {
                this.displayImg.setAttribute('src', data.src);
                this.displayImg.style.opacity = '1';
            }, 150);
        }
        if (this.caption) this.caption.innerText = data.caption;
    },

    navigate(direction) {
        let newIdx = SymphonyState.activeGalleryIndex + direction;
        if (newIdx >= SymphonyState.totalGalleryItems) newIdx = 0;
        if (newIdx < 0) newIdx = SymphonyState.totalGalleryItems - 1;
        SymphonyState.activeGalleryIndex = newIdx;
        this.syncLightboxChamber();
    },

    open() {
        if (this.lightbox) this.lightbox.classList.add('lightbox-active');
    },

    close() {
        if (this.lightbox) this.lightbox.classList.remove('lightbox-active');
    }
};

/**
 * ==========================================================================
 * PART 10 & 11: SCROLL TIMELINE & GEOGRAPHIC CARTOGRAPHY PIN CONTROLLER
 * ==========================================================================
 */
const TimelineAnimationEngine = {
    init() {
        const fillProgress = document.getElementById('v4-timeline-fill');
        const nodes = document.querySelectorAll('.v4-timeline-node');
        
        if (!nodes.length) return;

        window.addEventListener('scroll', () => {
            const container = document.querySelector('.v4-timeline-structural-axis');
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Calculate progress via bounding view
            let percentage = ((viewHeight * 0.5 - rect.top) / rect.height) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            
            if (fillProgress) fillProgress.style.height = `${percentage}%`;

            nodes.forEach(node => {
                const nodeTop = node.getBoundingClientRect().top;
                if (nodeTop < viewHeight * 0.5) {
                    node.classList.add('node-passed-fill');
                } else {
                    node.classList.remove('node-passed-fill');
                }
            });
        }, { passive: true });
    }
};

const MapInteractionEngine = {
    init() {
        const pins = document.querySelectorAll('.map-coordinate-pin');
        const drawerTitle = document.getElementById('drawer-location-title');
        const drawerDesc = document.getElementById('drawer-location-desc');
        const drawerUI = document.getElementById('map-drawer-ui');

        pins.forEach(pin => {
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                pins.forEach(p => p.classList.remove('pin-active'));
                pin.classList.add('pin-active');

                const loc = pin.getAttribute('data-location');
                const desc = pin.getAttribute('data-desc');

                if (drawerUI) {
                    drawerUI.classList.remove('drawer-visible');
                    setTimeout(() => {
                        if (drawerTitle) drawerTitle.innerText = loc;
                        if (drawerDesc) drawerDesc.innerText = desc;
                        drawerUI.classList.add('drawer-visible');
                    }, 200);
                }
            });
        });
    }
};

/**
 * ==========================================================================
 * PART 12, 13 & 14: VAULT TABS, DRAWER SYSTEMS & ALGORITHMIC GIFT INTERACTIVES
 * ==========================================================================
 */
const FeaturesAndGiftEngine = {
    init() {
        // Surprise Secret Chamber Mechanics
        const giftTrigger = document.getElementById('v4-gift-box-trigger');
        const fallbackBtn = document.getElementById('v4-gift-box-btn-fallback');
        const giftModal = document.getElementById('global-v4-gift-modal');
        const giftClose = document.getElementById('v4-gift-modal-close');

        const openGift = () => { if (giftModal) giftModal.classList.add('modal-active'); };
        if (giftTrigger) giftTrigger.addEventListener('click', openGift);
        if (fallbackBtn) fallbackBtn.addEventListener('click', openGift);
        if (giftClose) giftClose.addEventListener('click', () => giftModal.classList.remove('modal-active'));

        // Correspondence Vault Drawers
        const lettersTrigger = document.querySelector('.ignite-letters-drawer-trigger');
        const lettersDrawer = document.getElementById('global-v4-letters-drawer');
        const lettersClose = document.getElementById('v4-letters-drawer-close');

        if (lettersTrigger) lettersTrigger.addEventListener('click', () => lettersDrawer.classList.add('drawer-active'));
        if (lettersClose) lettersClose.addEventListener('click', () => lettersDrawer.classList.remove('drawer-active'));

        // Tab Switching inside Correspondence Pane
        const tabs = document.querySelectorAll('.v4-letter-tab-btn');
        const panes = document.querySelectorAll('.v4-letter-text-pane');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('tab-active'));
                panes.forEach(p => p.classList.remove('pane-active'));

                tab.classList.add('tab-active');
                if (panes[index]) panes[index].classList.add('pane-active');
            });
        });
    }
};

/**
 * ==========================================================================
 * PART 15 & 16: BACK TO TOP PROGRESSION & HIGH-PERFORMANCE MAGNETIC CURSOR
 * ==========================================================================
 */
const BackToTopEngine = {
    btn: null,

    init() {
        this.btn = document.getElementById('v4-back-to-top-btn');
        if (!this.btn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                this.btn.classList.add('btn-visible');
            } else {
                this.btn.classList.remove('btn-visible');
            }
        }, { passive: true });

        this.btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

const CursorEffectsEngine = {
    dot: null, ring: null,
    mx: 0, my: 0, rx: 0, ry: 0,

    init() {
        this.dot = document.getElementById('v4-cursor-dot');
        this.ring = document.getElementById('v4-cursor-ring');
        if (!this.dot || !this.ring) return;

        window.addEventListener('mousemove', (e) => {
            this.mx = e.clientX;
            this.my = e.clientY;
            this.dot.style.transform = `translate3d(${this.mx}px, ${this.my}px, 0) translate(-50%, -50%)`;
        }, { passive: true });

        // Add Hover classes dynamically across structural magnetic components
        document.querySelectorAll('a, button, .masonry-item, .map-coordinate-pin').forEach(element => {
            element.addEventListener('mouseenter', () => this.ring.classList.add('cursor-hover-active'));
            element.addEventListener('mouseleave', () => this.ring.classList.remove('cursor-hover-active'));
        });

        this.renderPhysics();
    },

    renderPhysics() {
        this.rx += (this.mx - this.rx) * 0.14;
        this.ry += (this.my - this.ry) * 0.14;
        this.ring.style.transform = `translate3d(${this.rx}px, ${this.ry}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(() => this.renderPhysics());
    }
};

/**
 * ==========================================================================
 * PART 17: GLOBAL INTERSECTION OBSERVER INITIALIZATION (FINAL BOOT)
 * ==========================================================================
 */
const FinalInitializationObserver = {
    init() {
        const revealTargets = document.querySelectorAll('.scroll-reveal-v4');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(t => observer.observe(t));
    }
};