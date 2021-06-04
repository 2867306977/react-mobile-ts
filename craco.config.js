const CracoLessPlugin = require('craco-less');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@brand-primary': '#e94f4f' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        // https://github.com/evrone/postcss-px-to-viewport
        pxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 375, // 设计稿宽度
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['body'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: /node_modules/,
        }),
      ],
    },
  },
};
