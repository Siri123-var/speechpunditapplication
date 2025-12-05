// Enhanced navigation method for RegistrationPage
async navigate() {
  try {
    console.log('Navigating to registration page...');
    await this.page.goto(`${this.baseUrl}/register`, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for the page to be fully loaded
    await this.page.waitForLoadState('domcontentloaded');
    
    // Wait for key elements to be visible
    await this.page.waitForSelector('textbox[placeholder="First Name"]', { timeout: 10000 });
    
    console.log('✅ Registration page loaded successfully');
    
  } catch (error) {
    console.error('❌ Failed to navigate to registration page:', error.message);
    
    // Try alternative approach
    console.log('Retrying navigation...');
    await this.page.goto(`${this.baseUrl}/register`, { timeout: 60000 });
    await this.page.waitForTimeout(5000);
  }
}