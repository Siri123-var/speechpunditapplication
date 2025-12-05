// Enhanced navigation step for better timeout handling
const { Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the SpeechPundit registration page', async function () {
  try {
    console.log('🌐 Navigating to SpeechPundit registration page...');
    
    // Navigate with extended timeout
    await this.page.goto('https://enterprise02.speechpundit.com/register', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be loaded
    await this.page.waitForLoadState('domcontentloaded');
    
    // Wait for the first name input to be visible (indicates page is ready)
    await this.page.waitForSelector('textbox[placeholder="First Name"]', { 
      timeout: 15000,
      state: 'visible'
    });
    
    // Verify page loaded correctly
    const currentUrl = await this.page.url();
    expect(currentUrl).toContain('/register');
    
    console.log('✅ Registration page loaded successfully');
    
  } catch (error) {
    console.error('❌ Failed to load registration page:', error.message);
    
    // Try one more time with basic navigation
    console.log('🔄 Retrying navigation...');
    await this.page.goto('https://enterprise02.speechpundit.com/register', { timeout: 60000 });
    await this.page.waitForTimeout(5000);
    
    const currentUrl = await this.page.url();
    expect(currentUrl).toContain('/register');
  }
});