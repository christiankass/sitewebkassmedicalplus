// ===================== kassMedical+ — Scripts =====================

// En-tête : ombre au défilement + bouton retour en haut
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const onScroll = () => {
  header.classList.toggle('scrolled', scrollY > 10);
  toTop.classList.toggle('show', scrollY > 700);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  menu.classList.toggle('open');
  burger.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.classList.remove('open');
}));

// Lien actif selon la section visible
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });

// Onglets des modules (Métiers)
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab, .panel').forEach(el => el.classList.remove('active'));
  tab.classList.add('active');
  const target = document.getElementById(tab.dataset.tab);
  if (target) target.classList.add('active');
}));

// Sélecteur d'écrans réels du logiciel (Showcase interactif)
const winTitles = {
  'screen-dir': 'kassMedical+ — Tableau de bord Direction & Caisse (Clinique Tshiamala)',
  'screen-med': 'kassMedical+ — Espace Soins & Consultation Médecin (CIM-10)',
  'screen-param': 'kassMedical+ — Paramètres & Synchronisation Hors-Ligne'
};

document.querySelectorAll('.s-tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.s-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.screen-view').forEach(v => v.classList.remove('active'));
  
  btn.classList.add('active');
  const screenId = btn.dataset.screen;
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) targetScreen.classList.add('active');

  const titleEl = document.getElementById('winTitleText');
  if (titleEl && winTitles[screenId]) titleEl.textContent = winTitles[screenId];
}));

// Apparition progressive au défilement
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.feature, .step, .price, details, .mini-stats, .adv-list > div').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Compteurs animés
const counter = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target;
  const end = parseFloat(el.dataset.count);
  const dec = +(el.dataset.dec || 0);
  const suffix = el.dataset.suffix || '';
  const t0 = performance.now();
  const step = now => {
    const p = Math.min((now - t0) / 1800, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (end * eased).toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  counter.unobserve(el);
}), { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));

// Formulaire de démo
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('ok').hidden = false;
  e.target.reset();
});
