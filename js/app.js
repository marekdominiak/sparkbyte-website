// ===== MAP =====
var currentTileLayer = null;

var TILE_URLS = {
    default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    emerald: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
};

var TILE_ATTR = {
    default: '&copy; OpenStreetMap contributors',
    emerald: '&copy; OpenStreetMap contributors',
    light: '&copy; OpenStreetMap contributors &copy; CARTO'
};

function initMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    var map = L.map('map').setView([34.7757, 32.4244], 16);
    window._sparkbyteMap = map;

    var theme = document.documentElement.getAttribute('data-theme') || 'default';
    currentTileLayer = L.tileLayer(TILE_URLS[theme] || TILE_URLS.default, {
        attribution: TILE_ATTR[theme] || TILE_ATTR.default
    }).addTo(map);

    var marker = L.marker([34.7757, 32.4244]).addTo(map);
    marker.bindPopup('<b>Sparkbyte Solutions</b><br>44 Georgiou Griva Digeni Ave.<br>Atlantic House, Paphos').openPopup();
}

function updateMapTiles(theme) {
    var map = window._sparkbyteMap;
    if (!map || !currentTileLayer) return;
    map.removeLayer(currentTileLayer);
    currentTileLayer = L.tileLayer(TILE_URLS[theme] || TILE_URLS.default, {
        attribution: TILE_ATTR[theme] || TILE_ATTR.default
    }).addTo(map);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== ACTIVE NAV LINK =====
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ===== DYNAMIC YEAR =====
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

// ===== THEME TOGGLE =====
var THEMES = ['emerald', 'default', 'light'];
var THEME_LABELS = { default: 'Dark', light: 'Light', emerald: 'Emerald' };
var THEME_ICONS = { default: 'moon', light: 'sun', emerald: 'leaf' };

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    var btn = document.querySelector('.theme-toggle');
    if (btn) {
        var iconName = THEME_ICONS[theme] || 'palette';
        btn.innerHTML = '<i data-lucide="' + iconName + '"></i>';
        btn.setAttribute('title', 'Theme: ' + (THEME_LABELS[theme] || theme));
        btn.setAttribute('aria-label', 'Current theme: ' + (THEME_LABELS[theme] || theme) + '. Click to switch.');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    updateMapTiles(theme);
}

function initThemeToggle() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    // Restore saved preference
    var saved = localStorage.getItem('theme') || 'emerald';
    applyTheme(saved);

    btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'default';
        var nextIndex = (THEMES.indexOf(current) + 1) % THEMES.length;
        var next = THEMES[nextIndex];
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initActiveNav();
    initYear();
    initThemeToggle();

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
