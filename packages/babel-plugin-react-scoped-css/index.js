// @ts-check
const babelPluginJsxSyntax = require('@babel/plugin-syntax-jsx').default
const md5 = require('md5')

const getFilenameFromPath = filePath => {
  const parts = filePath.split('/')
  return parts[parts.length - 1].split('?')[0]
}

const forPlugin = (path, stats) => {
  let { include: includeRegExp } = stats.opts
  if (!includeRegExp) {
    includeRegExp = /\.scoped\.(sa|sc|c)ss$/
  }
  const filename = getFilenameFromPath(path.node.source.value)
  return filename.match(new RegExp(includeRegExp))
}

module.exports = function({ types: t }) {
  const computedHash = {}
  let lastHash = ''

  const computeHash = filePath => {
    if (computedHash[filePath]) {
      return computedHash[filePath]
    }

    const filename = getFilenameFromPath(filePath)
    const hash = md5(filename + lastHash).substr(0, 8)
    computedHash[filePath] = hash
    lastHash = hash
    return hash
  }

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
        if (
          !this.hasScopedCss ||
          path.node.openingElement.name.type === 'JSXMemberExpression'
        ) {
          return
        }
        const hash = computeHash(stats.file.opts.filename)
        path.node.openingElement.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier(`data-v-${hash}`),
            t.jsxExpressionContainer(t.stringLiteral('')),
          ),
        )
      },
    },
  }
}
