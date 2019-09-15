import puppeteer from "puppeteer"

export async function saveToFile (host: string, outPath: string): Promise<void> {
  console.log(`Saving ${host} to: ${outPath}`)

  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(host)

    // Generate PDF with 'screen' media type.
    await page.emulateMedia("screen")
    await page.pdf({ path: outPath, format: "A4", printBackground: true })
  } catch (err) {
    throw err
  } finally {
    await browser.close()
  }
}
