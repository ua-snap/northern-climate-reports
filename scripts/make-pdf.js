// Renders the printable version of a report to a PDF with headless Chromium.
//
// Usage:
//   npm run pdf -- <place> [output.pdf] [--units=metric] [--base=URL]
//
// <place> can be a path like community/AK124, area/19050302, or
// 64.84/-147.72, or a full report URL.  --base defaults to the local dev
// server (http://localhost:3000), which must already be running.

const { chromium } = require('@playwright/test')

const args = process.argv.slice(2)
const options = Object.fromEntries(
  args
    .filter(arg => arg.startsWith('--'))
    .map(arg => arg.replace(/^--/, '').split('='))
)
const [placeArg, outputArg] = args.filter(arg => !arg.startsWith('--'))

if (!placeArg) {
  console.error(
    'Usage: npm run pdf -- <place> [output.pdf] [--units=metric] [--base=URL]'
  )
  process.exit(1)
}

const base = (options.base || 'http://localhost:3000').replace(/\/$/, '')
const units = options.units || 'imperial'
const place = placeArg
  .replace(/^https?:\/\/[^/]+/, '')
  .replace(/^\/?(report|print)\//, '')
  .replace(/^\//, '')
const output =
  outputArg || 'ncr-' + place.replace(/[^\w.-]+/g, '-') + '-' + units + '.pdf'
const url = base + '/print/' + place + '?units=' + units

// Data requests can take minutes for uncached places.
const READY_TIMEOUT = 10 * 60 * 1000

;(async () => {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 1000 },
    })
    console.log('Loading ' + url)
    await page.goto(url)
    await page.waitForSelector('html[data-print-ready="true"]', {
      timeout: READY_TIMEOUT,
    })
    await page.pdf({
      path: output,
      preferCSSPageSize: true,
      printBackground: true,
    })
    console.log('Saved ' + output)
  } finally {
    await browser.close()
  }
})().catch(err => {
  console.error(err.message)
  process.exit(1)
})
