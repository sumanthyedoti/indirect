const { merge } = require("webpack-merge")
const commonConfig = require("./webpack/webpack.common.js")

module.exports = (envVars) => {
  const { env } = envVars
  const envConfig = require(`./webpack/webpack.${env}.js`)
  return merge(commonConfig, envConfig)
}
