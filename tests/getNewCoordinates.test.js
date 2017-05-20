var expect = require('chai').expect;
var getNewCoordinates = require("./../engine.js")

alert = function () {}
location = {}
location.reload = function () {}

describe('get new coordinates', () => {
  it('летит вправо вверх', () => {
    expect(getNewCoordinates(200, 400, 0.54)).to.deep.equal({newX: 204.28854340681912, newY: 397.42932004173446, newAngle: 0.54, newBricks: []})
  })
  
  it('летит вправо вверх + столкновение справа', () => {
    expect(getNewCoordinates(398, 200, 0.54)).to.deep.equal({newX: 397.71145659318086, newY: 197.42932004173443, newAngle: 2.601592653589793, newBricks: []})

  })

  it('летит влево вверх + столкновение сверху', () => {
    expect(getNewCoordinates(200, 2, 1.59)).to.deep.equal({newX: 199.90398753549152, newY: 2.999078075671454, newAngle: 4.693185307179586, newBricks: []})
  })


  it('летит вправо вниз + столкновение справа', () => {
    expect(getNewCoordinates(398, 200, 6.1)).to.deep.equal({newX: 397.08365780778706, newY: 200.91081252136047, newAngle: 3.3247779607693797, newBricks: []})
  })


  it('летит влево вниз + столкновение снизу', () => {
    expect(getNewCoordinates(200, 398, 4.5)).to.deep.equal({newX: 198.9460210028461, newY: 397.11234941167453, newAngle: 1.7831853071795862, newBricks: []})
  })

  it('летит влево вниз + столкновение слева', () => {
    expect(getNewCoordinates(200, 398, 4.5)).to.deep.equal({newX: 198.9460210028461, newY: 397.11234941167453, newAngle: 1.7831853071795862, newBricks: []})
  })
})
