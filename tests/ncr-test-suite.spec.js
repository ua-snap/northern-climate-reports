import { test, expect } from '@playwright/test'

const url = 'http://localhost:3000'

const sectionFunctions = {
  temperature: 'checkForTemperature',
  precipitation: 'checkForPrecipitation',
  hydrology: 'checkForHydrology',
  permafrost: 'checkForPermafrost',
  wildfire: 'checkForWildfire',
  demographics: 'checkForDemographics',
}

const checkElementsForSubstring = async (elements, substr) => {
  let text
  for (let i = 0; i < elements.length; i++) {
    text = await elements[i].innerText()
    return text.includes(substr)
  }
  return false
}

const checkForTemperature = async page => {
  let elements = await page.$$('#temp-chart .legend .traces')
  let count = elements.length
  expect(count).toBeGreaterThan(5)

  elements = await page.$$('.report--temperature table td')
  count = elements.length
  expect(count).toBeGreaterThan(20)

  elements = await page.$$('.report--temperature-indicators table td')
  count = elements.length
  expect(count).toBeGreaterThan(20)
}

const checkForPrecipitation = async page => {
  let elements = await page.$$('#precip-chart .legend .traces')
  let count = elements.length
  expect(count).toBeGreaterThan(5)

  elements = await page.$$('#precipitation table td')
  count = elements.length
  expect(count).toBeGreaterThan(20)

  elements = await page.$$('.report--precipitation-indicators table td')
  count = elements.length
  expect(count).toBeGreaterThan(20)
}

const checkForHydrology = async page => {
  // Checks for td elements in both hydrology tables.
  let elements = await page.$$('#hydrology .report-table td')
  let count = elements.length
  expect(count).toBeGreaterThan(40)

  // Checks for map tiles in both sets of hydrology maps.
  elements = await page.$$('#hydrology .leaflet-tile-loaded')
  count = elements.length
  expect(count).toBeGreaterThan(200)
}

const checkForPermafrost = async page => {
  let elements = await page.$$('#permafrost .leaflet-tile-loaded')
  let count = elements.length
  expect(count).toBeGreaterThan(40)

  elements = await page.$$('#permafrost-top-chart .legend .traces')
  count = elements.length
  expect(count).toBeGreaterThan(3)
}

const checkForWildfire = async page => {
  let elements = await page.$$('#wildfire .leaflet-tile-loaded')
  let count = elements.length
  expect(count).toBeGreaterThan(40)

  elements = await page.$$('#wildfire-flammability-chart .legend .traces')
  count = elements.length
  expect(count).toBeGreaterThan(5)

  elements = await page.$$('#wildfire-veg-change-chart .legend .traces')
  count = elements.length
  expect(count).toBeGreaterThan(5)
}

test('Click on Header', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.place-selector--wrapper .title')
  await page.click('.navbar-end > .navbar-item:nth-child(1) > a')
  await expect(page.locator('.is-3:nth-child(1)')).toHaveText(
    'What’s in a Northern Climate Report?'
  )
  await page.click('.navbar-item:nth-child(2) > a')

  let elements
  let substring
  let substringFound

  elements = page.locator('.person .subtitle')
  substring = 'Amy Breen'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()

  await expect(page.locator('.person:nth-child(2) img')).toBeVisible()
  await page.click('.navbar-item:nth-child(3) > a')
  await expect(
    page.locator('.content:nth-child(1) > p:nth-child(1)')
  ).toBeVisible()

  elements = page.locator('tbody > tr:nth-child(1) > th')
  substring = 'Demographics and Health'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()

  await page.click('.navbar-item:nth-child(4) > a')
  await expect(page.locator('.card:nth-child(1) img')).toBeVisible()

  elements = page.locator('.card:nth-child(1) .title')
  substring = 'Alaska Native Corporations'
  substringFound = checkElementsForSubstring(elements, substring)
  expect(substringFound).toBeTruthy()
})

