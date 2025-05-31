import { Page, Locator } from "@playwright/test";
import { step } from "../utils/stepDecorator";
export class LoginPage {
  readonly userName: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.errorMessage = page.getByText("Invalid username or password");
  }
  @step("Login with {0} and {1}")
  async login(userName: string, password: string) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInButton.click();
  }
  @step("Get error message")
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
