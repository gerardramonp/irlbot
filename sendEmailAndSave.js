const fs = require("fs");
const { By, until } = require("selenium-webdriver");
require("chromedriver");

const sleep = require("./sleep");
const saveLog = require("./log");

const FULL_NAME = "Gerard Ramon Monte";
const EMAIL = "gerardramonirl@gmail.com";
const MESSAGE = `Hello, I’m Gerard, a senior Software Developer living in Dublin, and I am looking for a flat to go live with my girlfriend, a restaurant manager.\n
We are both non-smokers, very calm people, have no pets, and we can provide references if needed.\n
We are available to move in any time and would like to arrange a viewing if the property is still available. Please let us know if you need any additional information.\n 
Thank you.`;

async function sendEmailAndSave(driver, index) {
  try {
    await sleep(3000);

    await driver
      .findElement(
        By.xpath(`//*[@id="__next"]/main/div[3]/div[1]/ul/li[${index + 1}]/a`)
      )
      .click();

    await driver.manage().setTimeouts({ implicit: 3000 });

    const emailButtonWait = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="__next"]/main/div[3]/div[2]/div/div[1]/div[2]/div[2]/button'
        )
      ),
      10000
    );

    await emailButtonWait.click();

    const nameInputEl = await driver.findElement(By.name("name"));
    nameInputEl.sendKeys(FULL_NAME);
    const emailInputEl = await driver.findElement(By.name("email"));
    emailInputEl.sendKeys(EMAIL);
    const messageInputEl = await driver.findElement(By.name("message"));
    messageInputEl.sendKeys(MESSAGE);

    const sendButtonEl = await driver
      .findElement(
        By.xpath(
          `//*[@id="contact-form-modal"]/div[2]/form/div/div[5]/div/button`
        )
      )
      .click();

    await sleep(1000);

    const closeButtonEl = await driver
      .findElement(By.xpath(`//*[@id="contact-form-modal"]/div[1]/button`))
      .click();

    await sleep(500);

    const likeButtonEl = await driver
      .findElement(
        By.xpath(`//*[@id="__next"]/main/div[1]/div[2]/div[3]/button`)
      )
      .click();

    await sleep(2000);
    console.log("Apartment saved....");
    driver.navigate().back();
  } catch (error) {
    console.log(error);
    const errorContent = `[${new Date().toLocaleString("es-ES", {
      timeZone: "CET",
    })}] <<Sending email & saving>> - ${error}`;
    saveLog(errorContent);
    driver.navigate().back();
  }
}

module.exports = sendEmailAndSave;
