# craco-plugin-scoped-css ![](https://api.travis-ci.org/gaoxiaoliangz/react-scoped-css.svg?branch=master)

This is a craco plugin that adds scoped css support to create-react-app version >= 2 (this package is part of [react scoped css solution](https://github.com/gaoxiaoliangz/react-scoped-css))

## Installation

First, follow the [`craco` Installation Instructions](https://github.com/sharegate/craco/blob/master/packages/craco/README.md##installation) to install the `craco` package, create a `craco.config.js` file, and modify the scripts in your `package.json`.

Then install `craco-plugin-scoped-css`:

```bash
$ yarn add craco-plugin-scoped-css

# OR

$ npm i -S craco-plugin-scoped-css
```

## Usage

Here is a complete `craco.config.js` configuration file that adds react-scoped-css to `create-react-app`:

```js
module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
}
```

## Some common use cases with react scoped css

Check out [simple-scoped-css-example](https://github.com/gaoxiaoliangz/react-scoped-css/tree/master/examples/simple)
