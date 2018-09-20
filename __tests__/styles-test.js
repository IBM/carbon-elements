/**
 * @jest-environment node
 */

'use strict';

const path = require('path');
const sass = require('node-sass');
const glob = require('glob');

const defaultOptions = {
  includePaths: ['node_modules'],
};
const cwd = path.resolve(__dirname, '../');
const files = glob.sync('packages/**/*.scss', {
  cwd,
  ignore: ['**/node_modules/**/*'],
});

describe('styles', () => {
  it.each(files)('%s should compile', (relativeFilePath, done) => {
    const filepath = path.join(cwd, relativeFilePath);
    sass.render(
      {
        file: filepath,
        ...defaultOptions,
      },
      (error, result) => {
        if (error) {
          const { column, line, message } = error;
          done.fail(`${filepath}\n[${line}:${column}] ${message}`);
          return;
        }
        expect(result.css).toBeDefined();
        done();
      }
    );
  });
});
