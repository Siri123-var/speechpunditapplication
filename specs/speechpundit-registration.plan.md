# SpeechPundit Registration Page Test Plan

## Application Overview

This test plan covers the registration functionality for SpeechPundit Enterprise platform. The registration page allows new users to create accounts by providing personal information, selecting an organization, choosing their role (Student or Coach), and accepting terms and conditions.

## Test Scenarios

### 1. Registration Form Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful User Registration with Student Role

**File:** `tests/registration/successful-student-registration.spec.ts`

**Steps:**
  1. Navigate to the registration page at https://enterprise02.speechpundit.com/register
  2. Enter valid first name in the 'First Name' field (e.g., 'John')
  3. Enter valid last name in the 'Last Name' field (e.g., 'Doe')
  4. Enter valid email address in the 'Email' field (e.g., 'john.doe@example.com')
  5. Enter valid password in the 'Password' field (minimum 6 characters, e.g., 'Password123!')
  6. Click on the organization dropdown and select 'TEST Org'
  7. Select the 'Student' radio button
  8. Check the 'I have read and accept the terms and conditions' checkbox
  9. Click the 'Signup' button

**Expected Results:**
  - Registration page loads successfully with all form fields visible
  - First name is entered and accepted
  - Last name is entered and accepted
  - Email is entered and accepted
  - Password is entered and accepted
  - Organization is selected successfully
  - Student role is selected
  - Terms and conditions checkbox is checked
  - Form submits successfully or shows appropriate next step

#### 1.2. Successful User Registration with Coach Role

**File:** `tests/registration/successful-coach-registration.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Enter valid first name 'Jane'
  3. Enter valid last name 'Smith'
  4. Enter valid email address 'jane.smith@example.com'
  5. Enter valid password 'SecurePass456!'
  6. Click on organization dropdown and select 'Snider Consulting Group'
  7. Select the 'Coach' radio button
  8. Check the terms and conditions checkbox
  9. Click the 'Signup' button

**Expected Results:**
  - All form fields accept valid input
  - Organization dropdown shows available options and allows selection
  - Coach role can be selected successfully
  - Form validation passes with all required fields filled
  - Registration proceeds to next step or completion

#### 1.3. Form Validation for Required Fields

**File:** `tests/registration/required-fields-validation.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Leave all form fields empty
  3. Click the 'Signup' button
  4. Verify error messages appear for all required fields
  5. Fill in first name only and click 'Signup'
  6. Verify remaining required field errors persist
  7. Continue filling fields one by one and verify validation updates

**Expected Results:**
  - Error message 'First Name is required' appears for empty first name
  - Error message 'Last Name is required' appears for empty last name
  - Error message 'Email is required' appears for empty email
  - Error message 'Password is required' appears for empty password
  - Error message 'Org must be selected' appears when no organization is selected
  - Error message 'Role is required' appears when no role is selected
  - Error message 'Terms must be accepted' appears when checkbox is unchecked
  - Error messages disappear as corresponding fields are completed

#### 1.4. Email Format Validation

**File:** `tests/registration/email-validation.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Fill all required fields except email
  3. Enter invalid email format 'invalid-email' in email field
  4. Click 'Signup' button
  5. Verify email format error message
  6. Try other invalid formats: 'test@', '@domain.com', 'test.domain'
  7. Enter valid email format 'user@domain.com'
  8. Verify error message disappears

**Expected Results:**
  - Error message 'email must be a valid email' appears for invalid format 'invalid-email'
  - Invalid email formats are rejected with appropriate error messages
  - Valid email format is accepted and error message disappears
  - Form allows proceeding when valid email is provided

#### 1.5. Password Strength Validation

**File:** `tests/registration/password-validation.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Fill all required fields except password
  3. Enter short password '123' in password field
  4. Click 'Signup' button
  5. Verify password length error message
  6. Try passwords of various lengths: '12345' (5 chars), '123456' (6 chars), 'LongValidPassword123!' (20+ chars)
  7. Test special characters, numbers, and mixed case

**Expected Results:**
  - Error message 'Must be at least 6 chars!' appears for passwords under 6 characters
  - 6+ character passwords are accepted
  - No upper limit restriction on password length
  - Special characters, numbers, and mixed case are accepted

#### 1.6. Organization Dropdown Functionality

