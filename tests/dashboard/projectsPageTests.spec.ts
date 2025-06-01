import { expect } from "@playwright/test";
import { test } from "../../fixtures/baseTestFixtures";
import taskData from "../../test-data/taskAndTagsData.json";

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto(process.env.BASE_URL!);
  if (!process.env.USER_NAME || !process.env.PASSWORD) {
    throw new Error("USER_NAME or PASSWORD not set in environment variables");
  }
  await loginPage.login(process.env.USER_NAME, process.env.PASSWORD);
});
test.describe("Check columns and tags for tasks", () => {
  for (const { task, column, tags, app } of taskData) {
    test(`Check task "${task}" is in column "${column}" and has tags "${tags}"`, async ({
      mainPage,
    }) => {
      await mainPage.navigateToProject(app);
      const taskCard = mainPage.getTaskCard(column, task);
      const taskTags = mainPage.getTaskTags(taskCard);

      await expect
        .soft(taskCard, "task is in correct column")
        .toContainText(task);
      await expect
        .soft(taskTags, "task has correct tags")
        .toContainText(tags.join(""));
    });
  }
});
