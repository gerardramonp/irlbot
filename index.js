const fs = require("fs");
const { By, Builder, Key } = require("selenium-webdriver");
require("chromedriver");

const login = require("./login");
const sleep = require("./sleep");
const saveLog = require("./log");

const sendEmailAndSave = require("./sendEmailAndSave");

const URL =
  "https://www.daft.ie/property-for-rent/dublin-city?rentalPrice_to=1700&sort=publishDateDesc&rentalPrice_from=900";

async function getAppartment() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.manage().window().maximize();
    await driver.get(URL);

    await sleep(500);

    const cookiesEl = await driver
      .findElement(By.xpath("//*[contains(text(),'Accept All')]"))
      .click();

    await login(driver);

    await sleep(500);

    let sentCount = 0;
    for (let index = 0; index < 10; index++) {
      await sleep(1000);

      const currentApartmentSaved = await driver
        .findElement(
          By.xpath(
            `//*[@id="__next"]/main/div[3]/div[1]/ul/li[${
              index + 1
            }]/a/div/div[3]/div/button/span`
          )
        )
        .getText();

      if (currentApartmentSaved === "Save") {
        await sendEmailAndSave(driver, index);
        sentCount += 1;
      }
    }

    console.log(
      `[${new Date().toLocaleString("es-ES", { timeZone: "CET" })}] - Finished!`
    );
    const successContent = `>>[${new Date().toLocaleString("es-ES", {
      timeZone: "CET",
    })}]<< Finished, new apartments: ${sentCount}`;
    saveLog(successContent);
    driver.close();
  } catch (error) {
    const errorContent = `[${new Date()}] - ${error}`;
    saveLog(errorContent);
    driver.close();
  }
}

getAppartment();
