#!/usr/bin/env node
import { join } from "path"
import { readFileSync } from "fs"

import program from "commander"

import { saveToFile } from "."

const packageInfo = JSON.parse(readFileSync(join(__dirname, "..", "package.json")).toString())

program
  .version(packageInfo.version)

program
  .command("pdf <host> <filename>", {})
  .description("save host to filename as PDF")
  .action(async (host, filename) => {
    try {
      await saveToFile(host, join(process.cwd(), filename))
    } catch (err) {
      console.log(`Error saving ${host}: ${err}`)
      process.exit(1)
    }
  })
  .on("--help", () => {
    console.log("")
    console.log("Examples:")
    console.log("  $ jirasave pdf localhost:3000 out.pdf")
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  // No command was specified
  program.outputHelp(() => program.help())
}
