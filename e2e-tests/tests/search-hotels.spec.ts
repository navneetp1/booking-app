import { test, expect } from "@playwright/test";
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

test("should show hotel details page", async ({ page })=> {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where you going?").fill("Morocco");
    await page.locator('.search-icon').click();

    await page.getByText("Morocco Plebians").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now"})).toBeVisible();
});

test("should book hotel", async({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where you going?").fill("Morocco");

    const date = new Date()
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate)


    await page.locator('.search-icon').click();

    await page.getByText("Morocco Plebians").click();
    await page.getByRole("button", { name: "Book Now"}).click();

    await expect(page.getByText("Total Cost: $120.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first()
    await stripeFrame.locator('[placeholder="Card number"]')
                     .fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24234");

    await page.getByRole("button", { name: "Confirm Booking"}).click();
    
    await page.waitForTimeout(5000);
    await expect(page.getByText("Booking saved")).toBeVisible();

    await page.getByRole("link", { name: "My Bookings"}).click();
    await expect(page.getByText("Morocco Plebians")).toBeVisible()

});