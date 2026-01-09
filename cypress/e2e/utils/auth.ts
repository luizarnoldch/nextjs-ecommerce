export const generateTestUser = (useTimestamp = true) => {
  if (!useTimestamp) {
    return {
      name: "Test User",
      email: "testuser@example.com",
      password: "TestPassword123!"
    }
  }
  const timestamp = new Date()
  return {
    name: `Test User ${timestamp}`,
    email: `testuser${timestamp}@example.com`,
    password: "TestPassword123!"
  }
}

export const signUpUser = (user: { email: string; password: string; name: string }) => {
  cy.visit("/sign-up")
  cy.get("#name").type(user.name)
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get('button[type="submit"]').click()
}

export const signInUser = (user: { email: string; password: string }) => {
  cy.visit("/sign-in")
  cy.get("#email").type(user.email)
  cy.get("#password").type(user.password)
  cy.get('button[type="submit"]').click()
}
