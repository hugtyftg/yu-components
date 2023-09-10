const colors = ['#ffa502', '#ff6348', '#ff4757', '#ff2ed573', '#1e90ff', '#3742fa'];
export default class TextParticleClass {
  constructor(x, y, ctx) {
    // 粒子初始位置
    this.x = x;
    this.y = y;
    // 粒子初始速度（随机）
    this.vx = 0.5 - Math.random();
    this.vy = Math.random() - 1.5;
    // 重力加速度
    this.g = 0.05;
    // 随机选取粒子颜色
    this.color = colors[Math.random() * colors.length | 0];
    // 控制文字显示多久才散开，也就是说多久以后才展示粒子重力加速下降的效果
    this.wait = 40;
    // canvas 2d context
    this.ctx = ctx;
  }
  update() {
    if (this.wait < 0) {
      this.x += this.vx;
      this.y += this.vy;
      // 重力加速度作用下，粒子在垂直方向加速下落
      this.vy += this.g;
    }
    this.wait--;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}