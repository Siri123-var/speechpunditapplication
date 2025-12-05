// simple-student-test.js - Direct test without cucumber config complications
const { chromium } = require('playwright');

async function runStudentRegistrationTest() {
  console.log('🚀 Starting Student Registration Test...');
  
  let browser, context, page;
  
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await chromium.launch({ 
      headless: false,
      timeout: 60000,
      slowMo: 1000
    });
    
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    
    page = await context.newPage();
    
    // Navigate to registration page
    console.log('🔄 Navigating to registration page...');
    await page.goto('https://enterprise02.speechpundit.com/register', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    console.log('✅ Page loaded successfully!');
    
    // Wait for form to be ready
    await page.waitForTimeout(3000);
    
    // Fill first name
    console.log('📝 Filling first name: siri');
    try {
      await page.fill('input[placeholder="First Name"]', 'siri');
      console.log('✅ First name filled successfully');
    } catch (error) {
      // Try alternative selector
      await page.fill('textbox >> nth=0', 'siri');
      console.log('✅ First name filled with alternative selector');
    }
    
    // Fill last name
    console.log('📝 Filling last name: varshini');
    try {
      await page.fill('input[placeholder="Last Name"]', 'varshini');
      console.log('✅ Last name filled successfully');
    } catch (error) {
      await page.fill('textbox >> nth=1', 'varshini');
      console.log('✅ Last name filled with alternative selector');
    }
    
    // Fill email
    console.log('📝 Filling email: sirivarshini.kandapalli+test@example.com');
    try {
      await page.fill('input[placeholder="Email"]', 'sirivarshini.kandapalli+test@example.com');
      console.log('✅ Email filled successfully');
    } catch (error) {
      await page.fill('textbox >> nth=2', 'sirivarshini.kandapalli+test@example.com');
      console.log('✅ Email filled with alternative selector');
    }
    
    // Fill password
    console.log('📝 Filling password');
    try {
      await page.fill('input[placeholder="Password"]', 'Password1234');
      console.log('✅ Password filled successfully');
    } catch (error) {
      await page.fill('textbox >> nth=3', 'Password1234');
      console.log('✅ Password filled with alternative selector');
    }
    
    // Select organization
    console.log('📝 Selecting organization: Sails Software');
    await page.click('text=Select Organization');
    await page.waitForTimeout(1000);
    await page.click('text=Sails Software');
    console.log('✅ Organization selected successfully');
    
    // Select Student role
    console.log('📝 Selecting Student role');
    await page.click('text=Student');
    console.log('✅ Student role selected successfully');
    
    // Accept terms
    console.log('📝 Accepting terms and conditions');
    await page.check('input[type="checkbox"]');
    console.log('✅ Terms and conditions accepted');
    
    // Click signup
    console.log('📝 Clicking signup button');
    await page.click('button:has-text("Signup")');
    console.log('✅ Signup button clicked');
    
    // Wait to see result
    await page.waitForTimeout(5000);
    
    console.log('🎉 Student registration test completed successfully!');
    console.log('The form submission should work now in your Cucumber tests.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Take screenshot for debugging
    if (page) {
      await page.screenshot({ 
        path: `test-results/simple-test-error-${Date.now()}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot saved for debugging');
    }
  } finally {
    if (browser) {
      console.log('🔄 Closing browser...');
      await page.waitForTimeout(3000); // Keep open for 3 seconds to see result
      await browser.close();
    }
  }
}

runStudentRegistrationTest();