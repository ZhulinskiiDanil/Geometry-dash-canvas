const w = window.innerWidth
const h = window.innerHeight

const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute('width', w)
canvas.setAttribute('height', h)

function clear() {
  ctx.clearRect(0, 0, w, h)
}

window.addEventListener('resize', () => {
  canvas.setAttribute('width', window.innerWidth)
  canvas.setAttribute('height', window.innerHeight)
})

export {
  ctx,
  clear
}