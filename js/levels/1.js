function draw({ enemy, block, portal }) {
  // Draw Cubes
  // drawCubes(block, { pict: 1, startX: 0, startY: 1, amount: 3 })
  // drawCubes(block, { pict: 1, startX: 6, startY: 2.2, amount: 3 })
  // drawCubes(block, { pict: 1, startX: 6.5, startY: 4.3, amount: 2 })
  // drawCubes(block, { pict: 1, startX: 12, startY: 3, amount: 3 })
  // drawCubes(block, { pict: 1, startX: 17, startY: 4, amount: 3 })
  // drawCubes(block, { pict: 1, startX: 25, startY: 2.2, amount: 50 })

  // Draw Spikes
  drawSpikes(enemy, { pict: 1, startX: 10, startY: 1, amount: 2 })
  drawSpikes(enemy, { pict: 1, startX: 10, startY: 3, amount: 2 })
  drawSpikes(enemy, { pict: 1, startX: 10, startY: 4, amount: 2 })
  // drawSpikes(enemy, { pict: 1, startX: 30, startY: 3.2, amount: 2 })
  // drawSpikes(enemy, { pict: 1, startX: 38, startY: 3.2, amount: 3 })
  // drawSpikes(enemy, { pict: 1, startX: 45, startY: 3.2, amount: 3 })
  // drawSpikes(enemy, { pict: 1, startX: 75, startY: 3.2, amount: 1 })

  // Draw portals
  drawPortal(portal, { portalName: 'ship', startX: 1, startY: .2 })
  drawPortal(portal, { portalName: 'cube', startX: 20, startY: 0 })
}

function drawCubes(block, { pict, amount, startX = 0, startY = 1 }) {
  for (let i = 0; i < amount; i++) {
    block.add({
      img: pict,
      x: l,
      unitX: startX + i,
      unitY: startY
    })
  }
}

function drawSpikes(enemy, { pict, amount, startX = 0, startY = 1 }) {
  for (let i = 0; i < amount; i++) {
    enemy.add.spike({
      img: pict,
      x: window.innerWidth,
      unitX: startX + i,
      unitY: startY
    })
  }
}

function drawPortal(portal, { portalName, startX, startY }) {
  portal.add({
    portal: portalName,
    x: window.innerWidth,
    unitX: startX,
    unitY: startY
  })
}

export default draw