(function() {
  const canvas = document.getElementById('grainCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawGrain() {
    const w = canvas.width, h = canvas.height;
    const imgData = ctx.createImageData(w, h);
    const buffer  = new Uint32Array(imgData.data.buffer);
    const alpha   = 0x18; // about 10% opacity

    for (let i = 0; i < buffer.length; i++) {
      const grey = (Math.random() * 255) | 0;
      // pack as A (alpha) BB GG RR in little-endian
      buffer[i] = (alpha << 24) | (grey << 16) | (grey << 8) | grey;
    }

    ctx.putImageData(imgData, 0, 0);
  }

  // draw once, or uncomment to animate:
  // setInterval(drawGrain, 120);

  drawGrain();
})();

window.addEventListener('scroll', function() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  if (window.scrollY > 200) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

(function() {
  const canvas = document.getElementById('dustCanvas');
  const ctx    = canvas.getContext('2d');

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  // Sepia dust motes
  const dustParticles = Array.from({length: 60}, () => ({
    x: randomBetween(0, canvas.width),
    y: randomBetween(0, canvas.height),
    r: randomBetween(2.5, 6),
    alpha: randomBetween(0.05, 0.10), // lower opacity
    speedX: randomBetween(-0.05, 0.05),
    speedY: randomBetween(0.02, 0.12),
    // Orange-brown: hue 20-35, saturation 40-65%, lightness 35-55%
    color: `hsla(${randomBetween(20, 35)}, ${randomBetween(40, 65)}%, ${randomBetween(35, 55)}%, 1)`
  }));

  function drawDust() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of dustParticles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();

      p.x += p.speedX;
      p.y += p.speedY;
      if (p.y > canvas.height) p.y = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
    }
    requestAnimationFrame(drawDust);
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    // reposition particles
    dustParticles.forEach(p => {
      p.x = randomBetween(0, canvas.width);
      p.y = randomBetween(0, canvas.height);
    });
  }
  window.addEventListener('resize', resize);
  resize();

  drawDust();
})();