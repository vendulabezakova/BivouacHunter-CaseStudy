const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
  let current = 0;

  function getImgUrl(el) {
    const bg = el.querySelector('.screen-img').style.backgroundImage;
    return bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
  }

  function openLightbox(idx) {
    current = idx;
    lbImg.src = getImgUrl(triggers[current]);
    const label = triggers[current].querySelector('.screen-label');
    lbCaption.innerHTML = label ? label.innerHTML : '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  triggers.forEach((el, i) => el.addEventListener('click', () => openLightbox(i)));
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => openLightbox((current - 1 + triggers.length) % triggers.length));
  document.getElementById('lb-next').addEventListener('click', () => openLightbox((current + 1) % triggers.length));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox((current - 1 + triggers.length) % triggers.length);
    if (e.key === 'ArrowRight') openLightbox((current + 1) % triggers.length);
  });