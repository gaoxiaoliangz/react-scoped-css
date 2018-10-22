// @ts-check
const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')
const qs = require('qs')

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
}

module.exports = function(source, ...args) {
  // console.log(Object.keys(this))
  // console.log(this.query)
  // console.log(this.resource.)

  // @ts-ignore
  const resourceQuery = qs.parse(this.resource.split('?')[1])
  console.log(resourceQuery.scopeId)
  // console.log(this.currentRequest)
  // @ts-ignore
  // const options = getOptions(this)
  // console.log(options)

  // validateOptions(schema, options, 'Example Loader')

  // Apply some transformations to the source...

  return `export default ${JSON.stringify(source)}`
}