test('Check for expected place types in place selector', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })

  await page.click('.navbar-item:nth-child(1) > .nuxt-link-active')
  await expect(page.locator('.place-selector--wrapper .title')).toHaveText(
    'Find a place by name'
  )

  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'A')
  await page.waitForSelector('.dropdown-content')

  const community_types = ['Alaska', 'Yukon', 'British Columbia']

  const area_types = [
    'Area of Critical Environmental Concern (BLM)',
    'Backcountry Prescription (USFS)',
    'BC Provincial Park - Class A',
    'BC Provincial Park - Ecological Reserve',
    'BC Provincial Park - Protected Area',
    'BC Provincial Park - Recreation Area',
    'Ecological Reserve',
    'Habitat Protection Area',
    'National Conservation Area (BLM)',
    'National Forest (USFS)',
    'National Historical Park (NPS)',
    'National Monument (NPS)',
    'National Monument (USFS)',
    'National Park (NPS)',
    'National Park of Canada',
    'National Petroleum Reserve',
    'National Preserve (NPS)',
    'National Recreation Area (BLM)',
    'National River & Wild & Scenic Riverway (NPS)',
    'National Wildlife Area',
    'National Wildlife Refuge (FWS)',
    'Natural Environment Park',
    'Research Natural Area (BLM)',
    'Research Natural Area (USFS)',
    'Special Management Area',
    'State Forest',
    'State Game or Wildlife Sanctuary',
    'State Habitat Area',
    'State Marine Park',
    'State Nature Preserve',
    'State Park',
    'State Public Use Area',
    'State Range Area',
    'State Recreation Area',
    'State Recreation River',
    'State Refuges',
    'State Restricted Area',
    'Watershed',
    'Wild, Scenic & Recreation River (BLM)',
    'Wilderness Preserve',
    'Wildlife Management Area',
    'Yukon Fire District',
    'Yukon Game Management Subzone',
    'Yukon Watershed',
  ]

  const expectedPlaceTypes = community_types.concat(area_types)

  for (const placeType of expectedPlaceTypes) {
    let selector = `.dropdown-content .area-additional-info:has-text("${placeType}")`
    await expect.poll(() => page.locator(selector).count()).toBeGreaterThan(0)
  }
})

test('Click on Fairbanks', async ({ page }) => {
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Fairbanks')
  await page.waitForSelector('.dropdown-item:nth-child(1) > .search-item')
  await page.click('.dropdown-item:nth-child(1) > .search-item')
  await expect(page.locator('.section > .centered')).toBeVisible({
    timeout: 360000,
  })
  await expect(
    page.locator('text=Projected Conditions for Fairbanks')
  ).toBeVisible({ timeout: 360000 })

  // Sleep for 60 seconds to allow
  await page.waitForTimeout(10000)

  const sections = [
    'temperature',
    'precipitation',
    'hydrology',
    'permafrost',
    'wildfire',
  ]

  for (const section of sections) {
    if (sectionFunctions[section]) {
      const sectionFunction = sectionFunctions[section]
      console.log(`Checking section: ${section}`)
      await eval(sectionFunction)(page)
    }
  }
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
  await expect(page.locator('.section > .centered')).toBeVisible({
    timeout: 360000,
  })
  await expect(
    page.locator(
      'text=Projected Conditions for Chena River Watershed HUC8 19080306'
    )
  ).toBeVisible({ timeout: 360000 })
})

test('Select and load report for Dawson City', async ({ page }) => {
  test.setTimeout(180000)
  await page.goto(url)
  await page.setViewportSize({ width: 1728, height: 1078 })
  await page.waitForSelector('.has-icons-left > .input')
  await page.click('.has-icons-left > .input')
  await page.fill('.has-icons-left > .input', 'Dawson Ci')
  await page.waitForSelector('.dropdown-item:nth-child(1) > .search-item')
  await page.click('.dropdown-item:nth-child(1) > .search-item')
  await page.waitForSelector('.section > .centered', { timeout: 180000 })
  await page.waitForSelector('text=Projected Conditions for Dawson City', {
    timeout: 360000,
  })

  checkForReportSections(page, ['temperature', 'precipitation'])
})

test('Choose 70.04N, 157.33W from map search', async ({ page }) => {
  test.setTimeout(180000)
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
  ).toBeVisible({ timeout: 360000 })
})
