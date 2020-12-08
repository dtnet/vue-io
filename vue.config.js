module.exports = {
    publicPath: "/",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: process.env.NODE_ENV === "development",
    productionSourceMap: false,
    devServer: {
        host: '127.0.0.1',
        port: 1338,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
    },

}
