var expect = require('chai').expect;

var getNewCoordinates = require("./../engine.js")

describe('get new coordinates', () => {
  /*
  it('летит вправо вверх', () => {
    expect(getNewCoordinates(200, 400, 0.54)).to.deep.equal({newX: 205.14135991653114, newY: 391.42291318636177, newAngle: 0.54})
    expect(getNewCoordinates(205.14135991653114, 391.42291318636177, 0.54)).to.deep.equal({newX: 210.2827198330623, newY: 382.84582637272354, newAngle: 0.54})

    //console.log(getNewCoordinates(205.14135991653114, 391.42291318636177, 0.54))
  })
  
  it('летит вправо вверх + столкновение справа', () => {
    expect(getNewCoordinates(398, 200, 0.54)).to.deep.equal({newX: 396.85864008346886, newY: 191.42291318636177, newAngle: 2.601592653589793})
    expect(getNewCoordinates(396.85864008346886, 191.42291318636177, 2.601592653589793)).to.deep.equal({newX: 391.7172801669377, newY: 182.84582637272354, newAngle: 2.601592653589793})

    //console.log(getNewCoordinates(396.85864008346886, 191.42291318636177, 2.601592653589793))
  })
  it('летит влево вверх + столкновение сверху', () => {
    expect(getNewCoordinates(200, 2, 1.59)).to.deep.equal({newX: 199.80797507098308, newY: 7.998156151342908, newAngle: 4.693185307179586})
    expect(getNewCoordinates(199.80797507098308, 7.998156151342908, 4.693185307179586)).to.deep.equal({newX: 199.61595014196615, newY: 17.996312302685816, newAngle: 4.693185307179586})
    //console.log(getNewCoordinates(200, 2, 1.59))
  })

*/

  it('летит вправо вниз + столкновение справа', () => {
    expect(getNewCoordinates(398, 200, 6.1)).to.deep.equal({newX: 392.1673156155742, newY: 201.82162504272097, newAngle: 3.3247779607693797})
  })
})
