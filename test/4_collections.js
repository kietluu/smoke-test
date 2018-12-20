const assert = require('assert')
const puppeteer = require('puppeteer')
const config = require('./config')

let browser, page

const { staging } = config

before(async () => {
	browser = await puppeteer.launch({headless: true})
	page = await browser.newPage()

})

describe('Collection Page', () => {

	it('Page result', async () => {
		await page.setViewport({width: 1280, height: 800})
		await page.goto(staging.collection, {waitUntil: 'networkidle0'})
		const listResult = await page.$('.lst-inner-ctn')
		assert.ok(listResult)

	}).timeout(20000)
})


after(async () => {
	await browser.close()
})