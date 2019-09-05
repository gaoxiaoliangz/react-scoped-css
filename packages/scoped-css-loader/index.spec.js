// @ts-check
const path = require('path')
const fs = require('fs')
const loader = require('.')
const { mockCompiler } = require('./mock-compiler')

const readFixtures = () => {
  const dir = path.resolve(__dirname, './fixtures')
  const files = fs.readdirSync(dir)

  return files.map(f => {
    return {
      filename: f,
      path: path.resolve(dir, f),
    }
  })
}

describe('scoped-css-loader', () => {
  describe('with scopeId', () => {
    readFixtures().forEach(fixture => {
      it(fixture.filename, async () => {
        const output = mockCompiler(fixture, loader)
        expect(output).toMatchSnapshot()
      })
    })
  })

  describe('without scopeId', () => {
    readFixtures().forEach(fixture => {
      it(fixture.filename, async () => {
        const output = mockCompiler(fixture, loader, filename => filename)
        expect(output).toMatchSnapshot()
      })
    })
  })
})
