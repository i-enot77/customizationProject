import { afterAll, beforeAll, describe, it } from "vitest";
const { Builder, By, until } = require("selenium-webdriver");
import assert from "assert";
import { WebDriver } from "selenium-webdriver";
require("chromedriver");

describe("ProductItem and MaterialMenu Components Selenium Test", function () {
  let driver: WebDriver;

  beforeAll(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async function () {
    await driver.quit();
  });

  it("should load ProductItem page, select material, and add to cart", async function () {
    await driver.get(
      "http://localhost:5173/krzes%C5%82a/66740b023b1d5bbe16500b64?base=662cfe133c6e129ad75453e1&legs=662d07e53c6e129ad75453e3"
    );

    const productName = await driver.wait(
      until.elementLocated(By.css("h2.text-4xl")),
      10000
    );
    const productNameText = await productName.getText();
    assert.strictEqual(productNameText, "Simba", "Product name is incorrect");

    const changeMaterialButton = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Zmień')]")),
      10000
    );
    await changeMaterialButton.click();

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'żółta skóra')]")),
      5000
    );
    const leatherOption = await driver.findElement(
      By.xpath("//*[contains(text(), 'żółta skóra')]")
    );
    await leatherOption.click();

    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('button[data-testid="add_btn"]')),
      10000
    );
    await addToCartButton.click();
  });
});
