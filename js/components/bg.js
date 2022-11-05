import { ctx } from "../canvas.js"
import settings from "../settings.js"

const bg = {
  img: Object.assign(new Image(), {src: 'img/decor/bg/1.png'}),
  x: 0,
  draw() {
    const h = window.innerHeight
    const w = h * (this.img.width / this.img.height)
    // const 

    this.x -= settings.speed / 10
    if (this.x < -w) this.x = this.x + w
    
    for (let i = 0; i < Math.ceil(window.innerWidth / h) + 1; i++) {
      ctx.drawImage(this.img, this.x + w * i, 0, w, h)
    }
  }
}

export default bg