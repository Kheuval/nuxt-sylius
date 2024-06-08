import { setup, createPage, url } from "@nuxt/test-utils/e2e";
import { describe, test, expect } from "vitest";

describe("app", async () => {
  await setup();

  test('Index page contains a heading with "Title" as content', async () => {
    const page = await createPage();

    await page.goto(url("/"), { waitUntil: "hydration" });
    const title = await page.textContent("h1");

    expect(title).toBe("Bienvenue");
  });
});
