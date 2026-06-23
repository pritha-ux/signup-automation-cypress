**Global Recruitment Testing - Sign Up Flow**

**Prerequisites**
- Node.js (v18 or above)
- npm
- Cypress

**Installation**
bash
npm install cypress --save-dev


**How to Run**
bash
npx cypress open

- Click on `spec.cy.js'
- Test will run automatically in Chrome

**Environment**
- Language: JavaScript
- Framework: Cypress
- Browser: Chrome
- Node version: v18+

 **Test Data**
- First Name: Apar
- Last Name: Gosain
- Email: Auto-generated via Guerrilla Mail API
- Phone: 9710401800
- Password: Apar@1234678
- Agency Name: Apar Agency
- Role: CEO
- Address: Kamalpokhari, Kathmandu

**Notes**
- Email is auto-generated each run via Guerrilla Mail API
- OTP is automatically fetched from inbox
-The phone number is currently hardcoded in the script. Users must update the phone number before each execution to avoid duplicate registration errors.
