const BOARD_WIDTH = 400
const BOARD_HEIGHT = 400
const MOVE_LENGHT = 10

// изначальное состояние игры

/*let initialState = {
    "player":
      {
        "x": 175
      },
    "ball":
      {
        "x": 200,
        "y": 400,
        "angle": 0.54
      },
    "bricks": [
      {
        "x": 175,
        "y": 50
      }
    ]
  }

// внутреннее состояние сцены (в начале игры равно изначальному)
let innerState = initialState
*/
// возвращает новые координаты
function getNewCoordinates(x, y, angle) {
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
  else {
    console.log('чо-то')
    console.log(angle)
  }
	
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
      console.log(123123123)
		  newAngle = Math.PI - newAngle
    }
    else {
      newAngle = 3 * Math.PI - newAngle
    }
	}
	if(newY > BOARD_HEIGHT) {
		console.log("произошло столкновение с нижней границей области")
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

	return {newX, newY, newAngle}
}

// пересчитывает состояние каждый тик
function tick(currentState, playerPosition) {
	console.log(currentState)
	let newState = currentState;
	let {newX, newY, newAngle} = getNewCoordinates(currentState.ball.x, currentState.ball.y, currentState.ball.angle)
	newState.player.x = playerPosition
	newState.ball.x = newX
	newState.ball.y = newY
	newState.ball.angle = newAngle
	return newState
}

function getResponse(innerState) {
  return innerState
}

//console.log(getResponse(innerState))
//console.log(tick(initialState, 200))
//console.log(getNewCoordinates(200, 400, 0.54))

if (typeof module !== 'undefined' &&  typeof module.exports !== 'undefined') {
  module.exports = getNewCoordinates
}

