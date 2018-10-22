// @ts-check
const babelPluginJsxSyntax = require('@babel/plugin-syntax-jsx').default
const md5 = require('md5')
// const types = require('@babel/types')
// types.booleanLiteral

module.exports = function({ types: t }, _, filePath) {
  // @ts-ignore
  const hash = md5(filePath).substr(0, 5) // @todo: 每次需要输出一致的 hash，不同机器上
  return {
    inherits: babelPluginJsxSyntax,
    visitor: {
      ImportDeclaration() {
        console.log('ImportDeclaration')
      },
      JSXElement(path, stats) {
        // 判断是否是 html 标签（以小写字母开头）
        if (t.react.isCompatTag(path.node.openingElement.name.name)) {
          path.node.openingElement.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier(`data-v-${hash}`),
              t.jsxExpressionContainer(t.booleanLiteral(true)),
            ),
          )
        }
      },
    },
  }
}
