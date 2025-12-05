// tests/pages/RegistrationPage.js
const { expect } = require('@playwright/test');

class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://enterprise02.speechpundit.com';
    
    // Page elements - using role-based selectors that match actual DOM
    this.firstNameInput = 'textbox >> nth=0'; // First textbox is first name
    this.lastNameInput = 'textbox >> nth=1';  // Second textbox is last name
    this.emailInput = 'textbox >> nth=2';     // Third textbox is email
    this.passwordInput = 'textbox >> nth=3';  // Fourth textbox is password
    this.organizationDropdown = 'text=Select Organization';
    this.organizationDropdownContainer = 'generic:has-text("Select Organization")';
    this.studentRadio = 'text=Student';  // Actual label for Student role
    this.coachRadio = 'text=Coach';    // Actual label for Coach role
    this.termsCheckbox = 'input[type="checkbox"]';
    this.signupButton = 'button:has-text("Signup")';
    this.loginLink = 'link:has-text("Login")';
    this.termsLink = 'link:has-text("terms and conditions.")';
    this.logoLink = 'link[href="/"]';
    
    // Error message selectors
    this.firstNameError = 'text=First Name is required';
    this.lastNameError = 'text=Last Name is required';
    this.emailError = 'text=Email is required';
    this.passwordError = 'text=Password is required';
    this.organizationError = 'text=Org must be selected';
    this.roleError = 'text=Role is required';
    this.termsError = 'text=Terms must be accepted';
    this.emailFormatError = 'text=email must be a valid email';
    this.passwordLengthError = 'text=Must be at least 6 chars!';
    
    // Modal selectors
    this.termsModal = 'dialog';
    this.closeModalButton = 'button:has-text("Close")';
    
    // Organization options
    this.organizationOptions = [
      'Rotary Four-Way Test Contest',
      'FULFEEMENT',
      'TEST Org',
      'Snider Consulting Group',
      'IIT Alumni Association of North Texas (IITNT)',
      'Sails Software',
      'speechpundit'
    ];
  }

  async navigate() {
    try {
      console.log('🌐 Navigating to registration page...');
      await this.page.goto(`${this.baseUrl}/register`, {
        waitUntil: 'networkidle',
        timeout: 100000
      });
      
      // Wait for page to be fully loaded
      await this.page.waitForLoadState('domcontentloaded');
      
      // Wait for key elements to be visible
      await this.page.waitForSelector(this.firstNameInput, { 
        timeout: 15000,
        state: 'visible'
      });
      
      console.log('✅ Registration page loaded successfully');
      
    } catch (error) {
      console.error('❌ Failed to navigate to registration page:', error.message);
      
      // Try alternative approach
      console.log('🔄 Retrying navigation...');
      await this.page.goto(`${this.baseUrl}/register`, { timeout: 60000 });
      await this.page.waitForTimeout(5000);
    }
  }

  async fillFirstName(firstName) {
    try {
      console.log(`📝 Filling first name: ${firstName}`);
      
      // Try multiple selector strategies
      const selectors = [
        'textbox >> nth=0',
        'input[placeholder="First Name"]',
        'textbox[placeholder="First Name"]',
        '[placeholder="First Name"]'
      ];
      
      let filled = false;
      for (const selector of selectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          await this.page.fill(selector, firstName);
          console.log(`✅ First name filled using selector: ${selector}`);
          filled = true;
          break;
        } catch (error) {
          console.log(`❌ Failed with selector ${selector}: ${error.message}`);
        }
      }
      
      if (!filled) {
        throw new Error('Could not find first name input field');
      }
      
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      console.error('❌ Error filling first name:', error.message);
      throw error;
    }
  }

  async fillLastName(lastName) {
    try {
      console.log(`📝 Filling last name: ${lastName}`);
      
      const selectors = [
        'textbox >> nth=1',
        'input[placeholder="Last Name"]',
        'textbox[placeholder="Last Name"]'
      ];
      
      let filled = false;
      for (const selector of selectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          await this.page.fill(selector, lastName);
          console.log(`✅ Last name filled using selector: ${selector}`);
          filled = true;
          break;
        } catch (error) {
          console.log(`❌ Failed with selector ${selector}: ${error.message}`);
        }
      }
      
      if (!filled) {
        throw new Error('Could not find last name input field');
      }
      
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      console.error('❌ Error filling last name:', error.message);
      throw error;
    }
  }

  async fillEmail(email) {
    try {
      console.log(`📝 Filling email: ${email}`);
      
      const selectors = [
        'textbox >> nth=2',
        'input[placeholder="Email"]',
        'textbox[placeholder="Email"]',
        'input[type="email"]'
      ];
      
      let filled = false;
      for (const selector of selectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          await this.page.fill(selector, email);
          console.log(`✅ Email filled using selector: ${selector}`);
          filled = true;
          break;
        } catch (error) {
          console.log(`❌ Failed with selector ${selector}: ${error.message}`);
        }
      }
      
      if (!filled) {
        throw new Error('Could not find email input field');
      }
      
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      console.error('❌ Error filling email:', error.message);
      throw error;
    }
  }

  async fillPassword(password) {
    try {
      console.log(`📝 Filling password`);
      
      const selectors = [
        'textbox >> nth=3',
        'input[placeholder="Password"]',
        'textbox[placeholder="Password"]',
        'input[type="password"]'
      ];
      
      let filled = false;
      for (const selector of selectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          await this.page.fill(selector, password);
          console.log(`✅ Password filled using selector: ${selector}`);
          filled = true;
          break;
        } catch (error) {
          console.log(`❌ Failed with selector ${selector}: ${error.message}`);
        }
      }
      
      if (!filled) {
        throw new Error('Could not find password input field');
      }
      
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      console.error('❌ Error filling password:', error.message);
      throw error;
    }
  }

 
