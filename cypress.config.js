const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    baseUrl: "http://localhost:3001"
  },
});
