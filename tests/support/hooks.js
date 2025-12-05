// tests/support/hooks.js
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

BeforeAll(async function() {
  console.log('🎭 Playwright + Cucumber Framework Initialized');
  console.log('🌐 Testing SpeechPundit Registration Page');
});

AfterAll(async function() {
  console.log('📊 Generating test reports...');
});

Before({ tags: '@positive' }, async function() {
  console.log('🟢 Running positive test scenario...');
});

Before({ tags: '@validation' }, async function() {
  console.log('🔍 Running validation test scenario...');
});

Before({ tags: '@ui' }, async function() {
  console.log('🖥️  Running UI interaction test scenario...');
});

Before({ tags: '@negative' }, async function() {
  console.log('🔴 Running negative test scenario...');
});

Before({ tags: '@boundary' }, async function() {
  console.log('⚠️  Running boundary test scenario...');
});

After({ tags: '@registration' }, async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    console.log(`❌ Test failed: ${scenario.pickle.name}`);
  }
});