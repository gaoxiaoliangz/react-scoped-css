module.exports = {
  devServer: {
    open: false,
  },
  plugins: [
    { plugin: require('craco-antd') },
    // this line last insert is required
    { plugin: require('craco-plugin-scoped-css') },
  ],
}
