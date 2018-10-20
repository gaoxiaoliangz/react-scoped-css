module.exports = function() {
  return {
    visitor: {
      Program() {
        console.log('Program')
      },
      ImportDeclaration() {
        console.log('ImportDeclaration')
      },
      ExportNamedDeclaration() {
        console.log('ExportNamedDeclaration')
      },
      Identifier(path) {
        const name = path.node.name
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split('')
          .reverse()
          .join('')
      },
    },
  }
}