**File:** `tests/registration/organization-dropdown.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Click on the organization dropdown
  3. Verify all available organizations are displayed
  4. Select 'Rotary Four-Way Test Contest'
  5. Verify selection is reflected in the field
  6. Reopen dropdown and select a different organization 'IIT Alumni Association of North Texas (IITNT)'
  7. Verify the selection updates correctly

**Expected Results:**
  - Dropdown opens showing all organizations: 'Rotary Four-Way Test Contest', 'FULFEEMENT', 'TEST Org', 'Snider Consulting Group', 'IIT Alumni Association of North Texas (IITNT)', 'Sails Software', 'speechpundit'
  - Clicking an organization selects it and closes the dropdown
  - Selected organization name appears in the dropdown field
  - Different organizations can be selected by reopening the dropdown
  - Organization selection is properly maintained

#### 1.7. Role Selection Functionality

**File:** `tests/registration/role-selection.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Verify both 'Student' and 'Coach' radio buttons are present
  3. Select 'Student' radio button
  4. Verify 'Student' is selected and 'Coach' is deselected
  5. Select 'Coach' radio button
  6. Verify 'Coach' is selected and 'Student' is deselected
  7. Attempt to select both simultaneously (should not be possible)

**Expected Results:**
  - Both Student and Coach radio buttons are visible and selectable
  - Only one role can be selected at a time (radio button behavior)
  - Selecting Student deselects Coach and vice versa
  - Selected role is visually indicated
  - Role selection is properly maintained until changed

#### 1.8. Terms and Conditions Functionality

**File:** `tests/registration/terms-and-conditions.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Click on the 'terms and conditions' link
  3. Verify terms and conditions modal opens
  4. Read through the terms content
  5. Click the 'Close' button to close the modal
  6. Check the terms and conditions checkbox
  7. Uncheck the checkbox
  8. Attempt to submit form without checkbox checked

**Expected Results:**
  - Terms and conditions link opens a modal dialog
  - Modal contains detailed terms and conditions text with privacy policy information
  - Modal has a close button that closes the dialog
  - Checkbox can be checked and unchecked
  - Form cannot be submitted without accepting terms and conditions
  - Error message appears when trying to submit without accepting terms

#### 1.9. Navigation Links Testing

**File:** `tests/registration/navigation-links.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Click on the 'Login' link in the registration text
  3. Verify navigation to login page
  4. Use browser back button to return to registration page
  5. Click on the SpeechPundit logo/home link
  6. Verify navigation to home page
  7. Navigate back to registration page directly via URL

**Expected Results:**
  - Login link navigates to /login page
  - Login page displays appropriate login form
  - Back button successfully returns to registration page
  - Logo/home link navigates to the main website
  - All navigation maintains proper page state
  - Direct URL access to registration page works correctly

#### 1.10. Field Character Limits Testing

**File:** `tests/registration/character-limits.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Enter extremely long text in first name field (100+ characters)
  3. Enter extremely long text in last name field (100+ characters)
  4. Enter extremely long email address
  5. Enter extremely long password
  6. Verify field behavior with excessive input
  7. Test with special characters, unicode, and emojis

**Expected Results:**
  - Fields either enforce reasonable character limits or handle long input gracefully
  - No application errors occur with excessive input
  - Special characters and unicode are handled appropriately
  - Form validation works correctly regardless of input length
  - User experience remains smooth with long input

#### 1.11. Negative Testing - Form Bypassing

**File:** `tests/registration/negative-form-bypassing.spec.ts`

**Steps:**
  1. Navigate to the registration page
  2. Try to submit form using keyboard shortcuts (Enter key)
  3. Inspect form elements and attempt to modify validation attributes
  4. Test copy-paste of malicious content into form fields
  5. Test submitting form with missing required attributes via developer tools
  6. Test rapid clicking of submit button
  7. Test form submission with network interruption

**Expected Results:**
  - Form validation cannot be bypassed using keyboard shortcuts
  - Client-side validation is properly enforced
  - Malicious content is handled safely
  - Server-side validation backs up client-side validation
  - Rapid clicking doesn't cause multiple submissions
  - Network interruptions are handled gracefully

#### 1.12. Cross-Browser Compatibility Testing

**File:** `tests/registration/cross-browser-compatibility.spec.ts`

**Steps:**
  1. Test registration flow in Chrome browser
  2. Test registration flow in Firefox browser
  3. Test registration flow in Safari browser (if available)
  4. Test registration flow in Edge browser
  5. Verify consistent layout and functionality across browsers
  6. Test form validation behavior across browsers
  7. Test JavaScript functionality across browsers

**Expected Results:**
  - Registration form displays consistently across all browsers
  - All form fields function properly in each browser
  - Validation messages appear consistently
  - Dropdown and checkbox interactions work in all browsers
  - No browser-specific JavaScript errors occur
  - Visual design remains consistent across browsers