async selectOrganization(organization) {
  try {
    console.log(`🏢 Selecting organization: ${organization}`);
    
    // Check if dropdown is already open by looking for visible options
    const isDropdownOpen = await this.page.locator('li, [role="option"], option, .dropdown-item').first().isVisible().catch(() => false);
    
    if (!isDropdownOpen) {
      console.log('📂 Opening organization dropdown...');
      // Try to open dropdown with multiple selectors
      const dropdownSelectors = [
        'text=Select Organization',
        '[placeholder*="Organization"]',
        '[aria-label*="Organization"]',
        'select',
        '[role="combobox"]'
      ];
      
      let opened = false;
      for (const selector of dropdownSelectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          await this.page.click(selector);
          console.log(`✅ Dropdown opened with selector: ${selector}`);
          opened = true;
          break;
        } catch (e) {
          console.log(`❌ Selector ${selector} failed: ${e.message}`);
        }
      }
      
      if (!opened) {
        throw new Error('Could not open organization dropdown');
      }
      
      await this.page.waitForTimeout(1000);
    } else {
      console.log('✅ Dropdown is already open');
    }
    
    // Now select the specific organization
    console.log(`🎯 Clicking on organization: ${organization}`);
    
    // Try multiple ways to select the organization
    const orgSelectors = [
      `text=${organization}`,
      `text="${organization}"`,
      `li:has-text("${organization}")`,
      `[role="option"]:has-text("${organization}")`,
      `option:has-text("${organization}")`,
      `.dropdown-item:has-text("${organization}")`
    ];
    
    let selected = false;
    for (const selector of orgSelectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
        await this.page.click(selector);
        console.log(`✅ Organization selected with selector: ${selector}`);
        selected = true;
        break;
      } catch (e) {
        console.log(`❌ Org selector ${selector} failed: ${e.message}`);
      }
    }
    
    if (!selected) {
      throw new Error(`Could not select organization "${organization}"`);
    }
    
    // Wait for role options to be available after organization selection
    console.log('⏳ Waiting for role options to load...');
    await this.page.waitForTimeout(2000);
    
    // Verify role options are visible (check for any radio button)
    await this.page.waitForSelector('input[type="radio"]', { timeout: 10000, state: 'visible' });
    console.log('✅ Organization selected and role options are ready');
    
  } catch (error) {
    console.log(`❌ Error selecting organization: ${error.message}`);
    
    // Take screenshot for debugging
    try {
      await this.page.screenshot({ 
        path: `test-results/org-selection-error-${Date.now()}.png`,
        fullPage: true 
      });
    } catch (screenshotError) {
      console.log('Could not take screenshot');
    }
    
    throw error;
  }
}

