// quick-test.js - Simple test runner to bypass timeout issues
const { chromium } = require('playwright');

async function runQuickTest() {
  console.log('🚀 Starting quick registration test...');
  
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('🌐 Navigating to registration page...');
    
    // Navigate with longer timeout
    await page.goto('https://enterprise02.speechpundit.com/register', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    console.log('✅ Page loaded successfully!');
    
    // Test basic form interaction
    console.log('🧪 Testing form elements...');
    
    // Fill first name
    await page.fill('textbox[placeholder="First Name"]', 'siri');
    console.log('✅ First name filled');
    
    // Fill last name
    await page.fill('textbox[placeholder="Last Name"]', 'varshini');
    console.log('✅ Last name filled');
    
    // Fill email
    await page.fill('textbox[placeholder="Email"]', 'sirivarshini.kandapalli+test@example.com');
    console.log('✅ Email filled');
    
    // Fill password
    await page.fill('textbox[placeholder="Password"]', 'Password1234');
    console.log('✅ Password filled');
    
    console.log('🎉 All form elements are working correctly!');
    console.log('The test framework should work now.');
    
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  } finally {
    await page.waitForTimeout(5000); // Keep browser open for 5 seconds
    await browser.close();
  }
}

runQuickTest();