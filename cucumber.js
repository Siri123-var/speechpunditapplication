// // cucumber.config.js
// const config = {
//   default: {
//     require: [
//       'tests/steps/*.js',
//       'tests/support/world.js',
//       'tests/support/hooks.js'
//     ],
//     format: [
//       'json:test-results/cucumber-report.json',
//       'html:test-results/cucumber-report.html',
//       'summary',
//       'progress-bar'
//     ],
//     formatOptions: {
//       snippetInterface: 'async-await'
//     },
//     publishQuiet: true,
//     parallel: 1,
//     timeout: 180000,
//     retry: 0,
//     paths: [
//       'tests/features/**/*.feature'
//     ]
//   }
// };

// module.exports = config;
// cucumber.config.js
module.exports = {
  default: {
    require: [
      'tests/steps/registrationSteps.js',
      'tests/support/world.js',
      'tests/support/hooks.js'
    ],
    format: [
      'json:test-results/cucumber-report.json',
      'html:test-results/cucumber-report.html',
      'summary',
      'progress-bar'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    parallel: 1,
    timeout: 180000,
    retry: 0,
    paths: [
      'tests/features/registration.feature'
    ]
  }
};