import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 */
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENV || "test"}` });

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : "50%",
  //*Reporters*/
  reporter: [["line"], ["allure-playwright"]],

  outputDir: "screenshots",
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
