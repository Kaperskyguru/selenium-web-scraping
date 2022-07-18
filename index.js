const express = require('express');
const { Builder, By } = require('selenium-webdriver');

const app = express();
const port = 3002;
let driver;
app.get('/', async (request, response) => {
  // Web Scraping Code here
  try {
    const data = await WebScrapingLocalTest();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({
      message: 'Server error occurred',
    });
  }
});

async function WebScrapingLocalTest() {
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.youtube.com/c/LambdaTest/videos');

    const allVideos = await driver.findElements(
      By.css('ytd-grid-video-renderer.style-scope.ytd-grid-renderer')
    );
    return await getVideos(allVideos);
  } catch (error) {
    throw new Error(error);
  } finally {
    await driver.quit();
  }
}

app.get('/lambdatest', async (request, response) => {
  try {
    const data = await WebScrapingWithLambdaTest();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({
      message: 'Server error occurred',
    });
  }
});

const USERNAME = 'solomoneseme'; //replace with your username
const KEY = '7gk91xabRCYfmrwWySH9FHTMa8AOpSw4D6Sn2EyxGCvsxbpF9U'; //replace with your accesskey

const GRID_HOST = 'hub.lambdatest.com/wd/hub';

const capabilities = {
  build: 'JavaScript and Selenium Web Scraping',
  name: 'Youtube Videos',
  platform: 'Windows 10',
  browserName: 'Chrome',
  geoLocation: 'US',
  version: '90.0',
  selenium_version: '3.13.0',
  'chrome.driver': '90.0',
};

const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

async function WebScrapingWithLambdaTest() {
  try {
    driver = await new Builder()
      .usingServer(gridUrl)
      .withCapabilities(capabilities)
      .build();

    await driver.get('https://www.youtube.com/c/LambdaTest/videos');

    const allVideos = await driver.findElements(
      By.css('ytd-grid-video-renderer.style-scope.ytd-grid-renderer')
    );
    return await getVideos(allVideos);
  } catch (error) {
    throw new Error(error);
  } finally {
    await driver.quit();
  }
}

async function getVideos(videos) {
  let videoDetails = [];

  try {
    for (const video of videos) {
      const title = await video.findElement(By.id('video-title')).getText();
      const views = await video
        .findElement(By.xpath(".//*[@id='metadata-line']/span[1]"))
        .getText();
      const date = await video
        .findElement(By.xpath(".//*[@id='metadata-line']/span[2]"))
        .getText();
      videoDetails.push({
        title: title ?? '',
        views: views ?? '',
        publishedDate: date ?? '',
      });
    }
  } catch (error) {
    console.log(error);
  }
  return videoDetails;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
