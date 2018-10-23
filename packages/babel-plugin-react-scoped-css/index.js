// @ts-check
const babelPluginJsxSyntax = require('@babel/plugin-syntax-jsx').default
const md5 = require('md5')
const fsPath = require('path')
// const types = require('@babel/types')

const getTargetResourcePath = (path, stats) => {
  const targetFileDirectoryPath = fsPath.dirname(stats.file.opts.filename)

  if (path.node.source.value.startsWith('.')) {
    return fsPath.resolve(targetFileDirectoryPath, path.node.source.value)
  }

  return require.resolve(path.node.source.value)
}

const notForPlugin = (path, stats) => {
  stats.opts.filetypes = stats.opts.filetypes || {}

  let extension =
    path.node.source.value.lastIndexOf('.') > -1
      ? path.node.source.value.substr(path.node.source.value.lastIndexOf('.'))
      : null
  extension = extension && extension.split('?')[0]
  if (
    extension !== '.css' &&
    Object.keys(stats.opts.filetypes).indexOf(extension) < 0
  ) {
    return true
  }

  const resourcePath = getTargetResourcePath(path, stats)

  if (
    stats.opts.exclude &&
    resourcePath.match(new RegExp(stats.opts.exclude))
  ) {
    return true
  }

  return false
}

// @todo: 每次需要输出一致的 hash，不同机器上
const computeHash = filePath => md5(filePath).substr(0, 5)

module.exports = function({ types: t }) {
  return {
    inherits: babelPluginJsxSyntax,
    visitor: {
      ImportDeclaration(path, stats) {
        if (notForPlugin(path, stats)) {
          return
        }
        const hash = computeHash(stats.file.opts.filename)
        path.node.source.value = `${path.node.source.value}?scopeId=${hash}`
      },
      JSXElement(path, stats) {
        // 判断是否是 html 标签（以小写字母开头）
        if (t.react.isCompatTag(path.node.openingElement.name.name)) {
          const hash = computeHash(stats.file.opts.filename)
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
