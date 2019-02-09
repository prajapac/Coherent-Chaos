module.exports = {
    defaultExample: 'DefaultExample.md',
    webpackConfig: require('./webpack.dev.js'),
    sections: [
        {
            name: 'Components',
            components: './src/components/**/*.js',
        },
        {
            name: 'Pages',
            components: './src/pages/**/*.js',
        }
    ]
};
