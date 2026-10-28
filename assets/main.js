const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const body = document.body;
const largeText = document.querySelector('[data-action="text"]');
const contrast = document.querySelector('[data-action="contrast"]');

function restorePreferences() {
  if (localStorage.getItem('largeText') === 'true') body.classList.add('large-text');
  if (localStorage.getItem('highContrast') === 'true') body.classList.add('high-contrast');
}
restorePreferences();

largeText?.addEventListener('click', () => {
  body.classList.toggle('large-text');
  localStorage.setItem('largeText', body.classList.contains('large-text'));
});
contrast?.addEventListener('click', () => {
  body.classList.toggle('high-contrast');
  localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
});

const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach(project => {
    project.hidden = filter !== 'todos' && project.dataset.category !== filter;
  });
}));

document.querySelectorAll('.project-gallery').forEach(gallery => {
  const slides = [...gallery.querySelectorAll('.project-slide')];
  const dots = [...gallery.querySelectorAll('.gallery-dot')];
  const counter = gallery.querySelector('.gallery-count');
  let current = 0;

  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  gallery.querySelector('.gallery-prev')?.addEventListener('click', () => showSlide(current - 1));
  gallery.querySelector('.gallery-next')?.addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showSlide(current - 1);
    if (event.key === 'ArrowRight') showSlide(current + 1);
  });
  showSlide(0);
});

const impacts = {
  300: '<strong>$300</strong> ayudan a cubrir material táctil para una sesión de lectoescritura braille.',
  750: '<strong>$750</strong> apoyan una hora de entrenamiento en orientación y movilidad.',
  1500: '<strong>$1,500</strong> contribuyen a una evaluación y configuración de tecnología accesible.'
};
const impactResult = document.querySelector('#impact-result');
document.querySelectorAll('.amount').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.amount').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('.amount').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  if (impactResult) impactResult.innerHTML = impacts[button.dataset.amount];
}));

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  status.textContent = '¡Gracias! Recibimos tu mensaje de demostración. En un sitio publicado, aquí se conectaría el envío con el correo de la organización.';
  status.classList.add('show');
  status.focus();
  form.reset();
});

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
