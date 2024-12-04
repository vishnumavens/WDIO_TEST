import homePage from '../pageObjects/home-page.js';
import data from '../test-data/navigationButtons.json' assert { type: 'json' };
import { endApiCallsPerformance, startApiCallsPerformance } from '../pageObjects/api-performance-action.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let filePath = path.join(__dirname, `../.artifacts/api-performance.txt`);
import fs from 'fs';
fs.writeFileSync(filePath, '');

let API_LoginPage;

describe('Test 10', () => {
	it('should launch the Url', async () => {
		const apiTimings = await startApiCallsPerformance();
		await homePage.openUrl();
		API_LoginPage = await endApiCallsPerformance(apiTimings);
		await expect(await homePage.$header('Next-gen browser and mobile automation test framework for Node.js').isDisplayed())
			.withContext('Expect Header to be displayed')
			.toBe(true);
	});
	for (let item of data.navigationButtons) {
		it(`should validate the button : ${item} present in the landing page `, async () => {
			await expect(homePage.$buttons(item)).withContext('Expect Navigations buttons to be displayed').toBeDisplayed();
		});
	}

	afterAll(async () => {
		fs.appendFileSync(filePath, `API_LoginPage: ${Number(API_LoginPage).toFixed(3)}`);
	});
});
