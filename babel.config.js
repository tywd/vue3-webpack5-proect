// vant 按需引入
// "babel-plugin-import": "^1.13.5",
// "ts-import-plugin": "^2.0.0",
module.exports = {
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant'],
        ['@babel/plugin-transform-runtime',
            {
                regenerator: false
            }
        ],
    ]
}