describe('Signup Flow Test', () => {
  it('Signup Successfully', () => {
    
    // Generate a temporary email address using Guerrilla Mail API

    cy.request('https://api.guerrillamail.com/ajax.php?f=get_email_address')
      .then((response) => {
        const tempEmail = response.body.email_addr
        const emailToken = response.body.sid_token

        // Visit the signup page 

        cy.visit('https://authorized-partner.vercel.app/register')

        // Agree to the terms and conditions and click the "Continue" button
        cy.get('button[type="button"]').click()
        cy.contains('button', 'Continue').click()

        // Fill details
        cy.get('input[placeholder="Enter Your First Name"]').type('Apar')
        cy.get('input[placeholder="Enter Your Last Name"]').type('Gosain')
        cy.get('input[placeholder="Enter Your Email Address"]').type(tempEmail)
        cy.get('input[placeholder="00-00000000"]').type('9710401800')
        cy.get('input[name="password"]').type('Apar@1234678')
        cy.get('input[name="confirmPassword"]').type('Apar@1234678')
        cy.contains('button', 'Next').click({ force: true })

        // Email OTP Verification
        cy.contains('Email Verification code', { timeout: 15000 }).should('be.visible')

        cy.wait(20000)

        cy.request(`https://api.guerrillamail.com/ajax.php?f=get_email_list&offset=0&sid_token=${emailToken}`)
          .then((inboxResponse) => {
            const mailId = inboxResponse.body.list[0].mail_id

            cy.request(`https://api.guerrillamail.com/ajax.php?f=fetch_email&email_id=${mailId}&sid_token=${emailToken}`)
              .then((emailResponse) => {
               
                const plainText = emailResponse.body.mail_text_only || emailResponse.body.mail_body

                cy.log('Plain text: ' + plainText)

               
                const allMatches = plainText.match(/\b[1-9]\d{5}\b/g)
                const otp = allMatches[0]

                cy.log('OTP: ' + otp)

                cy.get('[data-input-otp-container="true"] input')
                  .first()
                  .click()
                  .type(otp, { delay: 200 })

                cy.contains('button', 'Verify Code').click()

                // Fill Agency Details

                cy.get('input[placeholder="Enter Agency Name"]').type('Apar Agency')
                cy.get('input[placeholder="Enter Your Role in Agency"]').type('Ceo')
                cy.get('input[placeholder="Enter Your Agency Email Address"]').type('mesega1059@aratrin.com')
                cy.get('input[placeholder*="Agency Website"]').type('www.aparagency.com')
                cy.get('input[placeholder="Enter Your Agency Address"]').type('Kamalpokhari')

                // Select Country 
                cy.get('button[role="combobox"]').click()
                cy.contains('Nepal').click()
                cy.contains('button', 'Next').click()

                // Verify Experience and Performance Metrics Page

                cy.contains('Experience and Performance Metrics', { timeout: 10000 }).should('be.visible')

                // Select Experience year and fill other details

                cy.get('button[role="combobox"]').first().should('be.visible').click()
                cy.get('[role="option"]').contains('1 year').click({ force: true })
                cy.get('input[placeholder="Enter an approximate number."]').type('100')
                cy.get('input[placeholder="E.g., Undergraduate admissions to Canada."]').type('Undergraduate admissions')
                cy.get('input[placeholder*="E.g., 90"]').type('70')
                cy.contains('Visa Processing').click()
                cy.contains('button', 'Next').click()

                // Verify Business Details and Preferences Page

                cy.contains('Provide Business Details and Set Preferences', { timeout: 10000 }).should('be.visible')
                cy.get('input[placeholder="Enter your registration number"]').type('8890')

                // Select Country 

                cy.get('button[role="combobox"]').first().click()
                cy.contains('Australia').click({ force: true })
                cy.contains('Vocational School').click()

                // Upload Documents

                cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/test.pdf', { force: true })
                cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/test.pdf', { force: true })
                cy.contains('button', 'Submit').click()

                // Verify that the user is redirected to the profile page after successful signup
                
                cy.url().should('include', '/admin/profile')
              })
          })
      })
  })
})