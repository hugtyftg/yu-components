export default class ImgParticleClass {
  constructor(x, y, c, ctx) {
    this.x = x;
    this.y = y;
    this.color = c;
    // canvas 2d context
    this.ctx = ctx;
    this.vy = -Math.random();
    this.vx = Math.random();
    this.t = 0;
  }
  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.vx *= 1.05;
    this.vy *= 1.05;
    this.t++;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.vx / 3, 0, Math.PI * 2, 0);
    this.ctx.fill();
  }
}