// tests/support/utils.js
class TestUtils {
  static generateRandomEmail() {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
  }
  
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  static async waitForElementToDisappear(page, selector, timeout = 5000) {
    try {
      await page.waitForSelector(selector, { state: 'detached', timeout });
      return true;
    } catch {
      return false;
    }
  }
  
  static async retryAction(action, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await action();
        return;
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    throw lastError;
  }
  
  static formatTestName(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
  }
}

module.exports = { TestUtils };