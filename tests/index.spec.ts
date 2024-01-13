import { test, expect } from "@playwright/test";

test('Index page contains a heading with "Title" as content', async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  await expect(page.getByRole("heading", { name: "Title" })).toBeVisible();
});
