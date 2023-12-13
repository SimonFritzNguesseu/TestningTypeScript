import * as puppeteer from 'puppeteer';
describe('Navigering bakåt i ansökningsflödet', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Användaren kan navigera bakåt och ändringar sparas korrekt', async () => {
    await page.goto('https://reky.se/ansokningsformular');

    // Fyll i första steget i formuläret
    await page.type('#namn', 'Test Användare'); // Ersätt med riktig selektor
    // Anta att det finns en knapp för att gå till nästa steg
    await page.click('#next-step-button'); // Ersätt med riktig selektor
    await page.waitForNavigation();

    // Navigera tillbaka till föregående steg
    await page.click('#back-button'); // Ersätt med riktig selektor
    await page.waitForNavigation();

    // Gör en ändring i det första steget
    await page.type('#namn', ' Uppdaterad'); // Lägg till i befintlig text

    // Fortsätt framåt igen
    await page.click('#next-step-button'); // Ersätt med riktig selektor
    await page.waitForNavigation();

    // Slutför och skicka in formuläret
    await page.click('#submit-button'); // Ersätt med riktig selektor
    await page.waitForNavigation();

    // Valideringar för att säkerställa att ändringar har sparats
    // Detta kan inkludera att kontrollera databasen, bekräftelsemeddelanden, etc.
    // Exempel (anpassa enligt ditt formulärs beteende):
    const confirmationText = await page.$eval('.confirmation', el => el.textContent);
    expect(confirmationText).toContain('Tack för din ansökan');
    // Ytterligare valideringar kan läggas till här

  }, 30000); // Timeout-värdet kan justeras beroende på sidans svarstid
});
