const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist/app"),
  },
  mode: "development",
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        loader: require.resolve("babel-loader"),
        include: path.join(__dirname, "src"),
      },
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
              localIdentName: "[local]--[hash:base64:5]",
            },
          },
          { loader: "scoped-css-loader" },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
};
