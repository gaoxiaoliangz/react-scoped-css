const { getLoader, loaderByName } = require('@craco/craco')

const addScopedCssLoader = targetRule => {
  const rules = targetRule.use || targetRule.loader

  let cssLoaderIndex = -1
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (rule.loader && rule.loader.includes('css-loader')) {
      cssLoaderIndex = i
      break
    }
  }

  if (cssLoaderIndex !== -1) {
    const scopedCssRule = { loader: require.resolve('scoped-css-loader') }
    rules.splice(cssLoaderIndex + 1, 0, scopedCssRule)
  } else {
    return console.log('no css-loader found')
  }
}

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths },
  }) => {
    // add babel-plugin-react-scoped-css
    const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'))
    if (isFound) {
      match.loader.options.plugins.push(require.resolve('babel-plugin-react-scoped-css'))
    } else {
      return console.log('no babel loader found')
    }

    // add scoped-css-loader
    const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf)
    if (!oneOfRule) {
      return console.log(
        "Can't find a 'oneOf' rule under module.rules in the " + `${env} webpack config!`,
        'webpack+rules+oneOf',
      )
    }

    const cssRule = oneOfRule.oneOf.find(
      rule =>
        rule.test &&
        rule.test.toString().includes('.css$') &&
        rule.test.toString().indexOf('.module') === -1,
    )
    if (!cssRule) {
      console.log(
        "Can't find the webpack rule to match css files in the " + `${env} webpack config!`,
      )
    } else {
      addScopedCssLoader(cssRule)
    }

    const sassRule = oneOfRule.oneOf.find(
      rule =>
        rule.test &&
        rule.test.toString().includes('scss|sass') &&
        rule.test.toString().indexOf('.module') === -1,
    )
    if (!sassRule) {
      console.log(
        "Can't find the webpack rule to match scss/sass files in the " + `${env} webpack config!`,
      )
    } else {
      addScopedCssLoader(sassRule)
    }

    return webpackConfig
  },
}
