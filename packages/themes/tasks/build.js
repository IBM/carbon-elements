/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { formatTokenName, themes, tokens } = require('../lib');

const FILE_BANNER = `// Code generated by @carbon/themes. DO NOT EDIT.
//
// Copyright IBM Corp. 2018, 2018
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
`;
const SCSS_DIR = path.resolve(__dirname, '../scss');
const THEMES_ENTRYPOINT = path.join(SCSS_DIR, 'themes.scss');
const MIXINS_ENTRYPOINT = path.join(SCSS_DIR, '_mixins.scss');
const VARIABLES_ENTRYPOINT = path.join(SCSS_DIR, '_variables.scss');

const defaultTheme = 'white';
const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

async function build() {
  reporter.info('Building scss files for themes...');

  // Create maps for each theme:
  // $carbon--theme--name: (
  //   token-name: token-value
  // ) !default !global;
  // $theme--name: $carbon--theme--name;
  const themeMaps = Object.keys(themes)
    .map(name => {
      const theme = themes[name];
      let scssMap = `$carbon--theme--${name}: (`;
      scssMap += '\n';

      for (const key of Object.keys(theme)) {
        const name = formatTokenName(key);
        const value = theme[key];
        scssMap += `  ${name}: ${value},`;
        scssMap += '\n';
      }

      scssMap += ') !default !global;';
      scssMap += '\n';
      scssMap += `$theme--${name}: $carbon--theme--${name};`;
      scssMap += '\n';

      return scssMap;
    })
    .join('\n');

  // Variables initialized to default theme
  // $token-name: map-get($default-theme, token-name) !default !global;
  const defaultThemeMapName = `$carbon--theme--${defaultTheme}`;
  const initialVariables = Object.keys(tokens)
    .map(group => {
      const groupTokens = tokens[group];
      let variables = '';

      for (const groupToken of groupTokens) {
        const name = formatTokenName(groupToken);
        variables += `$${name}: map-get(${defaultThemeMapName}, ${name}) !default !global;\n`;
      }

      return variables;
    })
    .join('\n');

  // Create carbon--theme mixin, takes a theme as input and reassigns all
  // theme variables using `!global` before resetting at the end of the function
  // block
  let themeMixin = `@mixin carbon--theme($theme: ${defaultThemeMapName}) {\n`;

  // Initialize variables in mixin
  for (const tokenGroup of Object.keys(tokens)) {
    for (const token of tokens[tokenGroup]) {
      const name = formatTokenName(token);
      themeMixin += `  $${name}: map-get($theme, ${name}) !global;\n`;
    }
  }

  // Content block
  themeMixin += '\n';
  themeMixin += '  @content;';
  themeMixin += '\n';

  // If block for default theme to reset mixin
  themeMixin += '\n';
  themeMixin += `  // Reset to default theme after apply in content`;
  themeMixin += '\n';
  themeMixin += `  @if $theme != ${defaultThemeMapName} {
    @include carbon--theme();
  }`;
  themeMixin += '\n';
  themeMixin += '}';

  let themeMixinAlias = `@mixin theme($args...) {
  @include carbon--theme($args..) {
    @content;
  }
}`;

  // Files
  const variables = `${FILE_BANNER}
${themeMaps}

${initialVariables}`;

  const mixins = `${FILE_BANNER}
@import './variables';

${themeMixin}

${themeMixinAlias}`;

  await fs.ensureDir(SCSS_DIR);
  await fs.writeFile(
    VARIABLES_ENTRYPOINT,
    prettier.format(variables, prettierOptions)
  );
  await fs.writeFile(
    MIXINS_ENTRYPOINT,
    prettier.format(mixins, prettierOptions)
  );

  reporter.info('Done! ✨');
}

build().catch(error => {
  console.error(error);
});
