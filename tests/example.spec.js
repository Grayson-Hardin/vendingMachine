// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const { Client } = require("pg");
async function queryDb(number, selection){
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
  })

  await client.connect();

  await client.query(`UPDATE items SET inventory = '${number}' WHERE selection_id = '${selection}'`)

  await client.end();

}

test('item out of stock', async ({page}) => {
  await queryDb(0, 'A1')
  await page.goto('http://localhost:3000');


  await page.getByRole('button', {name: '$1.00'}).click();
  await page.getByRole('button', {name: 'Mountain Dew', exact: true}).click();


  const locator = page.locator('.MuiAlert-message')
  await expect(locator).toHaveText("Item out of stock")
})

test('add dollar button', async ({page}) => {
  await queryDb(5, 'A1')
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '$1.00' }).click();
  await page.getByRole('button', { name: 'Mountain Dew', exact: true }).click();

  const locator = page.locator('.MuiAlert-message');
  await expect(locator).toHaveText("Mountain Dew Purchased");

})
test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/React App/);
});

  test('insufficient funds message when attempting to select item without payment', async ({page}) => {
    await queryDb(5, 'A1')
    await page.goto('http://localhost:3000');

    await page.getByRole('button', { name: 'Mountain Dew', exact: true }).click();

    const locator = page.locator('.MuiAlert-message')
    await expect(locator).toHaveText("Insufficient funds: item costs $1");
  })

  test('insufficient funds when provided payment is less than item price', async ({page}) => {
    await queryDb(5, 'A1');
    await page.goto('http://localhost:3000');

    await page.getByRole('button', {name: '$0.25'}).click();
    await page.getByRole('button', {name: 'Mountain Dew', exact: true}).click();

    const locator = page.locator('.MuiAlert-message')
    await expect(locator).toHaveText("Insufficient funds: item costs $1")
  })

  test('return change when provided more payment than item price', async ({page}) => {
    await queryDb(5, 'A1')
    await page.goto('http://localhost:3000');

    await page.getByRole('button', {name: '$1.00'}).click()
    await page.getByRole('button', {name: '$0.25'}).click();
    await page.getByRole('button', {name: 'Mountain Dew', exact: true}).click();

    const locator = page.locator('.MuiAlert-message')
    await expect(locator).toHaveText("Mountain Dew Purchased. Change returned: $0.25")
  })

test('done should reset alert', async ({page}) => {
  await queryDb(5, 'A1')
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '$1.00' }).click();
  await page.getByRole('button', { name: 'Mountain Dew', exact: true }).click();

  const locator = page.locator('.MuiAlert-message');
  await expect(locator).toHaveText(/Mountain Dew Purchased/);

  await page.getByRole('button', { name: 'done'}).click();
  await expect(await page.locator('.MuiAlert-message')).toHaveCount(0)

})