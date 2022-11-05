import { ctx } from "../../canvas.js"

class Menu {
  constructor() {
    this.router = {
      push(str = '') {
        const path = `${window.location.origin}/${str}`
        window.location = path
      },
      reload() {
        window.location.reload()
      }
    }
  }

  draw() {
    window.location.reload()
    const size = window.innerWidth / 100 + window.innerHeight / 100
    const retry = {
      img: Object.assign(new Image(), {src: 'img/retry.webp'}),
      x: window.innerWidth / 2 - size * 5,
      y: window.innerHeight / 2 - size * 5,
      w: size * 10,
      h: size * 10
    }

    ctx.fillStyle = 'rgba(0, 0, 0, .8)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    retry.img.onload = () => {
      ctx.drawImage(retry.img, retry.x, retry.y, retry.w, retry.h)
    }

    document.onclick = e => {
      const x = e.clientX
      const y = e.clientY

      const termX = x > retry.x && x < retry.x + retry.w
      const termY = y > retry.y && y < retry.y + retry.h

      if (termX && termY) {
        this.clickToRestart()
      }
    }
  }

  clickToRestart() {
    this.router.reload()
  }
}

export default new Menu()