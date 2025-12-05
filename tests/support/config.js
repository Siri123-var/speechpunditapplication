// tests/support/config.js
const config = {
  // Base URL for the application
  baseURL: 'https://enterprise02.speechpundit.com',
  
  // Timeout settings
  timeout: {
    default: 30000,
    navigation: 60000,
    element: 10000
  },
  
  // Browser configurations
  browsers: {
    chromium: {
      headless: process.env.HEADLESS === 'true',
      viewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-dev-shm-usage']
    },
    firefox: {
      headless: process.env.HEADLESS === 'true',
      viewport: { width: 1280, height: 720 }
    },
    webkit: {
      headless: process.env.HEADLESS === 'true',
      viewport: { width: 1280, height: 720 }
    }
  },
  
  // Test data
  testData: {
    validUsers: {
      student: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        organization: 'TEST Org',
        role: 'Student'
      },
      coach: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'SecurePass456!',
        organization: 'Snider Consulting Group',
        role: 'Coach'
      }
    },
    invalidEmails: [
      'invalid-email',
      'test@',
      '@domain.com',
      'test.domain'
    ],
    weakPasswords: [
      '123',
      '12345'
    ],
    organizations: [
      'Rotary Four-Way Test Contest',
      'FULFEEMENT',
      'TEST Org',
      'Snider Consulting Group',
      'IIT Alumni Association of North Texas (IITNT)',
      'Sails Software',
      'speechpundit'
    ]
  }
};

module.exports = config;