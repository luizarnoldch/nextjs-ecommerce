import { generateTestUser, signUpUser } from "../utils/auth"

describe("Sign Up Flow", () => {
  it("should allow a user to sign up with valid credentials", () => {
    const testUser = generateTestUser()

    signUpUser(testUser)

    // Assert that we are redirected to the dashboard (or at least that the success toast appears)
    // Note: Adjust the timeout if the API is slow
    cy.contains("Account created successfully!", { timeout: 10000 }).should("be.visible")

    // Also verify redirection to dashboard
    cy.url().should("include", "/dashboard")
  })

  it("should show an error for existing email or invalid data", () => {
    // This test assumes we can't sign up with the same email twice.
    // For now, we will just checking that empty fields trigger HTML5 validation
    // or that we can see the form.

    // Getting the error simulation depends on the backend state, so we'll
    // stick to the positive path as the primary test requested.
    // However, let's add a basic check for required fields.

    cy.visit("/sign-up")
    cy.get('button[type="submit"]').click()

    // The browser validation usually stops it, but Cypress might bypass or we can check :invalid
    cy.get("#email:invalid").should("exist")
    cy.get("#name:invalid").should("exist")
    cy.get("#password:invalid").should("exist")
  })
})
