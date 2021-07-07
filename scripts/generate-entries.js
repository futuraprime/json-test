const fs = require('fs');
const path = require('path');
const upperFirst = require('lodash/upperFirst');
const lowerCase = require('lodash/lowerCase');
const kebabCase = require('lodash/kebabCase');
const ejs = require('ejs');

const dir = fs.opendirSync('./src/pages');

const package = require('../package.json');
const packageName = package.name;

function ensureDirectory(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
}

let f;
while ((f = dir.readSync())) {
  if (f.isFile() && path.extname(f.name) === '.svelte') {
    const rawName = path.basename(f.name, '.svelte');
    const pageTitle = upperFirst(lowerCase(rawName));

    const html = ejs.renderFile('./templates/index.ejs', {
      rawName: kebabCase(rawName),
      pageTitle,
      packageName,
    });

    ensureDirectory('./htmls');
    html.then((d) => fs.writeFileSync(`./htmls/${kebabCase(rawName)}.html`, d));

    ensureDirectory('./entries');
    fs.writeFileSync(
      `./entries/${kebabCase(rawName)}.js`,
      `import App from './pages/${rawName}.svelte';

const app = new App({
  target: document.body,
});

window.app = app;

export default app;
`,
    );
  }
}
