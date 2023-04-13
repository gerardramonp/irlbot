const { By, Builder, Key } = require("selenium-webdriver");
require("chromedriver");

const login = require("./login");
const sleep = require("./sleep");

const sendEmailAndSave = require("./sendEmailAndSave");

async function getAppartment() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "https://www.daft.ie/property-for-rent/dublin-city?rentalPrice_to=1700&sort=publishDateDesc&rentalPrice_from=900"
    );

    await sleep(500);

    const cookiesEl = await driver
      .findElement(By.xpath("//*[contains(text(),'Accept All')]"))
      .click();

    await login(driver);

    await sleep(500);

    // loop through the apartments
    const apartmentSaveds = await driver.findElements(
      By.xpath("//a/div/div[3]/div/button/span")
    );
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
        console.log("Sending email and saving apartment....");

        await sendEmailAndSave(driver, index);
      }
    }

    driver.close();
  } catch (error) {
    console.log(error);
    driver.close();
  }
}

getAppartment();
