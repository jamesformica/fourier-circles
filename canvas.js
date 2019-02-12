const _clear = document.getElementById('clear')
const _input = document.getElementById('input')
const _canvas = document.getElementById('canvas')

_canvas.width = _canvas.getBoundingClientRect().width
_canvas.height = _canvas.getBoundingClientRect().height

let cirlces = []
let path = []

const ctx = _canvas.getContext('2d')

let currentX, currentY

const loop = () => {
  currentX = _canvas.width / 2
  currentY = _canvas.height / 2

  ctx.clearRect(0, 0, _canvas.width, _canvas.height)
  renderCircles()

  requestAnimationFrame(loop)
}


const renderCircles = () => {
  cirlces.forEach((circle, index) => {
    ctx.beginPath()
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 1
    ctx.globalAlpha = 1
    ctx.arc(currentX, currentY, circle.radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()

    circle.angle += circle.speed / 100
    currentX = currentX + circle.radius * Math.cos(circle.angle)
    currentY = currentY + circle.radius * Math.sin(circle.angle)

    if (index === cirlces.length - 1) {
      path.push({ x: currentX, y: currentY })
    }
  })


  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 3
  ctx.globalAlpha = 1
  path.forEach(({ x, y }, index) => {
    if (index === 0) return

    const { x: prevX, y: prevY } = path[index - 1]
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(x, y)
  })
  ctx.stroke()
  ctx.closePath()
}

const setCircles = () => {
  try {
    cirlces = JSON.parse(_input.value)
    path = []
  } catch (e) {
    console.log(`Oops, keep fixing it: ${e.message}!`)
  }
}

const clearPath = () => {
  path = []
}

_input.addEventListener('input', setCircles)
_clear.addEventListener('click', clearPath)

const options = [
  [
    {
      "radius": 60,
      "speed": 90,
      "angle": 180
    },
    {
      "radius": 120,
      "speed": -8,
      "angle": 0
    }
  ],
  [
    {
      "radius": 60,
      "speed": 3,
      "angle": 180
    },
    {
      "radius": 80,
      "speed": -10,
      "angle": 0
    },
    {
      "radius": 40,
      "speed": 20,
      "angle": 180
    }
  ],
  [
    {
      "radius": 60,
      "speed": 10,
      "angle": 180
    },
    {
      "radius": 180,
      "speed": -8,
      "angle": 0
    },
    {
      "radius": 40,
      "speed": -20,
      "angle": 180
    }
  ],
  [
    {
      "radius": 20,
      "speed": 60,
      "angle": 180
    },
    {
      "radius": 100,
      "speed": -1,
      "angle": 0
    },
    {
      "radius": 100,
      "speed": 50,
      "angle": 0
    }
  ],
  [
    {
      "radius": 100,
      "speed": -3,
      "angle": 180
    },
    {
      "radius": 60,
      "speed": -2,
      "angle": 0
    },
    {
      "radius": 10,
      "speed": 2,
      "angle": 180
    },
    {
      "radius": 20,
      "speed": 10,
      "angle": 80
    },
    {
      "radius": 40,
      "speed": 10,
      "angle": 120
    }
  ]
]

const randomOne = options[Math.floor(Math.random() * options.length)]
_input.value = JSON.stringify(randomOne, null, '  ')

setCircles()

loop()