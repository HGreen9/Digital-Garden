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
