// @ts-check
const babel = require('@babel/core')
const path = require('path')
const fs = require('fs')
const plugin = require('./')

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

describe('babel-plugin-react-scoped-css', () => {
  readFixtures().forEach(fixture => {
    it(fixture.filename, () => {
      const codeContent = fs.readFileSync(fixture.path, {
        encoding: 'utf8',
      })
      const { code } = babel.transform(codeContent, { plugins: [plugin], filename: fixture.filename })
      expect(code).toMatchSnapshot()
    })
  })
})
