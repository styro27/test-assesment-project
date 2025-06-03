````markdown
# 🧪 Task Board Test Project

Automated UI testing project using **Playwright** and **TypeScript** for a sample task board web application.

## 📌 Project Overview

This project demonstrates an end-to-end testing framework for a task board application. It is written in **TypeScript** and uses:

- 🎭 [Playwright](https://playwright.dev/) – fast and reliable end-to-end testing framework  
- 📊 [Allure Reports](https://docs.qameta.io/allure/) – for advanced visual test reporting  
- 🐙 GitHub Actions – CI pipeline that runs tests and generates reports automatically

---

## 🧰 Tech Stack

- Node.js (v20)  
- Playwright  
- Allure Playwright Reporter  
- GitHub Actions  

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/styro27/task-board-test-project.git
````

### 2. Install Playwright

```bash
npm init playwright@latest
```
### 3. Install Allure

```bash
npm install --save-dev @playwright/test allure-playwright
```
### 4. Install Dotenv

```bash
npm install dotenv ts-node
```

## 🧪 Running Tests Locally

Run all Playwright tests:

```bash
npx playwright test
```

Generate and open Allure report:

```bash
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

---

## ⚙️ CI/CD with GitHub Actions

Each push to `main` or `master` will:

* Install dependencies (if needed)
* Run tests
* Generate Allure report
* Upload report as artifact
* Deploy report to GitHub Pages

You can find the CI configuration at:
`.github/workflows/playwright.yml`

---

## 📊 Accessing Allure Reports

You have two options to view test reports:

### 🔗 Option 1: Open from GitHub Actions Summary

After a successful CI run:

* Navigate to the relevant GitHub Actions workflow run
* Scroll down to the **Summary** section
* Find the “Allure Report Instructions” block with a direct link to the report

### 💾 Option 2: Download and View Locally

#### If you have npm:
1. Download the `allure-report.zip` artifact from the CI run
2. Unzip the file
3. Serve it locally using any static server, for example:

```bash
npx http-server path_to_allure_folder -p 8000
```
4. Then open:
   `http://localhost:8000` in your browser

#### If you use VS Code:
1. Install the Live Server extension.
2. Open the allure-report folder in VS Code.
3. Right-click index.html → Open with Live Server.
---

## 📄 Project Structure

```bash
.
├── .github/workflows/       # CI pipeline config (GitHub Actions)
├── pages/            # Page Object Model classes
│   ├── loginPage.ts
│   ├── maindPage.ts
│   └── ...
├── tests/                   # Main test specs
│   ├── login/loginPageTests.spec.ts      
│   └── dashboard/projectsPageTests.spec.ts
├── test-data/               # Static or dynamic test data
│   ├── taskAndTagsData.json
│   └── ... 
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project metadata and scripts
├── allure-results/          # Raw results (auto-generated)
└── ...
```

