// tests/support/world.js
const { setWorldConstructor, Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.browserName = process.env.BROWSER || 'chromium';
  }

  async init() {
    const browserOptions = {
      headless: process.env.HEADLESS === 'true',
      slowMo: 50,
      timeout: 60000,
      args: [
        '--no-sandbox', 
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    };

    // Launch browser based on the scenario or environment variable
    try {
      switch (this.browserName) {
        case 'firefox':
          this.browser = await firefox.launch(browserOptions);
          break;
        case 'webkit':
          this.browser = await webkit.launch(browserOptions);
          break;
        default:
          this.browser = await chromium.launch(browserOptions);
      }
      
      this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        recordVideo: {
          dir: 'test-results/videos/',
          size: { width: 1280, height: 720 }
        },
        screenshot: { mode: 'only-on-failure' }
      });
      
      this.page = await this.context.newPage();
      
      // Set longer timeouts for navigation
      this.page.setDefaultNavigationTimeout(60000);
      this.page.setDefaultTimeout(30000);
      
      // Set up error handling
      this.page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log(`Browser console error: ${msg.text()}`);
        }
      });
      
      this.page.on('pageerror', error => {
        console.log(`Page error: ${error.message}`);
      });
      
    } catch (error) {
      console.error('Failed to initialize browser:', error.message);
      throw error;
    }
  }

  async cleanup() {
    try {
      if (this.page) {
        await this.page.close();
      }
    } catch (error) {
      console.log('Error closing page:', error.message);
    }
    
    try {
      if (this.context) {
        await this.context.close();
      }
    } catch (error) {
      console.log('Error closing context:', error.message);
    }
    
    try {
      if (this.browser) {
        await this.browser.close();
      }
    } catch (error) {
      console.log('Error closing browser:', error.message);
    }
  }

  async takeScreenshot(name) {
    if (this.page) {
      await this.page.screenshot({ 
        path: `test-results/screenshots/${name}-${Date.now()}.png`,
        fullPage: true 
      });
    }
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function() {
  console.log('🚀 Starting SpeechPundit Registration Tests...');
  
  // Create test results directory
  const fs = require('fs');
  const dirs = ['test-results', 'test-results/screenshots', 'test-results/videos'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
});

AfterAll(async function() {
  console.log('✅ Test execution completed.');
});

Before(async function(scenario) {
  console.log(`🧪 Starting: ${scenario.pickle.name}`);
  await this.init();
});

After(async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    await this.takeScreenshot(`failed-${scenario.pickle.name.replace(/\s+/g, '-')}`);
  }
  
  console.log(`${scenario.result.status === 'PASSED' ? '✅' : '❌'} ${scenario.pickle.name}: ${scenario.result.status}`);
  await this.cleanup();
});

Before({ tags: '@cross-browser' }, async function(scenario) {
  // Extract browser from scenario examples
  const browserName = scenario.pickle.name.match(/chromium|firefox|webkit/);
  if (browserName) {
    this.browserName = browserName[0];
  }
});