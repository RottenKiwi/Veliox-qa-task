import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as config from '../config';
import { getLocalizedText, randomDelay, parseDateFromAriaLabel } from '../helpers';
import { log } from '../logger';


// Apply Stealth Plugin to bypass detection mechanisms
chromium.use(StealthPlugin());

(async () => {
    // Launch browser with headless mode disabled and slow-motion effect for better visibility
    const browser = await chromium.launch({ headless: false, slowMo: randomDelay(100, 300) });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 1: Navigate to Excel Online
    await page.goto('https://office.live.com/start/Excel.aspx', { waitUntil: 'networkidle' });
    await page.waitForTimeout(randomDelay(1000, 3000)); // Random wait to simulate human behavior

    // Step 2: Enter login credentials
    await page.waitForSelector('input[name="loginfmt"]');
    await page.type('input[name="loginfmt"]', config.email, { delay: randomDelay(50, 150) });
    await page.click('input[type="submit"]');

    // Step 3: Wait for password field and enter password
    await page.waitForSelector('input[name="passwd"]', { timeout: 8000 });
    const passwordField = await page.locator('input[name="passwd"]');
    await passwordField.click(); // Ensure password field is focused
    await passwordField.fill(config.password); // Fill password
    await page.click('#idSIButton9');
    log('Password entered and "Next" clicked.');

    // Step 4: Handle "Stay signed in?" prompt
    try {
        await page.waitForSelector('#kmsiTitle', { timeout: 5000 });
        await page.click('#declineButton'); // Decline "Stay signed in?"
    } catch (error) {
        log('No "Stay signed in?" prompt detected.');
    }

    // Get localized text for creating a new blank workbook
    const localizedText = getLocalizedText();

    // Step 5: Open a new blank workbook (opens in a new tab)
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for new tab to open
        await page.click(`[aria-label="${localizedText}"]`), // Click button to create new workbook
    ]);
    log('Opened a new blank workbook in a new tab!');
    await newPage.bringToFront(); // Switch to the new tab

    // Step 6: Wait for the workbook iframe to load
    const iframe = await newPage.waitForSelector('iframe');
    if (!iframe) {
        console.error('Iframe not found!');
        return;
    }

    const iframeElement = await iframe.contentFrame();
    if (!iframeElement) {
        console.error('Iframe content frame is null!');
        return;
    }

    // Step 7: Wait for Excel to load inside the iframe and locate the formula bar
    const formulaBar = await iframeElement.locator('[aria-label="formula bar"]');
    log('Formula bar located.');

    // Step 8: Click on the formula bar to focus it
    await formulaBar.click();
    log('Formula bar clicked.');

    // Add delay before typing the formula
    await page.waitForTimeout(randomDelay(500, 1000)); // Random timeout before typing
    await formulaBar.type('=TODAY()');

    // Add delay before pressing 'Enter'
    await page.waitForTimeout(randomDelay(500, 1000)); // Random timeout before pressing Enter
    await formulaBar.press('Enter');

    // Wait for a short time to ensure any tooltip or pop-up is closed
    await page.waitForTimeout(randomDelay(1000, 2000));

    // Step 9: Insert "A1" into the name box input
    const nameBoxInput = await iframeElement.locator('#FormulaBar-NameBox-input');
    await nameBoxInput.fill('A1'); // Insert 'A1'
    log('Inserted "A1" into the name box input.');

    // Add delay after filling 'A1'
    await page.waitForTimeout(randomDelay(2000, 4000));

    // Step 10: Press Enter after filling 'A1'
    await nameBoxInput.press('Enter');
    log('Pressed Enter after inserting "A1".');

    // Wait for a few seconds before checking the date
    await page.waitForTimeout(randomDelay(2000, 4000));

    // Step 11: Extract date from aria-label and compare with today's date
    const dateLabel = await iframeElement.locator('#m_excelWebRenderer_ewaCtl_readoutElement1');
    const ariaLabel = await dateLabel.getAttribute('aria-label');
    log('Aria-Label Text: ' + ariaLabel);

    if (ariaLabel) {
        const formattedExtractedDate = parseDateFromAriaLabel(ariaLabel);

        if (formattedExtractedDate) {
            log('Formatted Extracted Date: ' + formattedExtractedDate);

            // Compare extracted date with today's date
            const today = new Date().toLocaleDateString('en-GB'); // Get today's date in DD/MM/YYYY format
            log('Today: ' + today);

            if (formattedExtractedDate === today) {
                log('✅ TODAY() function returned the correct date.');
            } else {
                log('❌ TODAY() function returned an incorrect date.');
            }
        } else {
            log('❌ Could not find a date in the aria-label.');
        }
    }

    // Wait before closing browser (optional)
    await page.waitForTimeout(randomDelay(1000, 2000));
    //close the browser
    await browser.close();
})();
