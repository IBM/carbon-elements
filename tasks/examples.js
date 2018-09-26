'use strict';

const fs = require('fs-extra');
const path = require('path');
const ghpages = require('gh-pages');
const spawn = require('cross-spawn');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const BUILD_DIR = path.resolve(__dirname, '../build');
const GH_REMOTE = process.env.GH_REMOTE || 'origin';

/**
 * The goal here is to create a top-level `build` folder with content to be
 * displayed in the `gh-pages` branch. Specifically we want packages available
 * at: `packages/<package-name>/examples/<example-name>` to be mirrored over in
 * the `build` folder at: `build/<package-name>/examples/<example-name>`.
 */
async function main() {
  await fs.remove(BUILD_DIR);
  await fs.ensureDir(BUILD_DIR);

  const packageNames = await fs.readdir(PACKAGES_DIR);

  const packages = await Promise.all(
    packageNames.map(async name => {
      // Verify that each file that we read from the packages directory is
      // actually a folder. Typically used to catch `.DS_store` files that
      // accidentally appear when opening with MacOS Finder
      const filepath = path.join(PACKAGES_DIR, name);
      const stat = await fs.lstat(filepath);
      const descriptor = {
        filepath,
        name,
      };
      if (!stat.isDirectory()) {
        throw new Error(`Unexpected file: ${name} at ${filepath}`);
      }

      // Try and figure out if the package has an examples directory, if not
      // then we can skip it
      const examplesDir = path.join(filepath, 'examples');
      if (!(await fs.pathExists(examplesDir))) {
        return descriptor;
      }

      const examples = await fs.readdir(examplesDir);

      return {
        ...descriptor,
        examples: examples.map(name => ({
          filepath: path.join(examplesDir, name),
          name,
        })),
      };
    })
  );

  const packagesWithExamples = packages.filter(pkg => !!pkg.examples);

  for (const pkg of packagesWithExamples) {
    const { examples, filepath, name } = pkg;
    const packageDir = path.join(BUILD_DIR, name, 'examples');

    await fs.ensureDir(packageDir);

    for (const example of examples) {
      const exampleDir = path.join(packageDir, example.name);
      const exampleBuildDir = path.join(example.filepath, 'build');
      const packageJsonPath = path.join(example.filepath, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);

      await fs.ensureDir(exampleDir);

      if (packageJson.scripts.build) {
        spawn.sync('yarn', ['install'], {
          stdio: 'inherit',
          cwd: example.filepath,
        });
        spawn.sync('yarn', ['build'], {
          stdio: 'inherit',
          cwd: example.filepath,
        });
      }

      if (await fs.pathExists(exampleBuildDir)) {
        await fs.copy(exampleBuildDir, exampleDir);
        continue;
      }

      await fs.copy(example.filepath, exampleDir, {
        filter(src, dest) {
          const relativePath = path.relative(example.filepath, src);
          if (relativePath.includes('node_modules')) {
            return false;
          }
          if (relativePath[0] === '.') {
            return false;
          }
          return true;
        },
      });
    }
  }

  const links = packagesWithExamples.reduce((html, pkg) => {
    const links = pkg.examples.reduce((acc, example) => {
      const href = `./${pkg.name}/examples/${example.name}/index.html`;
      return acc + `<li><a href="${href}">${example.name}</a></li>`;
    }, '');

    return (
      html +
      '\n' +
      `<section>
  <header>
    <h2><pre><code>@carbon/${pkg.name}</code></pre> examples</h2>
  </header>
  <ul>
    ${links}
  </ul>
</section>`
    );
  }, '');

  const indexFile = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Carbon Elements</title>
</head>
<body>${links}</body>
</html>
`;

  await fs.writeFile(path.join(BUILD_DIR, 'index.html'), indexFile);

  ghpages.publish(BUILD_DIR, { remote: GH_REMOTE }, error => {
    if (error) {
      throw error;
    }

    console.log('Done!');
  });
}

main().catch(error => {
  console.log(error);
});
