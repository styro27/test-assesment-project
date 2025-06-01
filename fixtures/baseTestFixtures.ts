import {test as base, Page, expect } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";

  type Fixtures = {
    loginPage: LoginPage;
    mainPage: MainPage;
  };

  export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },

    mainPage: async ({ page }, use) => {
      await use(new MainPage(page));
    },
  });





