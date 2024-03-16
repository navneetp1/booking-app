import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173"

test.beforeEach(async({ page }) => {
    await page.goto(UI_URL);

    //get the sign in button
    await page.getByRole("link", { name: "Sign In"}).click();
  
    //what we should expect after clicking the sign in button
    await expect(page.getByRole("heading", { name: "Sign In"})).toBeVisible();
  
    //filling in the email and password in sign in page
    await page.locator("[name=email]").fill("h@r.com");
    await page.locator("[name=password]").fill("navneetp");
  
    await page.getByRole("button", { name: "Login"}).click();
  
    //after signing in, we are expecting this - (sign in successful toast message becomes visible)
    await expect(page.getByText("Sign In Successful")).toBeVisible();
});

test("should display hotel search results", async({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where you going?").fill("Morocco");
    await page.locator('.search-icon').click();

    await expect(page.getByText("Hotels found in Morocco")).toBeVisible();
    await expect(page.getByText("Morocco Plebians")).toBeVisible();
})