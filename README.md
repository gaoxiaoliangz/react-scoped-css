# React scoped CSS 

CSS encapsulation solution for React

[![npm](https://img.shields.io/npm/v/craco-plugin-scoped-css)](https://www.npmjs.com/package/babel-plugin-react-scoped-css) [![npm](https://img.shields.io/npm/dw/babel-plugin-react-scoped-css)](https://www.npmjs.com/package/babel-plugin-react-scoped-css) [![Github Repo stars](https://img.shields.io/github/stars/gaoxiaoliangz/react-scoped-css)](https://github.com/gaoxiaoliangz/react-scoped-css) [![npm](https://img.shields.io/npm/l/react-scoped-css)](https://github.com/gaoxiaoliangz/react-scoped-css/blob/master/LICENSE) ![](https://api.travis-ci.org/gaoxiaoliangz/react-scoped-css.svg?branch=master)

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

Then, in the html, component with scoped css file imported has a unique `data-v-<hash>` attribute on the html element tag, and the css selector also has a corresponding hash like `selector[data-v-<hash>]`. So all the styles in `Title.scoped.css` are scoped to `Title.jsx`. The output will be something like the following.

```html
<h1 class="title" data-v-15763057=""><p data-v-15763057="">React scoped CSS</p></h1>
```

```css
.title[data-v-15763057] {
  background: #309dcf;
}
p[data-v-15763057] {
  color: #fff;
}
```

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

Plugin options:

- `include`(optional, RegExp, defaults to `/\.scoped\.(sa|sc|c)ss$/`): config which css file to be identified as scoped
- `hashSeed` (optional, string): used to calculate attribute hash. (TODO: a better explanation)

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
    // You have to put it after `css-loader` and before any `pre-precessing loader`
    { loader: 'scoped-css-loader' },
    {
      loader: 'sass-loader',
    },
  ],
},
```

That's it for the configuration.

### Deep selector

If you want to affect the child components, you can use the deep selector.

```css
.parent /deep/ .child {
  ...
}
```

This will be converted to

```css
.parent[data-v-15760357] .child {
  ...
}
```

This method might be useful when you want to override the styles of the external libraries.

However, in the recent implementation of sass (dart-sass), `/deep/` is not supported.
You can use `::v-deep` instead. ([related issue](https://github.com/vuejs/vue-cli/issues/3399))

```css
.parent::v-deep .child {
  ...
}
```

When you want to use that, make sure that the version of `@vue/component-compiler-utils` installed in your project's node_modules is >= 2.6.0.

## Some common use cases with react scoped css

Check out [simple-scoped-css-example](https://github.com/gaoxiaoliangz/react-scoped-css/tree/master/examples/simple)

## Common errors

### Fragment : Invalid prop data-v-xxxxxxxx supplied to React.Fragment

`react-scoped-css` won't add data-v attribute to `<></>` or `<React.Fragment></React.Fragment>`. But it won't know for sure that `<Fragment>` is a react fragment and assigned `data-v-` to it ([related issue](https://github.com/gaoxiaoliangz/react-scoped-css/issues/2))

Invalid code
```jsx
import React, { Fragment } from 'react'

export function MyComponent() {
  return (
    <Fragment>
      ...
    </Fragment>
  )
}
```

Valid code
```jsx
import React from 'react'

export function MyComponent() {
  return (
    <>
      ...
    </>
  )
}
```

```jsx
import React from 'react'

export function MyComponent() {
  return (
    <React.Fragment>
      ...
    </React.Fragment>
  )
}
```

## TODOs

- [ ] add Chinese docs
- [ ] add seprated docs for each package
- [ ] a better getting started guide
