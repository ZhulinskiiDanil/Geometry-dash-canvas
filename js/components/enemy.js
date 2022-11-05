import { ctx } from '../canvas.js'
import settings from '../settings.js'

class Enemy {
  constructor() {
    const initSize = window.innerWidth / 100 + window.innerHeight / 100

    this.all = []
    this.speed = settings.speed

    this.add = {
      spike: (({ x, unitX = 1, unitY = 1 }) => {
        const size = initSize * 3
        const collisionOffW = size * .4
        const collisionOffH = size * .6
        
        this.all.push({
          name: 'default_spike',
          img: Object.assign(new Image(), {
            src: 'img/spikes/default_spike.png'
          }),
          x: x + size * unitX - size + collisionOffW * .7,
          y: window.innerHeight - window.innerHeight / 4 - collisionOffH * unitY - ((size - collisionOffH) * (unitY - 1)),
          w: collisionOffW,
          h: collisionOffH,
          draw() {
            this.x -= settings.speed

            // DRAW RED COLLISION
            if (settings.collision && this.x < window.innerWidth) {
              ctx.fillStyle = 'red'
              ctx.fillRect(this.x, this.y, this.w, this.h)
            }

            if (this.x < window.innerWidth) {
              // Image
              ctx.drawImage(
                this.img,
                this.x - size + this.w * 1.7,
                this.y - (size - collisionOffH),
                size,
                size
              )
            }
          }
        })
      }).bind(this)
    }
  }

  draw() {
    this.all.forEach((elm, index) => {
      if (elm.x < -elm.w * 2) this.all.splice(index, 1)
      elm.draw()
    })
  }
}

export default new Enemy()