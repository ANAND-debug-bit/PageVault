// js is used in the site only for auto updating yr , scroll in animation , active navigation pill highliting depend upon which section we are on 

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 32;
window.scrollTo({ top, behavior: 'smooth' });
})
});

const cards = document.querySelectorAll('.book-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
if (entry.isIntersecting) {
            entry.target.classList.add('visible');
    observer.unobserve(entry.target);
        }
    })
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

cards.forEach((card, i) => {
card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
card.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s, border-color 0.25s ease, box-shadow 0.25s ease`;
    observer.observe(card);
});

const style = document.createElement('style');
style.textContent = `.book-card.visible { opacity: 1 !important; transform: translateY(0) !important; }
.empty-card.visible { opacity: 0.35 !important; }
.empty-card.visible:hover { opacity: 0.6 !important; }`;
document.head.appendChild(style);

const sections = document.querySelectorAll('.subject-section');
const pills = document.querySelectorAll('.nav-pill');

const sectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
        if (entry.isIntersecting) {
    const id = entry.target.id;
            pills.forEach(pill => {
    pill.style.filter = pill.getAttribute('href') === `#${id}` ? 'brightness(1.4)' : 'brightness(0.7)';
            });
}
    });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));
