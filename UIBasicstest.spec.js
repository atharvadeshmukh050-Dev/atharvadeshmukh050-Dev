const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('First Playwright test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractice/");
    console.log(await page.title());
    // css
    await page.locator('#username').fill("Atharva");
    await page.locator("[type='password']").fill("password");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect( page.locator("[style*='block']")).toContainText('Incorrect');
});

test('Page Playwright test', async ({page}) =>
{
    await page.goto("https://www.google.com/");
    console.log(await page.title());
     await expect(page).toHaveTitle("Google");
});


test ('UI Controls', async ({page}) =>
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractice/");
    const userNamen= page.locator('#username');
    const signIn = page.locator("#SignInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect( page.locator("#terms")).toBeChecked();
    await page.locator ("#terms").uncheck();
    expect (await page.locator ("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    //await page.pause();


});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })
