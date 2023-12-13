import * as puppeteer from 'puppeteer';

describe('Korrekt ifyllt ansökningsformulär', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Användaren kan fylla i och skicka in ansökningsformuläret korrekt', async () => {
    await page.goto('https://reky.se/ansokningsformular');

    // Exempel på hur du fyller i ett formulär. Ändra dessa selektorer för att matcha dina.
    await page.type('#namn', 'Test Användare'); // Ersätt #namn med rätt selektor
    await page.type('#email', 'test@example.com'); // Ersätt #email med rätt selektor
    // Fyll i andra nödvändiga fält här...

    // Klicka på knappen för att skicka in formuläret. Ändra selektorn för att matcha din.
    await page.click('#submit-button'); // Ersätt #submit-button med rätt selektor
    await page.waitForNavigation();

    // Verifiera att ansökan har skickats och en bekräftelse visas
    // Ändra .confirmation till en selektor som matchar ditt bekräftelsemeddelande
    const confirmationText = await page.$eval('.confirmation', el => el.textContent);
    expect(confirmationText).toContain('Tack för din ansökan');

    // Ytterligare valideringar kan läggas till här beroende på sidans beteende
  }, 30000); // Timeout-värdet kan justeras beroende på sidans svarstid
});
