// run-test.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Setting up SpeechPundit Tests...');

// Create test-results directory
if (!fs.existsSync('test-results')) {
  fs.mkdirSync('test-results', { recursive: true });
  console.log('✅ Created test-results directory');
}

// Define the command
const command = `npx cucumber-js tests/features/registration.feature --require tests/steps/registrationSteps.js --require tests/support/world.js --require tests/support/hooks.js --format progress --format json:test-results/cucumber-report.json`;

console.log('🧪 Running registration tests...');
console.log('📝 Command:', command);

try {
  const output = execSync(command, { 
    stdio: 'inherit',
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: 'test' }
  });
  console.log('✅ Tests completed successfully!');
} catch (error) {
  console.error('❌ Test execution failed:', error.message);
  process.exit(1);
}