import * as puppeteer from 'puppeteer';

describe('Felaktigt ifyllt ansökningsformulär', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Valideringsmeddelanden visas för felaktigt ifyllda fält', async () => {
    await page.goto('https://reky.se/ansokningsformular');

    // Fyll i formuläret med felaktig information
    await page.type('#namn', ''); // Lämna ett obligatoriskt fält tomt
    await page.type('#email', 'felaktig-email'); // Skriv in en ogiltig e-postadress
    // Fyll i andra fält med felaktigt information...

    // Försök skicka in formuläret
    await page.click('#submit-button'); // Ersätt med din knappens selektor

    // Vänta på att felmeddelanden ska visas
    // Här behöver du specificera hur ditt system visar felmeddelanden
    const nameError = await page.$eval('#namn-error', el => el.textContent);
    const emailError = await page.$eval('#email-error', el => el.textContent);
    // Hämta och verifiera andra felmeddelanden om det behövs

    // Verifiera att felmeddelanden visas
    expect(nameError).toContain('Detta fält är obligatoriskt'); // Anpassa meddelandet efter ditt system
    expect(emailError).toContain('Ogiltig e-postadress'); // Anpassa meddelandet efter ditt system

    // Ytterligare valideringar kan läggas till här beroende på sidans beteende
  }, 30000); // Timeout-värdet kan justeras beroende på sidans svarstid
});