async selectRole(role) {
  try {
    console.log(`📝 Selecting role: ${role}`);
    
    // First, detect what labels are currently displayed
    let actualLabel;
    let radioValue;
    
    if (role === 'Student' || role === 'Sail\'r') {
      radioValue = 'Student';
      // Check which label is currently displayed for Student value
      const isSailsOrg = await this.page.isVisible('text=Sail\'r');
      actualLabel = isSailsOrg ? 'Sail\'r' : 'Student';
    } else if (role === 'Coach' || role === 'Trainer') {
      radioValue = 'Coach';
      // Check which label is currently displayed for Coach value
      const isSailsOrg = await this.page.isVisible('text=Trainer');
      actualLabel = isSailsOrg ? 'Trainer' : 'Coach';
    } else {
      // For any other custom roles, use the role name directly
      actualLabel = role;
      radioValue = role;
    }
    
    console.log(`🎯 Target role: ${role}, Actual label to click: ${actualLabel}, Radio value: ${radioValue}`);
    
    // Method 1: Try clicking the label text
    try {
      const labelSelector = `text=${actualLabel}`;
      await this.page.waitForSelector(labelSelector, { 
        timeout: 10000, 
        state: 'visible' 
      });
      
      await this.page.click(labelSelector);
      console.log(`✅ Role ${role} selected by clicking label: ${actualLabel}`);
      
      // Verify selection by checking the radio input value
      const isChecked = await this.page.isChecked(`input[type="radio"][value="${radioValue}"]`);
      if (isChecked) {
        console.log(`✅ Role selection verified: ${radioValue} is checked`);
        return; // Success!
      }
    } catch (labelError) {
      console.log(`⚠️ Label click failed: ${labelError.message}`);
    }
    
    // Method 2: Try clicking the radio input directly by value
    try {
      console.log(`🔄 Trying direct radio input click for value: ${radioValue}`);
      const radioSelector = `input[type="radio"][value="${radioValue}"]`;
      await this.page.click(radioSelector);
      
      // Verify selection
      const isChecked = await this.page.isChecked(radioSelector);
      if (isChecked) {
        console.log(`✅ Role ${role} selected by direct radio click`);
        return; // Success!
      }
    } catch (radioError) {
      console.log(`⚠️ Direct radio click failed: ${radioError.message}`);
    }
    
    // Method 3: Find radio by label association
    try {
      console.log(`🔄 Trying label association method for: ${actualLabel}`);
      const labelElement = await this.page.locator(`label:has-text("${actualLabel}")`).first();
      const forAttribute = await labelElement.getAttribute('for');
      
      if (forAttribute) {
        await this.page.click(`#${forAttribute}`);
        console.log(`✅ Role ${role} selected by label association`);
        return; // Success!
      }
    } catch (associationError) {
      console.log(`⚠️ Label association failed: ${associationError.message}`);
    }
    
    throw new Error(`Could not select role ${role} with any method`);
    
  } catch (error) {
    console.error(`❌ Error selecting role ${role}:`, error.message);
    
    // Final debug: take screenshot and show available options
    try {
      await this.page.screenshot({ 
        path: `test-results/role-selection-error-${Date.now()}.png`,
        fullPage: true 
      });
      
      // Log available roles for debugging
      const availableRoles = await this.getAvailableRoles();
      console.log('🔍 Available roles on page:', availableRoles);
      
      // Log actual radio buttons and labels
      const radioInputs = await this.page.locator('input[type="radio"]').all();
      for (let i = 0; i < radioInputs.length; i++) {
        const value = await radioInputs[i].getAttribute('value');
        const id = await radioInputs[i].getAttribute('id');
        const label = await this.page.locator(`label[for="${id}"]`).textContent().catch(() => 'No label');
        console.log(`Radio ${i}: value="${value}", id="${id}", label="${label}"`);
      }
      
    } catch (debugError) {
      console.log('Could not take debug screenshot');
    }
    
    throw error;
  }
}
 

  async acceptTerms() {
    await this.page.check(this.termsCheckbox);
    await this.page.waitForTimeout(5000);
  }

  async uncheckTerms() {
    await this.page.uncheck(this.termsCheckbox);
    await this.page.waitForTimeout(5000);
  }

  async clickSignup() {
    await this.page.click(this.signupButton);
    await this.page.waitForTimeout(5000);
  }

  async clickLogin() {
    await this.page.click(this.loginLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickTermsLink() {
    await this.page.click(this.termsLink);
    await this.page.waitForTimeout(5000);
  }

  async clickLogo() {
    await this.page.click(this.logoLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async closeTermsModal() {
    await this.page.click(this.closeModalButton);
    await this.page.waitForTimeout(5000);
  }

  async isErrorVisible(errorSelector) {
    try {
      await this.page.waitForSelector(errorSelector, { timeout: 5000 });
      return await this.page.isVisible(errorSelector);
    } catch {
      return false;
    }
  }

  async isErrorNotVisible(errorSelector) {
    try {
      await this.page.waitForSelector(errorSelector, { state: 'detached', timeout: 5000 });
      return true;
    } catch {
      return !(await this.page.isVisible(errorSelector));
    }
  }

  async isTermsModalVisible() {
    return await this.page.isVisible(this.termsModal);
  }
async isRoleSelected(role) {
  try {
    console.log(`🔍 Checking if role "${role}" is selected...`);
    
    // Try multiple approaches to check if the role is selected
    let radioValue;
    if (role === 'Student' || role === 'Sail\'r') {
      radioValue = 'Student';
    } else if (role === 'Coach' || role === 'Trainer') {
      radioValue = 'Coach';
    } else {
      radioValue = role;
    }
    
    // Method 1: Check by radio input value directly
    try {
      const radioSelector = `input[type="radio"][value="${radioValue}"]`;
      const isChecked = await this.page.isChecked(radioSelector);
      console.log(`✅ Role ${role} checked status (Method 1): ${isChecked}`);
      return isChecked;
    } catch (method1Error) {
      console.log(`⚠️ Method 1 failed: ${method1Error.message}`);
    }
    
    // Method 2: Try finding radio by name attribute
    try {
      const radioByName = `input[name="role"][value="${radioValue}"]`;
      const isChecked = await this.page.isChecked(radioByName);
      console.log(`✅ Role ${role} checked status (Method 2): ${isChecked}`);
      return isChecked;
    } catch (method2Error) {
      console.log(`⚠️ Method 2 failed: ${method2Error.message}`);
    }
    
    // Method 3: Find the label and then look for associated radio
    try {
      const actualLabel = role === 'Student' ? 'Student' : 'Coach';
      const labelElement = this.page.locator(`label:has-text("${actualLabel}")`);
      const forAttribute = await labelElement.getAttribute('for');
      
      if (forAttribute) {
        const radioById = `#${forAttribute}`;
        const isChecked = await this.page.isChecked(radioById);
        console.log(`✅ Role ${role} checked status (Method 3): ${isChecked}`);
        return isChecked;
      }
    } catch (method3Error) {
      console.log(`⚠️ Method 3 failed: ${method3Error.message}`);
    }
    
    // Method 4: Look for checked attribute in any radio with the value
    try {
      const allRadios = await this.page.locator('input[type="radio"]').all();
      
      for (const radio of allRadios) {
        const value = await radio.getAttribute('value');
        const checked = await radio.isChecked();
        console.log(`Radio: value="${value}", checked=${checked}`);
        
        if (value === radioValue && checked) {
          console.log(`✅ Role ${role} is selected (Method 4)`);
          return true;
        }
      }
      
      console.log(`❌ Role ${role} is not selected (Method 4)`);
      return false;
      
    } catch (method4Error) {
      console.log(`⚠️ Method 4 failed: ${method4Error.message}`);
    }
    
    console.log(`❌ All methods failed to check role selection for ${role}`);
    return false;
    
  } catch (error) {
    console.error(`❌ Error checking role selection: ${error.message}`);
    return false;
  }
}

async clickTermsLink() {
  await this.page.getByRole('link', { name: 'terms and conditions.' }).click();
  await this.page.waitForTimeout(2000);
}

  async isTermsChecked() {
    return await this.page.isChecked(this.termsCheckbox);
  }

  async getOrganizationValue() {
    // This method needs to be adapted based on actual DOM structure
    try {
      return await this.page.textContent('.selected-organization');
    } catch {
      return await this.page.inputValue(this.organizationDropdownContainer + ' input');
    }
  }

  async fillAllRequiredFieldsExceptEmail() {
    await this.fillFirstName('Test');
    await this.fillLastName('User');
    await this.fillPassword('Password123!');
    await this.selectOrganization('TEST Org');
    await this.selectRole('Student');
    await this.acceptTerms();
  }

  async fillAllRequiredFieldsExceptPassword() {
    await this.fillFirstName('Test');
    await this.fillLastName('User');
    await this.fillEmail('test@example.com');
    await this.selectOrganization('TEST Org');
    await this.selectRole('Student');
    await this.acceptTerms();
  }

  async fillValidForm() {
    await this.fillFirstName('John');
    await this.fillLastName('Doe');
    await this.fillEmail('john.doe@example.com');
    await this.fillPassword('Password123!');
    await this.selectOrganization('TEST Org');
    await this.selectRole('Student');
    await this.acceptTerms();
  }

  async enterLongText(fieldType) {
    const longText = 'A'.repeat(150);
    const specialChars = '!@#$%^&*()_+{}|:"<>?[]\\;\',./`~';
    const testText = longText + specialChars;
    
    switch (fieldType) {
      case 'firstName':
        await this.fillFirstName(testText);
        break;
      case 'lastName':
        await this.fillLastName(testText);
        break;
      case 'email':
        await this.fillEmail(testText + '@example.com');
        break;
      case 'password':
        await this.fillPassword(testText);
        break;
    }
  }

  async getAvailableRoles() {
    try {
      const roles = [];
      
      // Check for Student option
      if (await this.page.isVisible('text=Student')) {
        roles.push('Student');
      }
      
      // Check for Coach option  
      if (await this.page.isVisible('text=Coach')) {
        roles.push('Coach');
      }
      
      // Check for any other role options
      const roleElements = await this.page.locator('input[type="radio"]').all();
      for (const element of roleElements) {
        const parentText = await element.locator('..').textContent();
        if (parentText && !roles.includes(parentText.trim())) {
          roles.push(parentText.trim());
        }
      }
      
      console.log('Available roles:', roles);
      return roles;
      
    } catch (error) {
      console.error('Error getting available roles:', error.message);
      return [];
    }
  }

  async getAvailableOrganizations() {
    await this.page.click(this.organizationDropdown);
    await this.page.waitForTimeout(1000);
    
    try {
      const organizations = await this.page.locator('[role="option"]').allTextContents();
      return organizations.filter(org => org.trim().length > 0);
    } catch {
      // Fallback method
      const organizations = [];
      for (const org of this.organizationOptions) {
        const isVisible = await this.page.isVisible(`text="${org}"`);
        if (isVisible) organizations.push(org);
      }
      return organizations;
    }
  }

  async submitWithEnter() {
    // await this.page.press('body', 'Enter');
    await this.page.getByRole('textbox', { name: 'Student Coach' }).click();
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  async rapidClickSignup(times = 5) {
    for (let i = 0; i < times; i++) {
      await this.page.click(this.signupButton);
      await this.page.waitForTimeout(100);
    }
  }

  async enterMaliciousContent() {
    const maliciousInputs = [
      '<script>alert("XSS")</script>',
      'javascript:alert("XSS")',
      '../../etc/passwd',
      'DROP TABLE users;',
      '${7*7}',
      '{{7*7}}'
    ];

    for (const input of maliciousInputs) {
      await this.fillFirstName(input);
      await this.page.waitForTimeout(200);
      await this.fillEmail(input + '@test.com');
      await this.page.waitForTimeout(200);
    }
  }
  async verifyPageLayout() {
  // Use more reliable selectors that work across browsers and account for dynamic content
  const elements = [
    { selector: 'input[placeholder="First Name"]', name: 'First Name Input' },
    { selector: 'input[placeholder="Last Name"]', name: 'Last Name Input' },
    { selector: 'input[placeholder="Email"]', name: 'Email Input' },
    { selector: 'input[placeholder="Password"]', name: 'Password Input' },
    { selector: 'input[type="radio"]', name: 'Radio Buttons' },
    { selector: 'input[type="checkbox"]', name: 'Terms Checkbox' },
    { selector: 'button', name: 'Signup Button' }
  ];

  // For organization dropdown, check for either the placeholder or selected value
  const orgDropdownSelectors = [
    'text=Select Organization',
    '[aria-label*="Organization"]',
    'text=TEST Org',
    'text=Sails Software',
    'text=Rotary Four-Way Test Contest'
  ];

  let orgDropdownVisible = false;
  for (const selector of orgDropdownSelectors) {
    try {
      if (await this.page.isVisible(selector)) {
        orgDropdownVisible = true;
        console.log(`✅ Organization dropdown found with selector: ${selector}`);
        break;
      }
    } catch (error) {
      // Continue to next selector
    }
  }

  if (!orgDropdownVisible) {
    throw new Error('Organization dropdown is not visible with any known selector');
  }

  // Check all other elements
  for (const element of elements) {
    try {
      const isVisible = await this.page.isVisible(element.selector);
      if (!isVisible) {
        throw new Error(`Element ${element.name} (${element.selector}) is not visible`);
      }
      console.log(`✅ ${element.name} is visible`);
    } catch (error) {
      throw new Error(`Element ${element.name} verification failed: ${error.message}`);
    }
  }
  
  console.log('✅ All page layout elements verified successfully');
  return true;
}

  async getCurrentUrl() {
    return this.page.url();
  }

  async goBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { RegistrationPage };
// tests/pages/RegistrationPage.js
// tests/pages/RegistrationPage.js
// const { expect } = require('@playwright/test');

// class RegistrationPage {
//   constructor(page) {
//     this.page = page;
//     this.baseUrl = 'https://enterprise02.speechpundit.com';
    
//     // Optimized selectors using reliable, cross-browser compatible locators
//     this.firstNameInput = 'input[placeholder="First Name"]';
//     this.lastNameInput = 'input[placeholder="Last Name"]'; 
//     this.emailInput = 'input[placeholder="Email"]';
//     this.passwordInput = 'input[placeholder="Password"]';
//     this.organizationDropdown = 'text=Select Organization';
//     this.studentRadio = 'input[type="radio"][value="Student"]';
//     this.coachRadio = 'input[type="radio"][value="Coach"]';
//     this.termsCheckbox = 'input[type="checkbox"]';
//     this.signupButton = 'button:has-text("Signup")';
//     this.loginLink = 'link:has-text("Login")';
//     this.termsLink = 'link:has-text("terms and conditions.")';
//     this.logoLink = 'link[href="/"]';
    
//     // Error message selectors
//     this.firstNameError = 'text=First Name is required';
//     this.lastNameError = 'text=Last Name is required';
//     this.emailError = 'text=Email is required';
//     this.passwordError = 'text=Password is required';
//     this.organizationError = 'text=Org must be selected';
//     this.roleError = 'text=Role is required';
//     this.termsError = 'text=Terms must be accepted';
//     this.emailFormatError = 'text=email must be a valid email';
//     this.passwordLengthError = 'text=Must be at least 6 chars!';
    
//     // Modal selectors
//     this.termsModal = 'dialog';
    
//     // Organization options
//     this.organizationOptions = [
//       'Rotary Four-Way Test Contest', 'FULFEEMENT', 'TEST Org',
//       'Snider Consulting Group', 'IIT Alumni Association of North Texas (IITNT)',
//       'Sails Software', 'speechpundit'
//     ];
//   }

//   async navigate() {
//     await this.page.goto(`${this.baseUrl}/register`, { timeout: 60000 });
//     await this.page.waitForSelector(this.firstNameInput, { timeout: 15000 });
//   }

//   async fillFirstName(firstName) {
//     await this.page.fill(this.firstNameInput, firstName);
//   }

//   async fillLastName(lastName) {
//     await this.page.fill(this.lastNameInput, lastName);
//   }

//   async fillEmail(email) {
//     await this.page.fill(this.emailInput, email);
//   }

//   async fillPassword(password) {
//     await this.page.fill(this.passwordInput, password);
//   }

//   async selectOrganization(organization) {
//     // Click dropdown to open
//     await this.page.click(this.organizationDropdown);
//     await this.page.waitForTimeout(1000);
    
//     // Try multiple selectors for organization selection
//     const selectors = [
//       `text="${organization}"`,
//       `text=${organization}`,
//       `li:has-text("${organization}")`,
//       `[role="option"]:has-text("${organization}")`,
//       `div:has-text("${organization}")`,
//       `*:has-text("${organization}")`
//     ];
    
//     let selected = false;
//     for (const selector of selectors) {
//       try {
//         await this.page.waitForSelector(selector, { timeout: 5000 });
//         await this.page.click(selector);
//         selected = true;
//         break;
//       } catch (error) {
//         continue;
//       }
//     }
    
//     if (!selected) {
//       throw new Error(`Could not select organization: ${organization}`);
//     }
    
//     await this.page.waitForTimeout(2000);
//   }

//   async selectRole(role) {
//     // Handle dynamic role labels (Student/Sail'r and Coach/Trainer)
//     let actualLabel;
//     if (role === 'Student') {
//       // Check if it's Sails org (shows Sail'r) or regular org (shows Student)
//       const isSailsOrg = await this.page.isVisible('text=Sail\'r').catch(() => false);
//       actualLabel = isSailsOrg ? 'Sail\'r' : 'Student';
//     } else if (role === 'Coach') {
//       const isSailsOrg = await this.page.isVisible('text=Trainer').catch(() => false);
//       actualLabel = isSailsOrg ? 'Trainer' : 'Coach';
//     }
    
//     // Try clicking the label first
//     try {
//       await this.page.click(`text=${actualLabel}`);
//     } catch (error) {
//       // Fallback to radio input
//       const radioSelector = role === 'Student' ? this.studentRadio : this.coachRadio;
//       await this.page.click(radioSelector);
//     }
//   }

//   async acceptTerms() {
//     await this.page.check(this.termsCheckbox);
//   }

//   async uncheckTerms() {
//     await this.page.uncheck(this.termsCheckbox);
//   }

//   async clickSignup() {
//     await this.page.click(this.signupButton);
//     await this.page.waitForTimeout(2000);
//   }

//   async clickLogin() {
//     // Use getByRole for better reliability
//     await this.page.getByRole('link', { name: 'Login' }).click();
//   }

//   async clickTermsLink() {
//     await this.page.getByRole('link', { name: 'terms and conditions.' }).click();
//     await this.page.waitForTimeout(2000);
//   }

//   async clickLogo() {
//     await this.page.click(this.logoLink);
//   }

//   async closeTermsModal() {
//     // Try multiple close methods
//     try {
//       await this.page.getByLabel('Close').click();
//     } catch (error) {
//       try {
//         await this.page.keyboard.press('Escape');
//       } catch (fallbackError) {
//         await this.page.click('button:has-text("Close")');
//       }
//     }
//   }

//   async isErrorVisible(errorSelector) {
//     return await this.page.isVisible(errorSelector);
//   }

//   async isTermsModalVisible() {
//     return await this.page.isVisible(this.termsModal);
//   }

//   async isRoleSelected(role) {
//     const roleSelector = role === 'Student' ? this.studentRadio : this.coachRadio;
//     return await this.page.isChecked(roleSelector);
//   }

//   async isTermsChecked() {
//     return await this.page.isChecked(this.termsCheckbox);
//   }

//   async fillValidForm() {
//     await this.fillFirstName('John');
//     await this.fillLastName('Doe');
//     await this.fillEmail('john.doe@example.com');
//     await this.fillPassword('Password123!');
//     await this.selectOrganization('TEST Org');
//     await this.selectRole('Student');
//     await this.acceptTerms();
//   }

//   async fillAllRequiredFieldsExceptEmail() {
//     await this.fillFirstName('Test');
//     await this.fillLastName('User');
//     await this.fillPassword('Password123!');
//     await this.selectOrganization('TEST Org');
//     await this.selectRole('Student');
//     await this.acceptTerms();
//   }

//   async fillAllRequiredFieldsExceptPassword() {
//     await this.fillFirstName('Test');
//     await this.fillLastName('User');
//     await this.fillEmail('test@example.com');
//     await this.selectOrganization('TEST Org');
//     await this.selectRole('Student');
//     await this.acceptTerms();
//   }

//   async enterLongText(fieldType) {
//     const longText = 'ThisIsAVeryLongTextThatExceedsNormalCharacterLimitsAndIsDesignedToTestHowTheFormHandlesExtremelyLongInputsWithoutBreakingTheApplicationOrCausingAnyUnexpectedBehaviorInTheUserInterface'.repeat(2);
    
//     switch (fieldType) {
//       case 'firstName': await this.fillFirstName(longText); break;
//       case 'lastName': await this.fillLastName(longText); break;
//       case 'email': await this.fillEmail(longText + '@example.com'); break;
//       case 'password': await this.fillPassword(longText); break;
//     }
//   }

//   async submitWithEnter() {
//     await this.page.getByRole('textbox', { name: 'Student Coach' }).click();
//     await this.page.keyboard.press('Enter');
//   }

//   async rapidClickSignup(times = 5) {
//     for (let i = 0; i < times; i++) {
//       await this.page.click(this.signupButton);
//       await this.page.waitForTimeout(100);
//     }
//   }

//   async enterMaliciousContent() {
//     const maliciousInputs = [
//       '<script>alert("XSS")</script>',
//       'javascript:alert("XSS")',
//       '\'; DROP TABLE users; --',
//       '${7*7}'
//     ];

//     for (const input of maliciousInputs) {
//       await this.fillFirstName(input);
//       await this.fillEmail(input + '@test.com');
//       await this.page.waitForTimeout(200);
//     }
//   }

//   async verifyPageLayout() {
//     const elements = [
//       { selector: this.firstNameInput, name: 'First Name Input' },
//       { selector: this.lastNameInput, name: 'Last Name Input' },
//       { selector: this.emailInput, name: 'Email Input' },
//       { selector: this.passwordInput, name: 'Password Input' },
//       { selector: 'input[type="radio"]', name: 'Radio Buttons' },
//       { selector: this.termsCheckbox, name: 'Terms Checkbox' },
//       { selector: this.signupButton, name: 'Signup Button' }
//     ];

//     // Check for organization dropdown (either placeholder or selected value)
//     const orgDropdownSelectors = [
//       'text=Select Organization', 'text=TEST Org', 'text=Sails Software'
//     ];
    
//     let orgVisible = false;
//     for (const selector of orgDropdownSelectors) {
//       if (await this.page.isVisible(selector)) {
//         orgVisible = true;
//         break;
//       }
//     }
    
//     if (!orgVisible) {
//       throw new Error('Organization dropdown is not visible');
//     }

//     for (const element of elements) {
//       const isVisible = await this.page.isVisible(element.selector);
//       if (!isVisible) {
//         throw new Error(`Element ${element.name} is not visible`);
//       }
//     }
    
//     return true;
//   }

//   async getCurrentUrl() {
//     return this.page.url();
//   }

//   async goBack() {
//     await this.page.goBack();
//   }
// }

// module.exports = { RegistrationPage };