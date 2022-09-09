const express = require('express');
const { Builder, By } = require('selenium-webdriver');

const app = express();
const port = 3002;
let driver;

app.get('/search', async (request, response) => {
  try {
    const data = await GoogleSearchWithLambdaTest();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({
      message: 'Server error occurred',
    });
  }
});

const USERNAME = ''; //replace with your username
const KEY = ''; //replace with your accesskey

const GRID_HOST = 'hub.lambdatest.com/wd/hub';

const searchCapabilities = {
  build: 'JavaScript and Selenium Web Testing',
  name: 'Google Search',
  platform: 'Windows 10',
  browserName: 'Chrome',
  geoLocation: 'US',
  version: '90.0',
  selenium_version: '3.13.0',
  'chrome.driver': '90.0',
};

const searchGridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

async function GoogleSearchWithLambdaTest() {
  try {
    driver = await new Builder()
      .usingServer(searchGridUrl)
      .withCapabilities(searchCapabilities)
      .build();

    await driver.get('https://www.google.com/search?q=lambdatest');

    const titles = await driver.findElements(By.id('rso'));

    return await getFirstTitle(titles);
  } catch (error) {
    throw new Error(error);
  } finally {
    await driver.quit();
  }
}

async function getFirstTitle(titles) {
  let allTitles = [];

  try {
    for (const title of titles) {
      const text = await title
        .findElement(
          By.xpath(
            '//*[@id="rso"]/div[1]/div/div/div/div/div/div/div/div[1]/a/h3'
          )
        )
        .getText();
      allTitles.push(text);
    }
  } catch (error) {
    console.log(error);
  }
  return allTitles;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
