const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 90000,
  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
  },


  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
