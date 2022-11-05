import { ctx } from "../canvas.js"
import settings from '../settings.js'

class User {
  constructor(enemy, block, portal) {
    const size = window.innerWidth / 100 + window.innerHeight / 100
    this.mult = 3
    this.mode = 'cube'

    this.enemy = enemy
    this.block = block
    this.portal = portal
    this.rotate = 0
    this.maxRotatePower = 360 / 50
    this.rotatePower = 0

    this.w = size * this.mult
    this.h = size * this.mult
    
    this.x = window.innerWidth / 2.6
    this.y = window.innerHeight - window.innerHeight / 4

    this.maxSpeedDown = this.h / 4.5
    this.jumpPower = this.maxSpeedDown
    this.gravityPower = 0
    this.maxGravityPower = this.h / 2

    this.stoped = false
    this.lose = false
    this.mousedown = false
    this.jumped = false
    this.stopJump = false
    this.readyToJump = true
  }

  draw() {
    this.gravity()
    this.moveShip()
    this.collision()
   
    if (this.readyToJump && this.gravityPower !== 0) {
      if (this.rotate > 360) this.rotate = this.rotate - 360
      else this.rotate += this.maxRotatePower / 1.5
    } else if (this.mode !== 'ship') {
      if (this.rotatePower < this.maxRotatePower) this.rotatePower += this.maxRotatePower * 1.5
      else this.rotatePower = this.maxRotatePower

      const rotate = Math.ceil(this.rotate)
      if (rotate % 90 !== 0) {
        if (rotate % 90 < 45 && rotate % 90 > this.rotatePower) {
          this.rotate -= this.rotatePower
        } else if (rotate % 90 >= 45 && rotate % 90 < 90 + this.rotatePower) {
          this.rotate += this.rotatePower
        } else {
          this.rotate = rotate - rotate % 90
        }
      }
    }

    if (settings.collision) {
      ctx.fillStyle = 'red'
      ctx.fillRect(
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
    
    const skin = new Image()
    skin.src = `/img/skins/cube/${settings.cube.skin}.png`
    const skinShip = new Image()
    skinShip.src = `/img/skins/ship/${settings.ship.skin}.png`
    const shipRatio = skinShip.width / skinShip.height

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(this.rotate * Math.PI / 180);

    if (this.mode == 'ship') {
      ctx.drawImage(
        skin,
        -this.w / 3.5,
        -this.h / 1.8,
        this.w / 1.5,
        this.h / 1.5
      )

      ctx.drawImage(
        skinShip,
        -this.w * shipRatio / 2,
        -this.h / 2,
        this.w * shipRatio,
        this.h
      )
    } else {
      ctx.drawImage(
        skin,
        -this.w / 2,
        -this.h / 2,
        this.w,
        this.h
      )
    }

    ctx.restore();
  }

  stopJumping() {
    this.jumped = false
    if (this.mode !== 'ship') this.jumpPower = this.maxSpeedDown
    else this.jumpPower = 0
    this.gravityPower = 0

    setTimeout(() => {
      this.readyToJump = false
    }, 0)
  }

  jump() {
    if (this.stoped || this.lose || !this.readyToJump) return

    this.jumpPower -= this.maxSpeedDown / 18
    this.y -= this.jumpPower
    
    if (this.jumpPower <= -this.maxSpeedDown) {
      this.jumped = false
      this.jumpPower = this.maxSpeedDown
      this.gravityPower = this.maxSpeedDown
      return
    }

    requestAnimationFrame(this.jump.bind(this))
  }

  moveShip() {
    if (this.mode !== 'ship') return
    this.rotate = -25 * 1 / (this.maxSpeedDown / this.jumpPower) - this.rotate / 20

    if (this.mousedown) {
      this.jumpPower += this.maxSpeedDown / 10
    } else {
      this.jumpPower -= this.maxSpeedDown / 13
    }

    this.y -= this.jumpPower
    
    if (this.jumpPower <= -this.maxSpeedDown) {
      this.jumpPower = -this.maxSpeedDown
    } else if (this.jumpPower >= this.maxSpeedDown) {
      this.jumpPower = this.maxSpeedDown
    }
  }

  gravity() {
    if (this.mode === 'ship') return
    if (!this.jumped) this.y += this.gravityPower
    if (this.gravityPower > 0) this.readyToJump = true
    if (this.gravityPower < this.maxGravityPower) {
      this.gravityPower += this.maxGravityPower / 30
    }
  }

  collision() {
    if (this.floorCollision()) {
      this.stopJumping()
      this.y = window.innerHeight - window.innerHeight / 4 - this.h
    }

    this.block.all.forEach(elm => {
      const termX = this.x + this.w + settings.speed > elm.x
        && this.x < elm.x + elm.w
      const termY = this.y + this.h > elm.y
        && this.y < elm.y + elm.h
      

      if (termX && termY) {
        // Если елементы столкнулись
        if (this.y < elm.y) {
          this.stopJumping()
          return this.y = elm.y - this.h
        } else {
          this.lose = true
        }
      }
    })

    this.enemy.all.forEach(elm => {
      const termX = this.x + this.w + settings.speed > elm.x
        && this.x < elm.x + elm.w
      const termY = this.y + this.h > elm.y
        && this.y < elm.y + elm.h

      if (termX && termY) {
        // Если елементы столкнулись
        this.lose = true
      }
    })

    this.portal.all.forEach(elm => {
      const termX = this.x + this.w + settings.speed > elm.x
        && this.x < elm.x + elm.w
      const termY = this.y + this.h > elm.y
        && this.y < elm.y + elm.h

      if (termX && termY) {
        if (this.mode === elm.portal) return
        this.mode = elm.portal
      }
    })
  }

  floorCollision() {
    return this.y + this.h > window.innerHeight - window.innerHeight / 4
  }
}

export default User