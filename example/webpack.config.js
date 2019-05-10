const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },

  mode: 'development',

  resolve: {
    extensions: ['.js'],
  },

  plugins: [
    new CKEditorWebpackPlugin({
      language: 'en',
      additionalLanguages: ['fi']
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      }, {
        test: /\.html$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].html' } },
          { loader: 'extract-loader' },
          { loader: 'html-loader', options: { attrs: ['img:src'] } },
        ]
      }, {
        test: /\.svg$/,
        use: [
          { loader: 'raw-loader' },
        ]
      }, {
        oneOf: [
          {
            test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
            use: [
              { loader: 'style-loader', options: { singleton: true } },
              {
                loader: 'postcss-loader',
                options: styles.getPostCssConfig({
                  themeImporter: {
                    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                  },
                  minify: true
                })
              }
            ]
          }, {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' }
            ]
          }
        ]
      }
    ]
  }
};
