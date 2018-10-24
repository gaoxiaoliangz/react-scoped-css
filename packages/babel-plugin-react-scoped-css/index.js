// @ts-check
const babelPluginJsxSyntax = require('@babel/plugin-syntax-jsx').default
const md5 = require('md5')

const forPlugin = (path, stats) => {
  let { include: includeRegExp } = stats.opts
  if (!includeRegExp) {
    includeRegExp = /\.scoped\.(s)?css$/
  }
  const importPath = path.node.source.value
  const parts = importPath.split('/')
  const filename = parts[parts.length - 1].split('?')[0]
  return filename.match(new RegExp(includeRegExp))
}

// @todo: 每次需要输出一致的 hash，不同机器上
const computeHash = filePath => md5(filePath).substr(0, 8)

module.exports = function({ types: t }) {
  return {
    inherits: babelPluginJsxSyntax,
    pre() {
      this.hasScopedCss = false
    },
    visitor: {
      ImportDeclaration(path, stats) {
        if (!forPlugin(path, stats)) {
          return
        }
        this.hasScopedCss = true
        const hash = computeHash(stats.file.opts.filename)
        path.node.source.value = `${path.node.source.value}?scopeId=${hash}`
      },
      JSXElement(path, stats) {
        if (!this.hasScopedCss) {
          return
        }
        if (t.react.isCompatTag(path.node.openingElement.name.name)) {
          const hash = computeHash(stats.file.opts.filename)
          path.node.openingElement.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier(`data-v-${hash}`),
              t.jsxExpressionContainer(t.stringLiteral(''))
            )
          )
        }
      },
    },
  }
}
