const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     [
          //       "@babel/preset-env",
          //       {
          //         targets: {
          //           esmodules: true,
          //         },
          //       },
          //     ],
          //     "@babel/preset-react",
          //   ],
          // },
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/, path.resolve(__dirname, "src/electron")],
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ico|ttf)$/i,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "bundle"),
  },
};
