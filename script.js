(() => {
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const moments = { morning: ['01 / 03', 'O café. O pão. O começo de tudo.'], lunch: ['02 / 03', 'Uma pausa. Um prato. Energia para continuar.'], night: ['03 / 03', 'Boa companhia. Mais uma fatia.'] };
  const tabs = [...document.querySelectorAll('[data-moment]')];
  const panel = document.querySelector('#hero-moment');
  function setMoment(tab) {
    const key = tab.dataset.moment;
    tabs.forEach(t => { const active = t === tab; t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; });
    document.querySelectorAll('[data-photo]').forEach(photo => photo.classList.toggle('active', photo.dataset.photo === key));
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelector('.caption-index').textContent = moments[key][0];
    panel.querySelector('p').textContent = moments[key][1];
    panel.classList.remove('changing'); void panel.offsetWidth; panel.classList.add('changing');
  }
  tabs.forEach((tab, index) => { tab.addEventListener('click', () => setMoment(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); tabs[next].focus(); setMoment(tabs[next]); } }); });
  const details = [...document.querySelectorAll('.menu-list details')];
  details.forEach(d => d.addEventListener('toggle', () => { if (d.open) details.forEach(other => { if (other !== d) other.open = false; }); }));
  if ('IntersectionObserver' in window) { document.body.classList.add('js-ready'); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); }
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
