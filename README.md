# 📦 Project 1 — E-Commerce Automation (SauceDemo)

## 🌐 Website Under Test
**URL:** https://www.saucedemo.com  
A demo e-commerce site used widely for automation practice. Simulates a real shopping app.

---

## 🎯 Why This Project?
This project shows that I can automate a **real end-to-end shopping flow** — from login to checkout — using Playwright with TypeScript. It also shows that I follow industry-standard design patterns like **Page Object Model (POM)**.

---

## 📁 Folder Structure Explained

```
project-1-ecommerce-saucedemo/
├── pages/               → Page Object Model classes (one file per page)
│   ├── LoginPage.ts     → Handles login page actions
│   ├── ProductPage.ts   → Handles product listing and add-to-cart
│   ├── CartPage.ts      → Handles cart actions
│   └── CheckoutPage.ts  → Handles checkout form and order confirm
├── tests/               → Actual test files
│   ├── login.spec.ts    → Login tests (valid, invalid, locked user)
│   ├── product.spec.ts  → Product sorting and display tests
│   ├── cart.spec.ts     → Cart add/remove tests
│   └── checkout.spec.ts → Full end-to-end checkout flow
├── utils/
│   └── testData.ts      → Centralized test data (usernames, passwords, etc.)
├── .github/workflows/
│   └── playwright.yml   → CI/CD pipeline using GitHub Actions
├── playwright.config.ts → Playwright configuration (browsers, base URL, reports)
├── package.json         → Project dependencies
└── README.md            → Project overview for GitHub
```

---

## ✅ What Is Being Tested?

| Test Area        | What It Checks                                                   |
|-----------------|------------------------------------------------------------------|
| Login           | Valid login, invalid password, locked-out user error message     |
| Products        | Products load correctly, sorting by price/name works             |
| Cart            | Add item, remove item, cart count updates correctly              |
| Checkout        | Fill form, complete purchase, confirm order success message       |

---

## 🛠️ Key Playwright Concepts Used (Explain These in Interview)

1. **Page Object Model (POM):** Each page (Login, Product, Cart, Checkout) has its own TypeScript class. All locators and actions are inside those classes. Tests only call methods — they don't write selectors directly. This makes tests reusable and easy to maintain.

2. **`expect()` assertions:** Used to verify what the user should see. Example: after login, expect the product page title to be visible.

3. **`data-test` locators:** SauceDemo has `data-test` attributes, which are the most stable selectors (better than CSS class or XPath).

4. **Cross-browser testing:** Tests run on Chromium, Firefox, and WebKit (Safari) as configured in `playwright.config.ts`.

5. **GitHub Actions CI:** Every time code is pushed to GitHub, tests run automatically using the `playwright.yml` workflow.

6. **HTML Reports:** After test run, Playwright generates an HTML report showing pass/fail with screenshots.

---

## 💬 Interview Questions You Should Prepare

**Q: Why did you choose SauceDemo?**  
A: It's a purpose-built demo app that simulates real e-commerce scenarios. It has multiple user types (standard, locked, slow) which lets me test various edge cases without needing a backend setup.

**Q: What is POM and why did you use it?**  
A: Page Object Model separates the test logic from page interaction logic. If a locator changes, I update only one file (the page class), not every test. It improves maintainability and reusability.

**Q: What locator strategy did you use?**  
A: I preferred `data-test` attributes as they are stable and not affected by UI styling changes. Where not available, I used `getByRole()` and `getByText()` which are Playwright's recommended locator methods.

**Q: How did you run tests in multiple browsers?**  
A: In `playwright.config.ts`, I configured three projects: chromium, firefox, and webkit. Running `npx playwright test` executes tests in all three automatically.
