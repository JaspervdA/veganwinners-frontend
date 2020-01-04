# Veganwinners-frontend

The frontend repository for our recipe sharing website.

## Start locally

First, change the content of your `node_modules/grommet/scss/vanilla/_vanilla.defaults.scss`:

```
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
/* geel, #EAB126
rood, #F24C4E
groen, #1B7B34*/

$brand-color: #1B7B34;
$brand-neutral-colors: (#0A64A0, #DC2878, #501EB4, #49516F);
$brand-accent-colors: (#00CCEB, #FF7D28);
$brand-link-color: #1B7B34;
$brand-status-colors: (
  critical: #FF324D,
  error: #FF324D,
  warning: #FFD602,
  ok: #8CC800,
  unknown: #a8a8a8,
  disabled: #a8a8a8
) !default;
$brand-grey-colors: (#000001, #333333, #3B3B3B, #434343, #666666);

$button-secondary-color: nth($brand-neutral-colors, 2);

$brand-font-family: 'Work Sans', Arial, sans-serif;
$brand-large-number-font-family: 'Work Sans', Arial, sans-serif;
$code-font-family: Consolas, Menlo, 'DejaVu Sans Mono', 'Liberation Mono', monospace;
$text-strong-font-weight: 500;

$fonts-path: "https://fonts.gstatic.com/s/worksans/v2";

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  src:
    local('Work Sans Light'),
    local('WorkSans-Light'),
    url("#{$fonts-path}/FD_Udbezj8EHXbdsqLUplxampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  src:
    local('Work Sans'),
    local('WorkSans-Regular'),
    url("#{$fonts-path}//ElUAY9q6T0Ayx4zWzW63VJBw1xU1rKptJj_0jans920.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  src:
    local('Work Sans Medium'),
    local('WorkSans-Medium'),
    url("#{$fonts-path}/Nbre-U_bp6Xktt8cpgwaJBampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  src:
    local('Work Sans SemiBold'),
    local('WorkSans-SemiBold'),
    url("#{$fonts-path}/z9rX03Xuz9ZNHTMg1_ghGRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 700;
  src:
    local('Work Sans Bold'),
    local('WorkSans-Bold'),
    url("#{$fonts-path}/4udXuXg54JlPEP5iKO5AmRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}
```

Now you can run:

```
npm install
npm start
```

# Hack for making sure we don't get errors when building a production version

Replace the contents of /node_modules/webpack-manifest-plugin/lib/plugin.js with the following code. Note that lines 35 up till 48 contain the fix.

```
var path = require('path');
var fse = require('fs-extra');
var _ = require('lodash');

function ManifestPlugin(opts) {
  this.opts = _.assign(
    {
      basePath: '',
      publicPath: '',
      fileName: 'manifest.json',
      stripSrc: null,
      transformExtensions: /^(gz|map)$/i,
      writeToFileEmit: false,
      cache: null
    },
    opts || {}
  );
}

ManifestPlugin.prototype.getFileType = function(str) {
  str = str.replace(/\?.*/, '');
  var split = str.split('.');
  var ext = split.pop();
  if (this.opts.transformExtensions.test(ext)) {
    ext = split.pop() + '.' + ext;
  }
  return ext;
};

ManifestPlugin.prototype.apply = function(compiler) {
  var outputName = this.opts.fileName;
  var cache = this.opts.cache || {};
  var moduleAssets = {};

  let userRequest = '';
  if (module.userRequest) {
    userRequest = module.userRequest;
  } else {
    userRequest = 'index.scss';
  }
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('module-asset', function(module, file) {
      moduleAssets[file] = path.join(
        path.dirname(file),
        path.basename(userRequest)
      );
    });
  });

  compiler.plugin(
    'emit',
    function(compilation, compileCallback) {
      var stats = compilation.getStats().toJson();
      var manifest = {};

      _.merge(
        manifest,
        compilation.chunks.reduce(
          function(memo, chunk) {
            var chunkName = chunk.name
              ? chunk.name.replace(this.opts.stripSrc, '')
              : null;

            // Map original chunk name to output files.
            // For nameless chunks, just map the files directly.
            return chunk.files.reduce(
              function(memo, file) {
                // Don't add hot updates to manifest
                if (file.indexOf('hot-update') >= 0) {
                  return memo;
                }
                if (chunkName) {
                  memo[chunkName + '.' + this.getFileType(file)] = file;
                } else {
                  memo[file] = file;
                }
                return memo;
              }.bind(this),
              memo
            );
          }.bind(this),
          {}
        )
      );

      // module assets don't show up in assetsByChunkName.
      // we're getting them this way;
      _.merge(
        manifest,
        stats.assets.reduce(function(memo, asset) {
          var name = moduleAssets[asset.name];
          if (name) {
            memo[name] = asset.name;
          }
          return memo;
        }, {})
      );

      // Append optional basepath onto all references.
      // This allows output path to be reflected in the manifest.
      if (this.opts.basePath) {
        manifest = _.reduce(
          manifest,
          function(memo, value, key) {
            memo[this.opts.basePath + key] = this.opts.basePath + value;
            return memo;
          }.bind(this),
          {}
        );
      } else if (this.opts.publicPath) {
        // Similar to basePath but only affects the value (similar to how
        // output.publicPath turns require('foo/bar') into '/public/foo/bar', see
        // https://github.com/webpack/docs/wiki/configuration#outputpublicpath
        manifest = _.reduce(
          manifest,
          function(memo, value, key) {
            memo[key] = this.opts.publicPath + value;
            return memo;
          }.bind(this),
          {}
        );
      }

      Object.keys(manifest)
        .sort()
        .forEach(function(key) {
          cache[key] = manifest[key];
        });

      var json = JSON.stringify(cache, null, 2);

      compilation.assets[outputName] = {
        source: function() {
          return json;
        },
        size: function() {
          return json.length;
        }
      };

      if (this.opts.writeToFileEmit) {
        var outputFolder = compilation.options.output.path;
        var outputFile = path.join(outputFolder, this.opts.fileName);

        fse.outputFileSync(outputFile, json);
      }

      compileCallback();
    }.bind(this)
  );
};

module.exports = ManifestPlugin;
```

## To production

First, make a build:

```
npm run build
```

Commit this to github. Now, on the server, checkout the new branch / pull the new master. Tada ;)
