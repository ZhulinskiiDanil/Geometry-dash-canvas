import { ctx, clear } from './canvas.js'

// Game
import bg from './components/bg.js'
import floor from './components/floor.js'
import User from './components/user.js'
import block from './components/block.js'
import enemy from './components/enemy.js'
import portal from './components/portals.js'

// UI
import menu from './components/ui/menu.js'

// Levels
import drawLevel_1 from './levels/1.js'

const user = new User(enemy, block, portal)

function render() {
  clear()
  
  bg.draw()
  floor.draw()
  user.draw()
  enemy.draw()
  block.draw()
  portal.draw()
  
  // Если зажата кнопка прыгаем
  if (!user.readyToJump && user.mousedown) {
    const notSupportedModes = ['ship', 'ball']
    if (!notSupportedModes.includes(user.mode)) {
      user.readyToJump = true
      user.jumped = true
      user.jump()
    }
  }

  if (user.stoped) return
  if (user.lose) {
    menu.draw()
    return
  }

  requestAnimationFrame(render)
}

drawLevel_1({ enemy, block, portal })

document.addEventListener('mousedown', e => {
  user.mousedown = true
})

document.addEventListener('mouseup', e => {
  user.mousedown = false
})

render()