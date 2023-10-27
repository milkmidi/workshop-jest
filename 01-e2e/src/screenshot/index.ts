/* eslint-disable no-shadow */
// import * as puppeteer from 'puppeteer';
import { Browser, Page, devices, chromium } from '@playwright/test';

const iPhoneX = devices['iPhone 11 Pro'];

type Devices = 'desktop' | 'mobile';

let browser: Browser;
let desktopPage: Page;
let mobilePage: Page;

const init = async () => {
  browser = await chromium.launch();

  desktopPage = await browser.newPage();
  mobilePage = await browser.newPage({
    ...iPhoneX,
  });
};

const screenshot = async (device: Devices = 'desktop') => {
  const page = device === 'desktop' ? desktopPage : mobilePage;
  await page.goto(`https://milkmidi.github.io/e2e-test-html`);
  await page.waitForTimeout(3000);
  const imgFileName = `./screenshot/${device}.jpg`;
  await page.screenshot({ path: imgFileName, fullPage: true });
};

Promise.resolve()
  .then(() => init())
  .then(() => screenshot('desktop'))
  .then(() => screenshot('mobile'))
  // .then(() => uploadScreenShotToSlack())
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    console.log('screenshot finish!');
    await browser.close();
    process.exit();
  });
