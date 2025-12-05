// scripts/run-tests.js
const { exec } = require('child_process');
const fs = require('fs');

// Create necessary directories
const dirs = ['test-results', 'test-results/screenshots', 'test-results/videos'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Test execution configurations
const testConfigs = {
  all: 'npx cucumber-js features/registration.feature',
  smoke: 'npx cucumber-js features/registration.feature --tags "@positive"',
  validation: 'npx cucumber-js features/registration.feature --tags "@validation"',
  ui: 'npx cucumber-js features/registration.feature --tags "@ui"',
  negative: 'npx cucumber-js features/registration.feature --tags "@negative"',
  crossBrowser: 'npx cucumber-js features/registration.feature --tags "@cross-browser"'
};

const testType = process.argv[2] || 'all';
const command = testConfigs[testType];

if (!command) {
  console.log('Available test types: all, smoke, validation, ui, negative, crossBrowser');
  process.exit(1);
}

console.log(`🚀 Running ${testType} tests...`);
console.log(`📝 Command: ${command}`);

exec(command, (error, stdout, stderr) => {
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
  if (error) {
    console.error(`❌ Test execution failed: ${error}`);
    process.exit(1);
  } else {
    console.log('✅ Tests completed successfully!');
  }
});