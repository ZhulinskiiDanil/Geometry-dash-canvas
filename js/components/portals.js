import { ctx } from '../canvas.js'
import settings from '../settings.js'

class Portals {
  constructor() {
    this.all = []
  }

  add({ portal, x, unitX = 0, unitY = 0 }) {
    if (!portal) return
    const size = window.innerWidth / 100 + window.innerHeight / 100
    const w = size * 5
    const h = w * 1.7
    const y = window.innerHeight - window.innerHeight / 4

    this.all.push({
      portal,
      x: x + w + size * 3 * unitX,
      y: y - h - size * 3 * unitY,
      w: w,
      h: h
    })
  }

  draw() {
    this.all.forEach(elm => {
      elm.x -= settings.speed
      const image = Object.assign(
        new Image(),
        {src: `img/portals/${elm.portal}.webp`}
      )
      if (settings.collision) {
        ctx.fillStyle = 'red'
        ctx.fillRect(elm.x, elm.y, elm.w, elm.h)
      }

      ctx.drawImage(image, elm.x, elm.y, elm.w, elm.h)
    })
  }
}

export default new Portals()