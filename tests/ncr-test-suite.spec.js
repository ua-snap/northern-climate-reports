import { test, expect } from '@playwright/test'

const url = 'http://localhost:3000'

test('Click on Header', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.place-selector--wrapper .title')
  await page.click('.navbar-end > .navbar-item:nth-child(1) > a')
  await expect(page.locator('.is-3:nth-child(1)')).toHaveText(
    'What’s in a Northern Climate Report?'
  )
  await page.click('.navbar-item:nth-child(2) > a')
  await expect(page.locator('.person:nth-child(2) .subtitle')).toHaveText(
    'Amy Breen'
  )
  await expect(page.locator('.person:nth-child(2) img')).toBeVisible()
  await page.click('.navbar-item:nth-child(3) > a')
  await expect(
    page.locator('.content:nth-child(1) > p:nth-child(1)')
  ).toBeVisible()
  await expect(page.locator('tbody > tr:nth-child(1) > th')).toHaveText(
    'Demographics and Health'
  )
  await page.click('.navbar-item:nth-child(4) > a')
  await expect(page.locator('.card:nth-child(1) img')).toBeVisible()
  await expect(page.locator('.card:nth-child(1) .title')).toHaveText(
    'Alaska Native Corporations'
  )
  await page.click('.navbar-item:nth-child(1) > .nuxt-link-active')
  await expect(page.locator('.place-selector--wrapper .title')).toHaveText(
    'Find a place by name'
  )
})

test('Search for Fairbanks', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Fairbanks')
  await page.waitForSelector('.dropdown-content')
  await expect(
    page.locator('css=.dropdown-item:nth-child(1) > .search-item')
  ).toContainText('\nFairbanks\n\nAlaska')
  await expect(
    page.locator('css=.dropdown-item:nth-child(2) > .search-item')
  ).toContainText('\nFairbanks Area\n\nFire Management Unit')
  await expect(
    page.locator('css=.dropdown-item:nth-child(3) > .search-item')
  ).toContainText('\nFairbanks North Star Borough\n\nBorough')
  await expect(
    page.locator('css=.dropdown-item:nth-child(4) > .search-item')
  ).toContainText('Southeast Fairbanks Census Area')
})

test('Click on Fairbanks', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Fairbanks')
  await page.waitForSelector('.dropdown-item:nth-child(1) > .search-item')
  await page.click('.dropdown-item:nth-child(1) > .search-item')
  await expect(page.locator('.section > .centered')).toBeVisible()
  await expect(
    page.locator('text=Projected Conditions for Fairbanks')
  ).toBeVisible({ timeout: 120000 })
})

test('Search for Chena River', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Chena River')
  await page.waitForSelector('.dropdown-content')
  await expect(
    page.locator('css=.dropdown-item:nth-child(1) > .search-item')
  ).toContainText('\nChena River\n\nWatershed, HUC ID 19080306')
  await expect(
    page.locator('css=.dropdown-item:nth-child(2) > .search-item')
  ).toContainText(
    '\nHeadwaters Middle Fork Chena River\n\nWatershed, HUC ID 1908030601'
  )
  await expect(
    page.locator('css=.dropdown-item:nth-child(3) > .search-item')
  ).toContainText('\nLower Chena River\n\nWatershed, HUC ID 1908030609')
  await expect(
    page.locator('css=.dropdown-item:nth-child(4) > .search-item')
  ).toContainText(
    '\nOutlet Middle Fork Chena River\n\nWatershed, HUC ID 1908030603'
  )
})

test('Click on Chena River HUC8', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Chena River')
  await page.waitForSelector('.dropdown-item:nth-child(1) > .search-item')
  await page.click('.dropdown-item:nth-child(1) > .search-item')
  await expect(page.locator('.section > .centered')).toBeVisible()
  await expect(
    page.locator(
      'text=Projected Conditions for Chena River Watershed HUC8 19080306'
    )
  ).toBeVisible({ timeout: 120000 })
})

test('Search for Dawson', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Dawson')
  await page.waitForSelector('.dropdown-content')
  await expect(
    page.locator('css=.dropdown-item:nth-child(1) > .search-item')
  ).toContainText('\nDawson City\n\nYukon')
  await expect(
    page.locator('css=.dropdown-item:nth-child(2) > .search-item')
  ).toContainText('\nDawson Fire District\n\nYukon Fire District')
})

test('Click on Dawson City', async ({ page }) => {
  test.setTimeout(180000)
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Dawson')
  await page.waitForSelector('.dropdown-item:nth-child(1) > .search-item')
  await page.click('.dropdown-item:nth-child(1) > .search-item')
  await page.waitForSelector('.section > .centered', { timeout: 180000 })
  await page.waitForSelector('text=Projected Conditions for Dawson City', {
    timeout: 180000,
  })
})

test('Click on the map in Northern Alaska: 70.04N, 157.33W', async ({
  page,
}) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('#map')
  await page.evaluate(() => window.scrollBy(0, 500))
  const element = await page.locator('#map')
  const box = await element.boundingBox()
  if (box) {
    await page.mouse.click(box.x + 600, box.y + 250)
  }
  await page.waitForSelector(
    'css=div:nth-child(2) > ul > .additional-info:nth-child(1)'
  )
  await expect(
    page.locator('css=div:nth-child(2) > ul > .additional-info:nth-child(1)')
  ).toContainText('Arctic Slope Regional Corporation')
  await expect(
    page.locator('css=div:nth-child(3) > ul > .additional-info:nth-child(1)')
  ).toContainText('Admiralty Bay-Dease Inlet')
})

