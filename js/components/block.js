import { ctx } from '../canvas.js'
import settings from '../settings.js'

class Block {
  constructor() {
    this.all = []
  }

  draw() {
    this.all.forEach((elm, index) => {
      elm.x -= settings.speed
      if (elm.x < window.innerWidth) {
        ctx.drawImage(elm.image, elm.x, elm.y, elm.w, elm.h + elm.h * .25)
      }

      if (elm.x < -elm.w * 2) this.all.splice(index, 1)
    })
  }

  add({ img, x, unitX = 1, unitY = 1 }) {
    const size = window.innerWidth / 100 + window.innerHeight / 100
    const image = Object.assign(
      new Image(),
      {src: `img/blocks/${img}.png`}
    )

    this.all.push({
      image,
      x: x + (size * 3) * unitX,
      y: window.innerHeight - window.innerHeight / 4 - (size * 3) * unitY,
      w: size * 3,
      h: size * 3 * .8
    })
  }
}

export default new Block()