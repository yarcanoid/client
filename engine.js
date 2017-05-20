const BOARD_WIDTH = 400
const BOARD_HEIGHT = 400
const MOVE_LENGHT = 5
const PLATFORM_WIDTH = 100

// возвращает новые координаты
function getNewCoordinates(x, y, angle, platformX, bricks = []) {
  if(bricks.length == 0) {
    alert("Выиграл")
    location.reload()
  }

	let newX = 0
	let newY = 0
	let newAngle = 0

  if(angle > 0 && angle < Math.PI / 2) {
    console.log("летит вправо вверх")
    newX = x + MOVE_LENGHT * Math.cos(angle)
    newY = y - MOVE_LENGHT * Math.sin(angle)
    newAngle = angle
  }
  else if(angle >= Math.PI / 2 && angle < Math.PI) {
    console.log("летит влево вверх")
    newX = x + MOVE_LENGHT * Math.cos(angle)
    newY = y - MOVE_LENGHT * Math.sin(angle)
    newAngle = angle
  }
  else if(angle >= Math.PI && angle < 3 * 2 * Math.PI / 4) {
    console.log("летит влево вниз")
    newX = x + MOVE_LENGHT * Math.cos(angle)
    newY = y - MOVE_LENGHT * Math.sin(angle)
    newAngle = angle
  }
  else if(angle >= 3 * 2 * Math.PI / 4 && angle < 2 * Math.PI) {
    console.log("летит право вниз")
    newX = x + MOVE_LENGHT * Math.cos(angle)
    newY = y - MOVE_LENGHT * Math.sin(angle)
    newAngle = angle
  }
	
  // обрабатываем столкновения с границами игрового поля
	if(newX > BOARD_WIDTH) {
		console.log("произошло столкновение с правой границей области")
		newX = BOARD_WIDTH - (newX - BOARD_WIDTH)
    if (newAngle < Math.PI) {
		  newAngle = Math.PI - newAngle
    }
    else {
      newAngle = 3 * Math.PI - newAngle
    }
	}
	if(newX < 0) {
		console.log("произошло столкновение с левой границей области")
		newX = Math.abs(newX)
    if (newAngle < Math.PI) {
		  newAngle = Math.PI - newAngle
    }
    else {
      newAngle = 3 * Math.PI - newAngle
    }
	}
	if(newY > BOARD_HEIGHT) {
		console.log("произошло столкновение с нижней границей области")
    if (newX < platformX - 10 || newX > platformX + PLATFORM_WIDTH + 10) {
      // не попали в платформу
      alert("Проиграл")
      location.reload()
    }
		newY = BOARD_HEIGHT - (newY - BOARD_HEIGHT)
    if (newAngle < Math.PI) {
		  newAngle = Math.PI - newAngle
    }
    else {
      newAngle = 2 * Math.PI - newAngle
    }
	}
	if(newY < 0) {
		console.log("произошло столкновение с верхней границей области")
		newY = Math.abs(newY)
		newAngle = 2 * Math.PI - newAngle
	}

  // обрабатываем столкновение с бриксом
  newBricks = []
  bricks.forEach(function(brick) {
    if(newX > brick.x - 10 &&
      newX < brick.x + 50 + 10 &&
      newY > brick.y - 10 &&
      newY < brick.y + 20 + 10) {
      console.log("произошло столкновение с бриком")
      
      newAngle = (0.17 + Math.random() * 1.22) * Math.ceil(Math.random() * 3)
    }
    else {
      newBricks.push(brick)
    }
  })
  return {newX, newY, newAngle, newBricks}
}

// пересчитывает состояние каждый тик
function tick(currentState, playerPosition) {
	let newState = currentState
	let {newX, newY, newAngle, newBricks} = getNewCoordinates(currentState.ball.x, currentState.ball.y, currentState.ball.angle, playerPosition, currentState.bricks)
	newState.player.x = playerPosition
	newState.ball.x = newX
	newState.ball.y = newY
	newState.ball.angle = newAngle
  newState.bricks = newBricks
	return newState
}


function getResponse(innerState) {
  return innerState
}

if (typeof module !== 'undefined' &&  typeof module.exports !== 'undefined') {
  module.exports = getNewCoordinates
}