test('Choose 70.04N, 157.33W from map search', async ({ page }) => {
  test.setTimeout(120000)
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('#map')
  await page.evaluate(() => window.scrollBy(0, 500))
  const element = await page.locator('#map')
  const box = await element.boundingBox()
  if (box) {
    await page.mouse.click(box.x + 600, box.y + 250)
  }
  await page.waitForSelector(
    'css=div:nth-child(2) > ul > .additional-info:nth-child(1)'
  )
  await expect(
    page.locator('css=div:nth-child(2) > ul > .additional-info:nth-child(1)')
  ).toContainText('Arctic Slope Regional Corporation')
  await expect(
    page.locator('css=div:nth-child(3) > ul > .additional-info:nth-child(1)')
  ).toContainText('Admiralty Bay-Dease Inlet')

  await page.evaluate(() => window.scrollBy(0, 500))
  await page.click('css=.mt-4:nth-child(5)')

  await expect(
    page.locator('text=Projected Conditions for 70.04°N, 157.33°W')
  ).toBeVisible({ timeout: 120000 })
})

test('Choose Admiralty Bay-Dease Inlet from map search', async ({ page }) => {
  test.setTimeout(120000)
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('#map')
  await page.evaluate(() => window.scrollBy(0, 500))
  const element = await page.locator('#map')
  const box = await element.boundingBox()
  if (box) {
    await page.mouse.click(box.x + 600, box.y + 250)
  }
  await page.waitForSelector(
    'css=div:nth-child(2) > ul > .additional-info:nth-child(1)'
  )
  await expect(
    page.locator('css=div:nth-child(2) > ul > .additional-info:nth-child(1)')
  ).toContainText('Arctic Slope Regional Corporation')
  await expect(
    page.locator('css=div:nth-child(3) > ul > .additional-info:nth-child(1)')
  ).toContainText('Admiralty Bay-Dease Inlet')

  await page.evaluate(() => window.scrollBy(0, 500))
  await page.click(
    'css=div:nth-child(3) > ul > .additional-info:nth-child(1) a'
  )

  await expect(
    page.locator('text=Projected Conditions for Admiralty Bay-Dease Inlet')
  ).toBeVisible({ timeout: 120000 })
})

test('Click on the map in Yukon Territory, Canada: 65.65N, 138.89W', async ({
  page,
}) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('#map')
  await page.evaluate(() => window.scrollBy(0, 500))
  const element = await page.locator('#map')
  const box = await element.boundingBox()
  if (box) {
    await page.mouse.click(box.x + 1000, box.y + 450)
  }
  await page.waitForSelector(
    'css=div:nth-child(2) > ul > .additional-info:nth-child(1)'
  )
  await expect(
    page.locator('css=div:nth-child(2) > ul > .additional-info:nth-child(1)')
  ).toContainText('09FA')
  await page.evaluate(() => window.scrollBy(0, 200))
  await expect(
    page.locator('css=div:nth-child(3) > ul > .additional-info')
  ).toContainText('Headwaters Porcupine River')
})

test('Choose 65.65N, 138.89W from map search', async ({ page }) => {
  test.setTimeout(120000)
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('#map')
  await page.evaluate(() => window.scrollBy(0, 500))
  const element = await page.locator('#map')
  const box = await element.boundingBox()
  if (box) {
    await page.mouse.click(box.x + 1000, box.y + 450)
  }
  await page.waitForSelector(
    'css=div:nth-child(2) > ul > .additional-info:nth-child(1)'
  )
  await expect(
    page.locator('css=div:nth-child(2) > ul > .additional-info:nth-child(1)')
  ).toContainText('09FA')
  await page.evaluate(() => window.scrollBy(0, 200))
  await expect(
    page.locator('css=div:nth-child(3) > ul > .additional-info')
  ).toContainText('Headwaters Porcupine River')

  await page.evaluate(() => window.scrollBy(0, 500))
  await page.click('css=.mt-4')

  await expect(
    page.locator('text=Projected Conditions for 65.65°N, 138.89°W')
  ).toBeVisible({ timeout: 120000 })
})

test('Choose Headwaters Porcupine River in YT from map search', async ({
  page,
}) => {
  test.setTimeout(120000)
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('#map')
  await page.evaluate(() => window.scrollBy(0, 500))
  const element = await page.locator('#map')
  const box = await element.boundingBox()
  if (box) {
    await page.mouse.click(box.x + 1000, box.y + 450)
  }
  await page.waitForSelector(
    'css=div:nth-child(2) > ul > .additional-info:nth-child(1)'
  )
  await expect(
    page.locator('css=div:nth-child(2) > ul > .additional-info:nth-child(1)')
  ).toContainText('09FA')
  await page.evaluate(() => window.scrollBy(0, 200))
  await expect(
    page.locator('css=div:nth-child(3) > ul > .additional-info')
  ).toContainText('Headwaters Porcupine River')

  await page.evaluate(() => window.scrollBy(0, 500))
  await page.click('css=div:nth-child(3) > ul > .additional-info a')

  await expect(
    page.locator('text=Projected Conditions for Headwaters Porcupine River')
  ).toBeVisible({ timeout: 120000 })
})
