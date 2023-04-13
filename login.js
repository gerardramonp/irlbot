const { By, until } = require("selenium-webdriver");
require("chromedriver");

const sleep = require("./sleep");

async function login(driver) {
  await driver
    .findElement(By.xpath('//*[@id="__next"]/header/div/div[2]/div[3]/ul/li/a'))
    .click();

  await sleep(1000);

  const emailEl = await driver.wait(
    until.elementLocated(By.id("username")),
    10000
  );
  emailEl.sendKeys("gerardramonirl@gmail.com");
  const passEl = await driver.findElement(By.id("password"));
  passEl.sendKeys("Megamierda1!");
  const signinEl = await driver.findElement(By.name("login")).click();
}

module.exports = login;
