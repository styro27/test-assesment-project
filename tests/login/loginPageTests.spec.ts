import { test } from "../../fixtures/baseTestFixtures";
import { expect } from "@playwright/test";
import invalidCredentials from "../../test-data/invalidCredentialData.json";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
});
test("Login with valid credentials", async ({ loginPage, mainPage }) => {
  if (!process.env.USER_NAME || !process.env.PASSWORD) {
    throw new Error("USER_NAME or PASSWORD not set in environment variables");
  }
  await loginPage.login(process.env.USER_NAME, process.env.PASSWORD);
  await expect(mainPage.logOutButton).toBeVisible();
});

test.describe("Login with empty Username", () => {
  const emptyUserName = [
    {
      userName: "",
      password: "password123",
      error: "Please fill out this field.",
    },
    { userName: "", password: "", error: "Please fill out this field." },
  ];
  for (const { userName, password, error } of emptyUserName) {
    test(`Login with "${userName}" and "${password}"`, async ({
      page,
      loginPage,
    }) => {
      await loginPage.login(userName, password);
      const userNameField = page.getByRole("textbox", {
        name: "Username",
      });
      const message = await userNameField.evaluate(
        (el) => (el as HTMLInputElement).validationMessage
      );
      expect(message).toBe(error);
    });
  }
});
test(`Login with empty Password`, async ({ page, loginPage }) => {
  await loginPage.login("admin", "");
  const userNameField = page.getByRole("textbox", {
    name: "Password",
  });
  const message = await userNameField.evaluate(
    (el) => (el as HTMLInputElement).validationMessage
  );
  expect(message).toBe("Please fill out this field.");
});
test.describe("Login with invalid credentials", () => {
  for (const credentials of invalidCredentials) {
    test(`Login with "${credentials.userName}" and "${credentials.password}"`, async ({
      loginPage,
    }) => {
      await loginPage.login(credentials.userName, credentials.password);
      expect(await loginPage.getErrorMessage()).toBe(credentials.error);
    });
  }
});
