exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      "waitForNavigation": "networkidle0"
    }
  },
  include: {
    I: './test/steps/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'client'
};
