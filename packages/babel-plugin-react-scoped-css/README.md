# React scoped CSS ![](https://api.travis-ci.org/gaoxiaoliangz/react-scoped-css.svg?branch=master)

CSS encapsulation solution for React

## Why

In order to solve the problem of css encapsulation, there are two main approaches, css-modules and css-in-js. However, both of them have a very very big problem. The developer experience is not good, by which I mean you often have to write more code than you expect to achieve a simple style. With react-scoped-css, you can just write the normal css you know, while having the advantage of css encapsulation!

## How does it work

Write your css in a file ends with `.scoped.css` (`scss` & `sass` are also supported)

```css
/* Title.scoped.css */
.title {
  background: #999;
}

p {
  color: #ddd;
}
```

Import the css file

```js
// Title.jsx
import React from 'react'
import './Title.scoped.css'

const Title = props => {
  return (
    <h1 className="title">
      <p>{props.children}</p>
    </h1>
  )
}

export default Title
```

Then, in the html, component with scoped css file imported has a unique `data-v-<hash>` attribute on the html element tag, and the css selector also has a corresponding hash like `selector[data-v-<hash>]`. So all the styles in `Title.scoped.css` are scoped to `Title.jsx`.

## How to use

### Use in an existing create-react-app project (which hasn't been ejected yet)

Since create-react-app doesn't allow you to change webpack and babel config. So in this scenario, you have to use [craco](https://github.com/sharegate/craco) to override webpack config. Luckily you don't have to do it manually, I created a craco plugin that can do it for you.

Setup craco following [this guide](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#installation)

Then, install craco-plugin-scoped-css

```
yarn add craco-plugin-scoped-css
```

create a `craco.config.js` in your project root

```js
module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
}
```

### Manual setup

You have to add one babel plugin and one webpack loader.

**the babel plugin**

```
yarn add babel-plugin-react-scoped-css --dev
```

and in your babelrc add

```json
"plugins": ["babel-plugin-react-scoped-css"]
```

also note that you can define your own matching rule like this

```json
"plugins": [
  [
    "babel-plugin-react-scoped-css",
    {
      "include": ".local.(sa|sc|c)ss$"
    }
  ]
]
```

If you have other plugins installed, just add it to the list, order doesn't matter.

Note: this plugin accepts `include`(RegExp, which defaults to `/\.scoped\.(sa|sc|c)ss$/`) to config which css file to be identified as scoped.

**the webpack loader**

```
yarn add scoped-css-loader --dev
```

and in your webpack.config.js

```js
{
  test: /\.(sc|c|sa)ss$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
      },
    },
    // You have to put in after `css-loader` and before any `pre-precessing loader`
    { loader: 'scoped-css-loader' },
    {
      loader: 'sass-loader',
    },
  ],
},
```

That's it for the configuration.

## Some common use cases with react scoped css

Check out [simple-scoped-css-example](https://github.com/gaoxiaoliangz/react-scoped-css/tree/master/examples/simple)
