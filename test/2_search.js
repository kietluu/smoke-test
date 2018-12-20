const assert = require('assert')
const puppeteer = require('puppeteer')
const config = require('./config')

let browser, page


const {staging} = config

before(async () => {
	browser = await puppeteer.launch({headless: true})
	page = await browser.newPage()

})

describe('Search - Homepage', () => {

	it('has search input', async () => {

		await page.setViewport({width: 1280, height: 800})
		await page.goto(staging.home, {waitUntil: 'networkidle0'})
		const searchInput = await page.$('.ip-search')
		assert.ok(searchInput)

	}).timeout(20000)

	it('shows search results after search input', async () => {

		await page.type('.ip-search', 'khach san')
		await page.waitForSelector('.search-inner-dropdown-ctn')
		const firstResult = await page.$('.search-auto-lst-item')
		assert.ok(firstResult)

	}).timeout(10000)

	it('Page result search', async () => {

		await page.click('button.btn-search')
		await page.waitForSelector('div.search-page')

		const pageResultSearch = await page.$('.search-filter')
		assert.ok(pageResultSearch)

	}).timeout(10000)
})


after(async () => {
	await browser.close()
})