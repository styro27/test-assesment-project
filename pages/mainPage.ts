import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { step } from "../utils/stepDecorator";

export class MainPage {
  readonly page: Page;
  readonly logOutButton: Locator;
  static PROJECT_BUTTONS = {
    webAppButton: "Web Application Main web",
    mobileAppButton: "Mobile Application Native",
  };
  constructor(page: Page, projectButtons = {}) {
    this.page = page;
    this.logOutButton = page.getByRole("button", { name: "Logout" });
  }
  @step("Navigate to {0}")
  async navigateToProject(buttonName: string) {
    const projectText = MainPage.PROJECT_BUTTONS[buttonName];
    await this.page.getByRole("button", { name: projectText }).click();
  }
  @step("Get column {0}")
  getColumn(column: string): Locator {
    return this.page.getByRole("heading", { name: column }).locator("..");
  }
  @step("Get task cards in column {0}")
  getTaskCards(column: string): Locator {
    return this.getColumn(column).locator(
      ".bg-white.p-4.rounded-lg.shadow-sm.border"
    );
  }
  @step("Get task card {0} in column {1}")
  getTaskCard(column: string, task: string): Locator {
    return this.getTaskCards(column).filter({
      has: this.page.locator("h3", { hasText: task }),
    });
  }
  @step("Get tags for task card {0} in column {1}")
  getTaskTags(taskCard: Locator): Locator {
    return taskCard.locator("div.flex.flex-wrap.gap-2");
  }
  @step("Log out")
  async logOut() {
    await this.logOutButton.click();
    expect(new LoginPage(this.page).signInButton).toBeVisible();
  }
}
