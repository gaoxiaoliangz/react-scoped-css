// @ts-check
const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')
const { compileStyle } = require('@vue/component-compiler-utils')
const qs = require('qs')

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
}

module.exports = function(source) {
  // @ts-ignore
  const resourceQuery = qs.parse(this.resource.split('?')[1])
  console.log(resourceQuery.scopeId)
  // console.log(this.currentRequest)
  // @ts-ignore
  // const options = getOptions(this)
  // console.log(options)

  // validateOptions(schema, options, 'Example Loader')

  // Apply some transformations to the source...

  // return `export default ${JSON.stringify(source)}`

  const { code, map, errors } = compileStyle({
    source,
    // @ts-ignore
    filename: this.resource,
    id: `data-v-${resourceQuery.scopeId}`,
    // map: inMap,
    scoped: true,
    trim: true,
  })
  if (errors.length) {
    console.log(errors[0])
  }
  return code
}
