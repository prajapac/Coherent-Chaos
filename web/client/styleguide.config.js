module.exports = {
    defaultExample: 'DefaultExample.md',
    webpackConfig: require('./webpack.dev.js'),
    sections: [
        {
            name: 'Components',
            components: './src/components/**/!(test).js',
        },
        {
            name: 'Pages',
            components: './src/pages/**/!(test).js',
        }
    ]
};
