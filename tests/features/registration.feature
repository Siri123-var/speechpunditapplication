@registration
Feature: SpeechPundit Registration Page
  As a potential user of SpeechPundit
  I want to register for an account
  So that I can access the platform services

  Background:
    Given I navigate to the SpeechPundit registration page

  @positive @student
  Scenario: Successful User Registration with Student Role
    When I enter "siri" as first name
    And I enter "varshini" as last name
    And I enter "sirivarshini.kandapalli+test@example.com" as email
    And I enter "Password1234" as password
    And I select "Sails Software" from organization dropdown
    And I select "Student" role
    And I accept the terms and conditions
    And I click the signup button
    Then the registration should be successful

  @positive @coach
  Scenario: Successful User Registration with Coach Role
    When I enter "Jane" as first name
    And I enter "Smith" as last name
    And I enter "jane.smith@example.com" as email
    And I enter "SecurePass456!" as password
    And I select "Snider Consulting Group" from organization dropdown
    And I select "Coach" role
    And I accept the terms and conditions
    And I click the signup button
    Then the registration should be successful

  @validation @required-fields
  Scenario: Form Validation for Required Fields
    When I click the signup button without filling any fields
    Then I should see error message "First Name is required" for first name
    And I should see error message "Last Name is required" for last name
    And I should see error message "Email is required" for email
    And I should see error message "Password is required" for password
    And I should see error message "Org must be selected" for organization
    And I should see error message "Role is required" for role
    And I should see error message "Terms must be accepted" for terms
    When I enter "John" as first name
    And I click the signup button
    Then I should not see error message for first name
    But I should see remaining required field errors

  @validation @email
  Scenario Outline: Email Format Validation
    Given I fill all required fields except email
    When I enter "<invalid_email>" as email
    And I click the signup button
    Then I should see error message "email must be a valid email" for email
    When I enter "user@domain.com" as email
    Then the email error message should disappear

    Examples:
      | invalid_email |
      | invalid-email |
      | test@         |
      | @domain.com   |
      | test.domain   |

  @validation @password
  Scenario Outline: Password Strength Validation
    Given I fill all required fields except password
    When I enter "<weak_password>" as password
    And I click the signup button
    Then I should see error message "Must be at least 6 chars!" for password
    When I enter "<strong_password>" as password
    Then the password error message should disappear

    Examples:
      | weak_password | strong_password    |
      | 123           | 123456             |
      | 12345         | LongValidPassword123!|

  @ui @dropdown
  Scenario: Organization Dropdown Functionality
    When I click on the organization dropdown
    Then I should see all available organizations:
      | Rotary Four-Way Test Contest                      |
      | FULFEEMENT                                        |
      | TEST Org                                          |
      | Snider Consulting Group                           |
      | IIT Alumni Association of North Texas (IITNT)     |
      | Sails Software                                    |
      | speechpundit                                      |
    When I select "Rotary Four-Way Test Contest" from organization dropdown
    Then the organization field should show "Rotary Four-Way Test Contest"
    When I click on the organization dropdown again
    And I select "IIT Alumni Association of North Texas (IITNT)" from organization dropdown
    Then the organization field should show "IIT Alumni Association of North Texas (IITNT)"

  @ui @radio-buttons
  Scenario: Role Selection Functionality
    Then I should see both "Student" and "Coach" radio buttons
    When I select "Student" role
    Then the "Student" role should be selected
    And the "Coach" role should not be selected
    When I select "Coach" role
    Then the "Coach" role should be selected
    And the "Student" role should not be selected

  @ui @modal
  Scenario: Terms and Conditions Functionality
    When I click on the "terms and conditions" link
    Then the terms and conditions modal should open
    And I should see terms and conditions content
    When I close the terms and conditions modal
    Then the modal should be closed
    When I check the terms and conditions checkbox
    Then the checkbox should be checked
    When I uncheck the terms and conditions checkbox
    Then the checkbox should be unchecked
    When I attempt to submit form without accepting terms
    Then I should see error message "Terms must be accepted" for terms

  @ui @navigation
  Scenario: Navigation Links Testing
    When I click on the "Login" link
    Then I should be navigated to the login page
    When I navigate back to registration page
    Then I should be on the registration page
    When I click on the SpeechPundit logo
    Then I should be navigated to the home page

  @boundary @character-limits
  Scenario: Field Character Limits Testing
    When I enter a very long text in first name field
    And I enter a very long text in last name field
    And I enter a very long email address
    And I enter a very long password
    Then the fields should handle the input gracefully
    And no application errors should occur

  @negative @security
  Scenario: Form Bypassing Attempts
    When I try to submit form using keyboard Enter
    Then the form validation should still be enforced
    When I try to submit with rapid clicking
    Then multiple submissions should be prevented
    When I enter malicious content in form fields
    Then the content should be handled safely

  @cross-browser
  Scenario Outline: Cross-Browser Compatibility
    Given I am using "<browser>" browser
    When I complete a valid registration form
    Then all form elements should function properly
    And the page should display consistently
    
    Examples:
      | browser  |
      | chromium |
      | firefox  |
      | webkit   |