const assert = require('assert')
const puppeteer = require('puppeteer')
const config = require('./config')

let browser, page

const { staging } = config

before(async () => {
	browser = await puppeteer.launch({headless: true})
	page = await browser.newPage()

})

describe('Product Page', () => {

	it('Page result', async () => {
		await page.setViewport({width: 1280, height: 800})
		await page.goto(staging.productCat, {waitUntil: 'networkidle0'})

		const listResult = await page.$('.art-cates-lst-item.is-prod')
		assert.ok(listResult)

	}).timeout(20000)

	it('Product Detail Page', async () => {

		await page.click('a.art-post-thumb')
		await page.waitForSelector('div.page-detail-title')

		const title = await page.$('.title-lg')
		assert.ok(title)

	}).timeout(20000)
})


after(async () => {
	await browser.close()
})