document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById(
    'paintCanvas'
  ) as HTMLCanvasElement;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let painting = false;
  canvas.width = 400;
  canvas.height = 400;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function startPosition(e: MouseEvent) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e: MouseEvent) {
    if (!painting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop
    );
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);
});
