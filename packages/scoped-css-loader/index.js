// @ts-check
const { compileStyle } = require('@vue/component-compiler-utils')
const qs = require('qs')

module.exports = function(source) {
  // @ts-ignore
  const resourceQuery = qs.parse(this.resource.split('?')[1])
  if (resourceQuery.scopeId) {
    const { code, map, errors } = compileStyle({
      source,
      // @ts-ignore
      filename: this.resource,
      id: `data-v-${resourceQuery.scopeId}`,
      scoped: true,
      trim: true,
    })
    if (errors.length) {
      console.error(errors[0])
    }
    return code
  }
  return source
}
