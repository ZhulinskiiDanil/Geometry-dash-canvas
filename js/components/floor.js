import { ctx } from "../canvas.js"
import settings from '../settings.js'

const floor = {
  x: 0,
  img: Object.assign(new Image(), {src: 'img/decor/floor.jpg'}),
  draw() {
    ctx.fillStyle = '#2662C3'
    ctx.fillRect(
      0,
      window.innerHeight - window.innerHeight / 4,
      window.innerWidth,
      window.innerHeight / 4
    )

    this.x -= settings.speed

    if (this.x + window.innerHeight / 2 < 0) {
      this.x = this.x + window.innerHeight / 2
    }

    const floors = Math.ceil(window.innerWidth / (window.innerHeight / 2)) + 1
    for (let i = 0; i < floors; i++) {
      ctx.drawImage(
        this.img,
        this.x + (window.innerHeight - window.innerHeight / 2) * i,
        window.innerHeight - window.innerHeight / 4,
        window.innerHeight / 2,
        window.innerHeight / 4
      )

      const grd = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.5, "white");
      grd.addColorStop(1, "transparent");

      ctx.fillStyle = grd
      ctx.fillRect(
        0,
        window.innerHeight - window.innerHeight / 4,
        window.innerWidth,
        2
      )
    }
  }
}

export default floor