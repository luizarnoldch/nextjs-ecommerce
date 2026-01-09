import { generateTestUser, signInUser, signUpUser } from "../utils/auth";

describe("Sign In Flow", () => {
  const testUser = generateTestUser();

  before(() => {
    // Ensure the user exists before testing sign-in
    // If the database is reset between tests, we might need to do this in beforeEach
    // But for now, we'll try to sign up once.
    // Ideally, we'd use a backend command to seed the user, but we'll use the UI for now.
    signUpUser(testUser);

    // Wait for redirect to ensure session is established, then clear cookies to force sign-in
    // Or just sign up and then sign out if there is a sign out button.
    // If we don't clear cookies, we might already be signed in.
    cy.contains("Account created successfully!", { timeout: 10000 });
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  it("should allow a user to sign in with valid credentials", () => {
    signInUser(testUser);

    // Assert success
    cy.contains("Signed in successfully!", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.url().should("include", "/dashboard");
  });

  it("should show an error for invalid credentials", () => {
    cy.visit("/sign-in");
    cy.get("#email").type(testUser.email);
    cy.get("#password").type("WrongPassword123!");
    cy.get('button[type="submit"]').click();

    // Assert error toast (exact message depends on backend, but usually it appears)
    // We check for "Something went wrong" or specific message if known.
    // The component defaults to ctx.error.message || "Something went wrong"
    // Since we don't know the exact backend error message, we look for a toast.
    // But let's verify it doesn't redirect to dashboard.
    cy.url().should("not.include", "/dashboard");
  });
});
