const assert = require('assert')
const puppeteer = require('puppeteer')
const config = require('./config')


let browser, page

const { userInfo, staging } = config

before(async () => {
	browser = await puppeteer.launch({headless: true})
	page = await browser.newPage()

})

describe('Review - Login', () => {
	it('has form login', async () => {

		await page.setViewport({width: 1280, height: 800})
		await page.goto(staging.login, {waitUntil: 'networkidle0'})
		const formLogin = await page.$('div.form-login')
		assert.ok(formLogin)

	}).timeout(20000)

	it('login...', async () => {

		await page.type('input[name="email"]', userInfo.email)
		await page.type('input[type="password"]', userInfo.pass)
		await page.click('.group-btn > button')
		await page.waitForNavigation()

		const userName = await page.$('span.user-name')
		assert.ok(userName)

	}).timeout(10000)
})

after(async () => {
	await browser.close()
})