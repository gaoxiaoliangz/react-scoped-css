const fs = require('fs')
const md5 = require('md5')

const mockCompiler = ({ path, filename }, loader, getResource) => {
  const codeContent = fs.readFileSync(path, {
    encoding: 'utf8',
  })
  const context = {
    resource: getResource ? getResource(filename) : `${filename}?scopeId=${md5(filename)}`,
  }
  return loader.call(context, codeContent)
}

module.exports = {
  mockCompiler,
}
