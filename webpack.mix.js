const { mix } = require('laravel-mix');
const browser_support = ['last 2 versions', 'IE >= 10', 'Safari >= 8'];
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const exec = require('child_process').execSync;

var project = 'NAME';

/**
 * Assets are handled with laravel mix. See https://laravel.com/docs/5.4/mix.
 */

mix.js('src/js/main.js', '.')
   .sass('src/css/main.scss', '.')
   .sass('src/css/main.pattern-lab.scss', '.')
   .setPublicPath('assets')
   .setResourceRoot('/assets/')
   .sourceMaps();

mix.options({
  extractVueStyles: false,
  processCssUrls: true,
  uglify: {},
  purifyCss: false,
  postCss: [require('autoprefixer')( { browsers: browser_support})],
  clearConsole: false
});

var webpack_extra_config = {
  module: {
    rules: [
      // Add support for sass import globbing.
      {
        test: /\.scss/,
      enforce: "pre",
      loader: "import-glob-loader"
      },
      // Add support for icon fonts.
      {
        test: /\.font\.js/,
        exclude: ['node_modules', 'bower_components'],
        loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?importLoaders=1',
          'webfonts-loader'
        ]
      })
      }
    ]
  },
  plugins: []
};


function buildPatternLab() {
  exec('php pattern-lab/core/console --generate --patterns-only', (error, stdout, stderr) => {
    console.log(`${stdout}`);
    console.log(`${stderr}`);
  })
}

/**
 * Configure browser sync depending on the passed SERVE environment variable.
 */
var browser_sync_options = {
  open: 'external',
  host: 'localhost',
  port: 8123,
  files: [{
    match: [
      'src/components/**/*.twig',
      'src/components/**/*.yml',
      'src/components/**/*.json',
      'src/components/**/*.(png|jpe?g|svg)'
    ],
    fn: function(event, file) {
      const browserSync = require("browser-sync").get('bs-webpack-plugin');
      if (event === 'change') {
        buildPatternLab();
        browserSync.reload();
      }
    }
  }]
};

if (process.env.SERVE === 'patternlab') {
  browser_sync_options.server = {
    baseDir: ['']
  };
  browser_sync_options.startPath = '/pattern-lab/public/';
  webpack_extra_config.plugins.push(new BrowserSyncPlugin(browser_sync_options));

  // Build pattern-lab once so it's recent from the beginning.
  buildPatternLab();
}
else if (process.env.SERVE === 'app') {
  browser_sync_options.proxy = project + '.local';
  webpack_extra_config.plugins.push(new BrowserSyncPlugin(browser_sync_options));
}

mix.webpackConfig(webpack_extra_config);