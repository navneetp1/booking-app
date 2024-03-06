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
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
  
    await page.getByRole("button", { name: "Login"}).click();
  
    //after signing in, we are expecting this - (sign in successful toast message becomes visible)
    await expect(page.getByText("Sign In Successful")).toBeVisible();
});

test("should allow user to add hotel", async({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Lorem Ipsum is lorem Ipsum is description");
    await page.locator('[name="pricePerNight"]').fill("100");

    await page.selectOption('select[name="starRating"]', "5"); 

    await page.getByText("Budget").click();

    await page.getByLabel("Free wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpeg"),
    ])


    await page.getByRole("button", { name: "Save"}).click();
    await page.waitForTimeout(5000); //added a timeout here since the saving takes a while to update on the DB
    await expect(page.getByText("Hotel Saved")).toBeVisible(); 
    
})