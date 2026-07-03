// Coordinate readout — tracks pointer position and scroll depth
  const roX = document.getElementById('ro-x');
  const roY = document.getElementById('ro-y');
  const roScroll = document.getElementById('ro-scroll');

  window.addEventListener('mousemove', (e) => {
    roX.textContent = String(e.clientX).padStart(4,'0');
    roY.textContent = String(e.clientY).padStart(4,'0');
  }, { passive:true });

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
    roScroll.textContent = pct + '%';
  }, { passive:true });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Animate skill gauges once visible
  const bom = document.getElementById('bom-body');
  const bomIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        document.querySelectorAll('.gauge-fill').forEach(el => {
          el.style.width = el.dataset.fill + '%';
        });
        bomIO.disconnect();
      }
    });
  }, { threshold: 0.2 });
  if (bom) bomIO.observe(bom);
