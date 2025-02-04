import { test, expect } from '@playwright/test'

test('Click on Header', async ({ page }) => {
  // Open the base URL
  await page.goto('http://localhost:3000')

  // Resize window
  await page.setViewportSize({ width: 1470, height: 720 })

  // Wait for the place selector title
  await page.waitForSelector('.place-selector--wrapper .title')

  // Click on "About" link
  await page.click('.navbar-end > .navbar-item:nth-child(1) > a')
  await expect(page.locator('.is-3:nth-child(1)')).toHaveText(
    'What’s in a Northern Climate Report?'
  )

  // Click on "Credits" link
  await page.click('.navbar-item:nth-child(2) > a')
  await expect(page.locator('.person:nth-child(2) .subtitle')).toHaveText(
    'Amy Breen'
  )
  await expect(page.locator('.person:nth-child(2) img')).toBeVisible()

  // Click on "Data" link
  await page.click('.navbar-item:nth-child(3) > a')
  await expect(
    page.locator('.content:nth-child(1) > p:nth-child(1)')
  ).toBeVisible()
  await expect(page.locator('tbody > tr:nth-child(1) > th')).toHaveText(
    'Demographics and Health'
  )

  // Click on "Places" link
  await page.click('.navbar-item:nth-child(4) > a')
  await expect(page.locator('.card:nth-child(1) img')).toBeVisible()
  await expect(page.locator('.card:nth-child(1) .title')).toHaveText(
    'Alaska Native Corporations'
  )

  // Navigate back to Home
  await page.click('.navbar-item:nth-child(1) > .nuxt-link-active')
  await expect(page.locator('.place-selector--wrapper .title')).toHaveText(
    'Find a place by name'
  )
})
