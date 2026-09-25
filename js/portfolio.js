const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-categories]')];
const moreMaps = document.getElementById('more-maps');
const status = document.getElementById('filter-status');
const validFilters = new Set(['all', 'ai-data', 'maps', 'products']);
function selectFilter(filter, updateUrl = true) {
  if (!validFilters.has(filter)) filter = 'all';
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  let visible = 0;
  cards.forEach(card => {
    const matches = filter === 'all' || card.dataset.categories.split(' ').includes(filter);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  moreMaps.hidden = !(filter === 'all' || filter === 'maps');
  status.textContent = `${visible} projects shown`;
  if (updateUrl) {
    const url = new URL(location.href);
    if (filter === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', filter);
    history.pushState({ filter }, '', url);
  }
}
filters.forEach(button => button.addEventListener('click', () => selectFilter(button.dataset.filter)));
window.addEventListener('popstate', () => selectFilter(new URLSearchParams(location.search).get('filter') || 'all', false));
selectFilter(new URLSearchParams(location.search).get('filter') || 'all', false);


// Reveal sections as they enter view without changing scroll behavior.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.hero-eyebrow, .hero h1, .hero-side, .work-section .section-heading, .work-item, .projects-section .section-heading, .project-card, .more-maps, .contact-section'
  );
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
  });
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  revealTargets.forEach(element => revealObserver.observe(element));
}
