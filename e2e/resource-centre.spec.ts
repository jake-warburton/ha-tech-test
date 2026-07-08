import { expect, test } from "@playwright/test";

test("filters, sorts, and opens resource details", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Resource Centre" }),
  ).toBeVisible();
  await expect(page.getByRole("region", { name: "Podcasts" })).toBeVisible();

  await page.getByRole("button", { name: "sleep", exact: true }).click();

  await expect(
    page.getByRole("heading", { name: "The Science of Sleep" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Guided Meditation for Stress Relief" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Mindful Moments" }),
  ).not.toBeVisible();

  await page.getByRole("combobox", { name: "Sort resources" }).selectOption(
    "category",
  );

  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Articles",
    "Meditation",
  ]);

  await page
    .getByRole("button", { name: "View The Science of Sleep" })
    .click();

  const details = page.getByRole("dialog", { name: "The Science of Sleep" });

  await expect(details).toBeVisible();
  await expect(
    details.getByRole("img", { name: "The Science of Sleep thumbnail" }),
  ).toBeVisible();
  await expect(details.getByText("002")).toBeVisible();
  await expect(details.getByText("8 min")).toBeVisible();
  await expect(
    details.getByText(
      "Explore the latest research on how sleep affects mental and physical health.",
    ),
  ).toBeVisible();

  await details.getByRole("button", { name: "Close details" }).click();

  await expect(details).not.toBeVisible();
});
